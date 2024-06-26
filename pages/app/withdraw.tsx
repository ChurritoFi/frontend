import Layout from "../../components/app/layout";

import React, { Fragment, useCallback, useEffect, useState } from "react";

import {
  fetchPendingWithdrawals,
  getVgName,
  getVotingSummary,
  revoke,
} from "../../lib/celo";

import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

import useStore from "../../store/store";

import { PendingWithdrawal } from "../../lib/celo";
import {
  GroupVoting,
  ProcessedWithdrawals,
  WithdrawalStatus,
} from "../../lib/types";
import { Dialog, Transition } from "@headlessui/react";
import {
  trackCELOLockedOrUnlockedOrWithdraw,
  trackVoteOrRevoke,
} from "../../lib/supabase";
import ReminderModal from "../../components/app/dialogs/reminder";
import { useCelo } from "../../hooks/useCelo";
import { waitForTransaction } from "@wagmi/core";
import { Address } from "wagmi";
import { performWalletAction } from "../../lib/walletAction";

const StateMachine = createMachine({
  id: "StateMachine",
  initial: "idle",
  states: {
    idle: {
      on: { WITHDRAW: "withdraw", UNVOTE: "unvote" },
    },
    withdraw: {
      on: { NEXT: "idle" },
    },
    unvote: {
      on: { NEXT: "idle" },
    },
  },
});

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
function formatDate(date: Date): string {
  return `${date.getDate()} ${months[date.getMonth()]} - ${date
    .toLocaleTimeString()
    .slice(0, -3)}`;
}

