import React, { useCallback, useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";

import ReminderModal from "../../components/app/dialogs/reminder";

import useStore from "../../store/store";

import Layout from "../../components/app/layout";
import VotingSummary from "../../components/app/voting-summary";
import Select from "../../components/app/select";
import CeloInput from "../../components/app/celo-input";
import VoteVgDialog from "../../components/app/dialogs/vote-vg";
import RevokeVgDialog from "../../components/app/dialogs/revoke-vg";
import ActivateVgDialog from "../../components/app/dialogs/activate-vg";

import {
  activate,
  fetchPendingWithdrawals,
  getCELOBalance,
  getNonVotingLockedGold,
  getVgName,
  getVotingCelo,
  getVotingSummary,
  hasActivatablePendingVotes,
  revoke,
  vote as voteVg,
} from "../../lib/celo";

import useVg from "../../hooks/useValidatorGroupSuggestion";

import { calculateBarWidth, fetchExchangeRate } from "../../lib/utils";

import { VgSuggestion, GroupVoting } from "../../lib/types";

import CeloCoin from "../../components/icons/celo-coin";
import InfoIcon from "../../components/icons/info";
import ReactTooltip from "react-tooltip";
import { trackActivate, trackVoteOrRevoke } from "../../lib/supabase";
import { useCelo } from "../../hooks/useCelo";
import { waitForTransaction } from "@wagmi/core";
import { Address } from "wagmi";
import { createWalletAction } from "../../lib/walletAction";

const options = ["Vote", "Revoke"];
function vote() {
  const [selected, setSelected] = useState<string>(options[0]);
  const [vgDialogOpen, setVgDialogOpen] = useState<boolean>(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);

  const [votingSummary, setVotingSummary] = useState<GroupVoting[]>([]);
  const [loadingVotingSummary, setLoadingVotingSummary] =
    useState<boolean>(false);

  const [pendingCELO, setPendingCELO] = useState<BigNumber>(new BigNumber(0));
  const [activeCELO, setActiveCELO] = useState<BigNumber>(new BigNumber(0));
  const [totalLockedCELO, setTotalLockedCELO] = useState<BigNumber>(
    new BigNumber(0)
  );
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [maxCELOAmount, setMaxCELOAmount] = useState<BigNumber>(
    new BigNumber(0)
  );

  const [validatorGroups, setValidatorGroups] = useState<VgSuggestion[]>([]);
  const [validatorGroupsForDialog, setValidatorGroupsForDialog] = useState<
    any[]
  >([]);
  const [selectedVg, setSelectedVg] = useState<string | null>();
  const [celoAmountToInvest, setCeloAmountToInvest] = useState<string>("");
  const [hasActivatableVotes, setHasActivatableVotes] =
    useState<boolean>(false);

  const { address, contracts } = useCelo();
  const state = useStore();
  const { fetching: fetchingVg, error: errorFetchingVg, data } = useVg(true);

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

  const fetchActivatablePendingVotes = useCallback(() => {
    if (address == null) return;
    hasActivatablePendingVotes(contracts, address).then((hasActivatable) =>
      setHasActivatableVotes(hasActivatable)
    );
  }, []);

  const calculateActiveAndPendingCelo = useCallback(() => {
    let pendingCelo = new BigNumber(0);
    let activeCelo = new BigNumber(0);

    for (let v of votingSummary) {
      pendingCelo = pendingCelo.plus(v.pending);
      activeCelo = activeCelo.plus(v.active);
    }

    setPendingCELO(pendingCelo);
    setActiveCELO(activeCelo);
    setTotalLockedCELO(
      state.userBalances.nonVotingLockedCelo.plus(
        state.userBalances.votingLockedCelo
      )
    );
  }, [votingSummary]);

  async function fetchAllAccountData(address: string) {
    const { totalCeloUnlocking, totalCeloWithdrawable } =
      await fetchPendingWithdrawals(contracts, address);
    const celoBalance = await getCELOBalance(contracts, address);
    const nonVotingLockedGold = await getNonVotingLockedGold(
      contracts,
      address
    );
    const votingLockedCelo = await getVotingCelo(contracts, address);

    const totalCelo = celoBalance
      .plus(nonVotingLockedGold)
      .plus(votingLockedCelo)
      .plus(totalCeloUnlocking)
      .plus(totalCeloWithdrawable);

    state.setTotalCelo(totalCelo);
    state.setUnlockedCelo(celoBalance);
    state.setNonVotingLockedCelo(nonVotingLockedGold);
    state.setVotingLockedCelo(votingLockedCelo);
    state.setWithdrawableCelo(totalCeloWithdrawable);
    state.setUnlockingCelo(totalCeloUnlocking);
  }

  useEffect(() => {
    fetchActivatablePendingVotes();
  }, []);

  useEffect(() => {
    if (fetchingVg == false && errorFetchingVg == undefined) {
      setValidatorGroups(data?.validator_groups ?? []);
    }
  }, [fetchingVg, errorFetchingVg, data]);

  useEffect(() => {
    // validatorGroupsForDialog
    if (validatorGroups.length == 0) return;
    setSelectedVg("");

    if (selected === options[0]) {
      setValidatorGroupsForDialog(validatorGroups.slice(0, 5));
    } else if (selected === options[1]) {
      const validatorsToRevoke = votingSummary.filter((vs) => vs.active.gt(0));
      setValidatorGroupsForDialog(
        validatorsToRevoke.map((vg) => {
          const vgData = validatorGroups.find(
            (group) => group.address === vg.vg.toLowerCase()
          );
          return {
            address: vg.vg,
            name: vg.name,
            active: vg.active,
            performanceScore: vgData?.performance_score,
            transparencyScore: vgData?.transparency_score,
            estimatedAPY: vgData?.estimated_apy,
          };
        })
      );
    }
  }, [selected, validatorGroups]);

  useEffect(() => {
    if (address == null) return;
    fetchAllAccountData(address);
    fetchVotingSummary();
    fetchActivatablePendingVotes();

    fetchExchangeRate().then((rate) => setExchangeRate(rate));
  }, [address]);

  useEffect(() => {
    if (votingSummary.length == 0) return;

    calculateActiveAndPendingCelo();
  }, [votingSummary]);

  const voteOnVg = createWalletAction(async () => {
    if (address == null) return;
    if (selectedVg == undefined || selectedVg == null) return;
    if (!celoAmountToInvest) return;

    try {
      const txHash = await voteVg(
        contracts,
        selectedVg as Address,
        new BigNumber(parseFloat(celoAmountToInvest)).times(1e18)
      );
      console.log("txHash", txHash);
      await waitForTransaction({ hash: txHash });

      setReminderModalOpen(true);
      trackVoteOrRevoke(
        parseFloat(celoAmountToInvest),
        address,
        selectedVg,
        "vote"
      );
    } catch (e) {
      console.log("unable to vote", e);
      throw e;
    } finally {
      fetchAllAccountData(address);
      fetchVotingSummary();
      fetchActivatablePendingVotes();
      calculateActiveAndPendingCelo();
    }
  });

  const revokeVg = createWalletAction(async () => {
    if (address == null) return;
    try {
      console.log(address);
      if (!selectedVg) return;
      const txHashes = await revoke(
        contracts,
        address,
        selectedVg as Address,
        new BigNumber(parseFloat(celoAmountToInvest)).times(1e18)
      );
      console.log("txHashes", txHashes);
      await Promise.all(
        txHashes.map((hash: any) => waitForTransaction({ hash }))
      );

      trackVoteOrRevoke(
        parseFloat(celoAmountToInvest),
        address,
        selectedVg!,
        "revoke"
      );
      console.log("Vote cast");
    } catch (e) {
      console.log(`Unable to vote ${e}`);
      throw e;
    } finally {
      fetchAllAccountData(address);
      fetchVotingSummary();
      fetchActivatablePendingVotes();
      calculateActiveAndPendingCelo();
    }
  });

  const activateVg = createWalletAction(async () => {
    if (address == null) return;
    try {
      const txHashes = await activate(contracts, address);
      console.log("txHashes", txHashes);
      await Promise.all(txHashes.map((hash) => waitForTransaction({ hash })));

      trackActivate(address);
      console.log("Votes activated");
    } catch (e) {
      console.log(`Unable to activate votes ${e}`);
      throw e;
    } finally {
      fetchAllAccountData(address);
      fetchVotingSummary();
      fetchActivatablePendingVotes();
      calculateActiveAndPendingCelo();
    }
  });

  return (
    <Layout>
      <>
        <ReactTooltip place="top" type="dark" effect="solid" />
        <ActivateVgDialog open={hasActivatableVotes} activate={activateVg} />
        <ReminderModal
          open={reminderModalOpen}
          setOpen={setReminderModalOpen}
          action="activate"
        />
        {vgDialogOpen ? (
          selected === options[0] ? (
            <VoteVgDialog
              open={vgDialogOpen}
              setOpen={setVgDialogOpen}
              selectedVg={selectedVg}
              setSelectedVg={setSelectedVg}
              validatorGroups={validatorGroupsForDialog}
            />
          ) : (
            <RevokeVgDialog
              open={vgDialogOpen}
              setOpen={setVgDialogOpen}
              selectedVg={selectedVg}
              setSelectedVg={setSelectedVg}
              validatorGroups={validatorGroupsForDialog}
            />
          )
        ) : null}
        <header className="flex justify-between items-baseline">
          <h3 className="text-gray-dark font-medium text-2xl">
            Vote/Revoke CELO
          </h3>
          <h3 className="text-secondary">
            <span className="font-medium">Locked CELO:</span>{" "}
            <span className="font-medium text-2xl">
              {totalLockedCELO.div(1e18).toFormat(2)}
            </span>{" "}
            <span className="text-secondary-light text-sm font-medium">
              ($ {totalLockedCELO.div(1e18).times(exchangeRate).toFormat(2)})
            </span>
          </h3>
        </header>
        <main className="mt-5 lg:mt-10">
          <div className="border border-white rounded-full h-3 flex overflow-hidden">
            <div
              className="bg-secondary-light h-full"
              style={{
                width: calculateBarWidth(
                  state.userBalances.nonVotingLockedCelo,
                  totalLockedCELO
                ),
              }}
            ></div>
            <div
              className="bg-accent-light h-full "
              style={{ width: calculateBarWidth(pendingCELO, totalLockedCELO) }}
            ></div>
            <div
              className="bg-accent-dark h-full"
              style={{ width: calculateBarWidth(activeCELO, totalLockedCELO) }}
            ></div>
          </div>
          <ul className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
            <li className="p-5 lg:p-10 flex flex-col border border-gray-light rounded-md space-y-2.5">
              <div className="flex justify-between items-center">
                <div className={`flex items-center text-secondary-dark`}>
                  <CeloCoin />
                  <h4 className="text-sm font-medium ml-2.5">
                    Unused Locked CELO
                  </h4>
                </div>
                <button data-tip="Locked CELO which has not been used yet for voting.">
                  <InfoIcon />
                </button>
              </div>
              <p className="text-xl font-medium">
                {state.userBalances.nonVotingLockedCelo.div(1e18).toFormat(2)}{" "}
                <span className="text-base">CELO</span>
              </p>

              <p className="text-sm text-gray">
                ${" "}
                {state.userBalances.nonVotingLockedCelo
                  .div(1e18)
                  .times(exchangeRate)
                  .toFormat(2)}
              </p>
            </li>
            <li className="p-5 lg:p-10 flex flex-col border border-gray-light rounded-md space-y-2.5">
              <div className="flex justify-between items-center">
                <div className={`flex items-center text-accent-light`}>
                  <CeloCoin />
                  <h4 className="text-sm font-medium ml-2.5">
                    Pending-Vote CELO
                  </h4>
                </div>
                <button data-tip="Locked CELO which have been used for voting but the vote has not been activated yet.">
                  <InfoIcon />
                </button>
              </div>
              <p className="text-xl font-medium">
                {pendingCELO.div(1e18).toFormat(2)}{" "}
                <span className="text-base">CELO</span>
              </p>

              <p className="text-sm text-gray">
                $ {pendingCELO.div(1e18).times(exchangeRate).toFormat(2)}
              </p>
            </li>
            <li className="p-5 lg:p-10 flex flex-col border border-gray-light rounded-md space-y-2.5">
              <div className="flex justify-between items-center">
                <div className={`flex items-center text-accent-dark`}>
                  <CeloCoin />
                  <h4 className="text-sm font-medium ml-2.5">
                    Activated-Voting CELO
                  </h4>
                </div>
                <button data-tip="Locked CELO which has been used for voting and the vote has also been activated.">
                  <InfoIcon />
                </button>
              </div>
              <p className="text-xl font-medium">
                {activeCELO.div(1e18).toFormat(2)}{" "}
                <span className="text-base">CELO</span>
              </p>

              <p className="text-sm text-gray">
                $ {activeCELO.div(1e18).times(exchangeRate).toFormat(2)}
              </p>
            </li>
          </ul>
          <div className="mt-5 lg:mt-10 p-5 lg:p-10 border border-gray-light rounded-md">
            <h3 className="text-2xl text-gray-dark font-medium">
              Vote/Revoke for Validator Group
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-10 mt-4 lg:mt-8">
              <div>
                <Select
                  options={options}
                  selected={selected}
                  setSelected={setSelected}
                  showLabel={true}
                />
              </div>
              <div className="flex flex-col">
                <span className="block text-sm font-medium text-gray-dark">
                  Validator Group
                </span>
                <button
                  type="button"
                  className="whitespace-nowrap truncate bg-gray-light-light relative mt-2.5 w-full border border-gray-light rounded-md shadow-sm px-5 py-2.5 text-left cursor-default focus:outline-none focus:bg-primary-light-light focus:border-primary text-lg text-gray-dark"
                  onClick={() => setVgDialogOpen(true)}
                >
                  {selectedVg
                    ? `${selectedVg.slice(0, 5)}...${selectedVg.slice(-5)}`
                    : "Select Validator Group"}

                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <CeloInput
                celoAmountToInvest={celoAmountToInvest}
                setCeloAmountToInvest={setCeloAmountToInvest}
                exchangeRate={exchangeRate}
                maxAmount={state.userBalances.nonVotingLockedCelo}
              />
            </div>
            <button
              className="mt-5 w-full text-xl py-3 rounded-md bg-primary  text-white hover:bg-primary-dark focus:bg-primary-dark focus:outline-none active:bg-primary-dark-dark"
              onClick={() => {
                if (selectedVg == undefined) return;
                if (selected === options[0]) voteOnVg();
                if (selected === options[1]) revokeVg();
              }}
            >
              {selected}
            </button>
          </div>
          <VotingSummary
            votingSummary={votingSummary}
            loading={loadingVotingSummary}
          />
        </main>
      </>
    </Layout>
  );
}

export default vote;