function Withdraw() {
  /* 
    1. Current votes
      - ability to unvote and unlock
    2. Current withdrawals
      - Show when they will be ready for withdrawal 
      - If a withdrawal is ready for withdrawal, action button to withdraw
  */
  const [votingSummary, setVotingSummary] = useState<GroupVoting[]>([]);
  const [loadingVotingSummary, setLoadingVotingSummary] =
    useState<boolean>(false);
  const [pendingWithdrawals, setPendingWithdrawals] = useState<
    ProcessedWithdrawals[]
  >([]);
  const [loadingPendingWithdrawals, setLoadingPendingWithdrawals] =
    useState<boolean>(false);
  const [reminderModalOpen, setReminderModalOpen] = useState<boolean>(false);

  const [current, send] = useMachine(StateMachine);
  const { address, contracts } = useCelo();
  const state = useStore();

  const fetchVotingSummary = useCallback(() => {
    if (address == null) return;
    setLoadingVotingSummary(true);
    getVotingSummary(contracts, address)
      .then((groupVotes) =>
        Promise.all(
          groupVotes.map(async (group) => ({
            vg: group.group,
            name: await getVgName(contracts, group.group),
            active: group.active,
            pending: group.pending,
          }))
        )
      )
      .then((summary) => {
        setVotingSummary(summary);
        setLoadingVotingSummary(false);
      });
  }, []);

  const getPendingWithdrawals = useCallback(() => {
    if (address == null) return;
    const now = new Date();
    setLoadingPendingWithdrawals(true);
    fetchPendingWithdrawals(contracts, address).then(
      ({ pendingWithdrawals }) => {
        setPendingWithdrawals(
          pendingWithdrawals.map((w: PendingWithdrawal) => {
            const time = new Date(w.time.times(1000).toNumber());
            return {
              value: w.value,
              time: time,
              status:
                now > time
                  ? WithdrawalStatus.AVAILABLE
                  : WithdrawalStatus.PENDING,
            };
          })
        );
        setLoadingPendingWithdrawals(false);
      }
    );
  }, []);

  useEffect(() => {
    fetchVotingSummary();
    getPendingWithdrawals();
  }, []);

  const withdrawCELO = async (idx: number) =>
    performWalletAction(async () => {
      console.log("Withdraw CELO", pendingWithdrawals[idx]);
      try {
        const locked = await contracts.getLockedGold();
        const txHash = await locked.write.withdraw([BigInt(idx)]);
        console.log("txHash", txHash);
        await waitForTransaction({ hash: txHash });

        trackCELOLockedOrUnlockedOrWithdraw(
          pendingWithdrawals[idx].value.div(1e18).toNumber(),
          address!,
          "withdraw"
        );
        send("WITHDRAW");
      } catch (e) {
        console.log("Failed to withdraw", e);
        throw e;
      } finally {
        getPendingWithdrawals();
      }
    });

  const unvoteVg = async (vg: GroupVoting) =>
    performWalletAction(async () => {
      if (address == null) return;
      try {
        console.log(address);
        const revokeTxHashes = await revoke(
          contracts,
          address,
          vg.vg as Address,
          vg.active
        );
        console.log("revokeTxHashes", revokeTxHashes);

        const lockedCelo = await contracts.getLockedGold();
        const unlockTxHash = await lockedCelo.write.unlock([
          BigInt(vg.active.toFixed()),
        ]);
        console.log("unlockTxHash", unlockTxHash);

        const txHashes = [...revokeTxHashes, unlockTxHash];
        await Promise.all(
          txHashes.map((hash: any) => waitForTransaction({ hash }))
        );

        console.log("Unvote & Unlock");
        setReminderModalOpen(true);
        trackVoteOrRevoke(
          vg.active.div(1e18).toNumber(),
          address,
          vg.vg,
          "revoke"
        ).then(() =>
          trackCELOLockedOrUnlockedOrWithdraw(
            vg.active.div(1e18).toNumber(),
            address,
            "unlock"
          )
        );
      } catch (e) {
        console.log(`Unable to vote ${e}`);
        throw e;
      } finally {
        fetchVotingSummary();
        getPendingWithdrawals();
      }
    });

  return (
    <Layout>
      <div>
        <ReminderModal
          open={reminderModalOpen}
          setOpen={setReminderModalOpen}
          action="withdraw"
        />
        <Transition.Root show={current.value === "withdraw"} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed z-30 inset-0 overflow-y-auto"
            open={current.value === "withdraw"}
            onClose={() => send("NEXT")}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative inline-block align-bottom border border-primary-light bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full px-12 py-14">
                  <button
                    onClick={() => send("NEXT")}
                    className="fixed right-0 top-0 mr-10 mt-10 text-gray-dark"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl leading-6 font-medium text-primary"
                      >
                        Success!
                      </Dialog.Title>
                      <Dialog.Description className="text-gray mt-5">
                        CELO has been successfully withdrawn into your wallet.
                      </Dialog.Description>
                    </div>
                  </div>
                  <div className="mt-12">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded border border-transparent shadow-sm px-4 py-3 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      onClick={() => send("NEXT")}
                    >
                      Go back
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <h3 className="text-gray-dark font-medium text-2xl">
          Withdraw staked CELO
        </h3>
        <div>
          <div className="mt-5 lg:mt-10 pt-4 lg:pt-8">
            <h3 className="text-xl font-medium">Current Withdrawals</h3>
            <div className="overflow-x-auto border border-gray-light rounded-lg shadow-sm mt-5">
              <table className="min-w-full divide-y divide-gray-light">
                <thead className="border-b border-gray-light text-gray">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-normal  tracking-wider"
                    >
                      CELO to withdraw
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-normal tracking-wider"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-normal text-sm  tracking-wider"
                    >
                      Withdrawable
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-normal text-sm  tracking-wider"
                    >
                      Withdraw staked CELO
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-light">
                  {pendingWithdrawals.map((w: ProcessedWithdrawals, i) => (
                    <tr key={i} className="mt-2.5 text-base">
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-dark">
                        {w.value.div(1e18).toFormat(2)} CELO
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-center font-medium ${
                          w.status === WithdrawalStatus.AVAILABLE
                            ? "text-primary-dark"
                            : "text-accent-dark"
                        }`}
                      >
                        {w.status}
                      </td>

                      <td
                        className={`px-6 py-4 whitespace-nowrap text-center text-gray-dark`}
                      >
                        {formatDate(w.time)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-dark">
                        <button
                          className="border-2 rounded-md font-medium shadow-sm text-base px-4 py-2 text-accent-dark-dark disabled:opacity-50 focus:outline-none hover:bg-accent-light-light hover:border-accent-dark-dark hover:text-accent-dark-dark focus:bg-accent-light-light focus:border-accent-dark-dark focus:text-accent-dark-dark active:bg-accent-light-light active:border-accent-dark-dark active:text-accent-dark-dark"
                          disabled={w.status === WithdrawalStatus.PENDING}
                          onClick={() => {
                            withdrawCELO(i);
                          }}
                        >
                          Withdraw CELO
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(() => {
                if (loadingPendingWithdrawals) {
                  return (
                    <p className="w-full flex py-4 justify-center items-center text-gray">
                      Loading your pending withdrawals...
                    </p>
                  );
                } else if (pendingWithdrawals.length == 0) {
                  return (
                    <p className="w-full flex py-4 justify-center items-center text-gray">
                      You have no pending withdrawals.
                    </p>
                  );
                }
              })()}
            </div>
          </div>
          <div className="mt-5 lg:mt-10 pt-4 lg:pt-8">
            <h3 className="text-xl font-medium">Current Staking Summary</h3>
            <div className="overflow-x-auto border border-gray-light rounded-lg shadow-sm mt-5">
              <table className="min-w-full divide-y divide-gray-light">
                <thead className="border-b border-gray-light text-gray">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-sm font-normal  tracking-wider"
                    >
                      Validator Group
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-normal text-sm  tracking-wider"
                    >
                      Activated CELO
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-normal text-sm  tracking-wider"
                    >
                      Total Staked CELO
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-normal text-sm  tracking-wider bg-white sticky right-0"
                    >
                      Withdraw staked CELO
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-light">
                  {votingSummary.map((group) => (
                    <tr key={group.vg} className="mt-2.5 text-base">
                      <td className="px-6 py-4 whitespace-nowrap text-center font-medium text-gray-dark">
                        {group.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-dark">
                        {group.active.div(1e18).toFormat(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-dark">
                        {group.active.plus(group.pending).div(1e18).toFormat(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-dark bg-white sticky right-0">
                        <button
                          disabled={!group.active.gt(0)}
                          className="border-2 rounded-md  text-alert font-medium shadow-sm text-base px-4 py-2 disabled:opacity-50 hover:border-alert-dark hover:text-alert-dark focus:border-alert-dark focus:text-alert-dark focus:outline-none active:bg-alert-light-light active:border-alert-dark-dark active:text-alert-dark-dark"
                          onClick={() => {
                            unvoteVg(group);
                          }}
                        >
                          Unvote & Unlock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(() => {
                if (loadingVotingSummary) {
                  return (
                    <p className="w-full flex py-4 justify-center items-center text-gray">
                      Loading your stakes...
                    </p>
                  );
                } else if (votingSummary.length == 0) {
                  return (
                    <p className="w-full flex py-4 justify-center items-center text-gray">
                      You've no current stakes.
                    </p>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Withdraw;
