import React, { useCallback, useEffect, useMemo, useState } from "react";

import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

import { BigNumber } from "bignumber.js";

import useStore from "../../store/store";

import Layout from "../../components/app/layout";
import VoteVgDialog from "../../components/app/dialogs/vote-vg";
import ReminderModal from "../../components/app/dialogs/reminder";
import CeloInput from "../../components/app/celo-input";
import { fetchExchangeRate } from "../../lib/utils";
import {
  getCELOBalance,
  getEpochSize,
  getNonVotingLockedGold,
  getTargetVotingYield,
  vote,
} from "../../lib/celo";
import useVg from "../../hooks/useValidatorGroups";
import InfoIcon from "../../components/icons/info";
import ReactTooltip from "react-tooltip";
import {
  trackCELOLockedOrUnlockedOrWithdraw,
  trackVoteOrRevoke,
} from "../../lib/supabase";
import { useRouter } from "next/router";
import { intervalToDuration, add } from "date-fns";

import { FaTwitter } from "react-icons/fa";
import { ValidatorGroup } from "../../lib/types";
import { useCelo } from "../../hooks/useCelo";
import { fetchBlockNumber, waitForTransaction } from "@wagmi/core";
import { Address } from "wagmi";
import {
  createWalletAction,
  performWalletAction,
} from "../../lib/walletAction";

const InvestMachine = createMachine({
  id: "InvestFlow",
  initial: "idle",
  states: {
    idle: {
      on: { NEXT: "voting" },
    },
    voting: {
      on: { NEXT: "activating" },
    },
    activating: {
      on: { NEXT: "completed" },
    },
    completed: {
      on: { NEXT: "idle" },
    },
  },
});

const formatter = new Intl.NumberFormat("en-US");

function Stake() {
  const { address, contracts } = useCelo();
  const router = useRouter();

  const [current, send] = useMachine(InvestMachine);

  const [celoToInvest, setCeloToInvest] = useState("");
  const [monthlyEarning, setMonthlyEarning] = useState<BigNumber>(
    new BigNumber(0)
  );
  const [yearlyEarning, setYearlyEarning] = useState<BigNumber>(
    new BigNumber(0)
  );
  const [maxCeloToInvest, setMaxCeloToInvest] = useState(new BigNumber(0));
  const [unlockedCelo, setUnlockedCelo] = useState<BigNumber>();
  const [nonVotingLockedCelo, setNonVotingLockedCelo] = useState<BigNumber>();
  const [exchangeRate, setExchangeRate] = useState(0);
  const [estimatedAPY, setEstimatedAPY] = useState<BigNumber>(new BigNumber(0));
  const [validatorGroups, setValidatorGroups] = useState<ValidatorGroup[]>([]);
  const [selectedVgAddress, setSelectedVgAddress] = useState<string>("");
  const [vgDialogOpen, setVgDialogOpen] = useState<boolean>(false);
  const [hoursToNextEpoch, setHoursToNextEpoch] = useState(0);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);

  const selectedVg = useMemo<ValidatorGroup | undefined>(() => {
    return validatorGroups.find((vg) => vg.address === selectedVgAddress);
  }, [validatorGroups, selectedVgAddress]);
  const [expandedVg, setExpandedVg] = useState(false);

  const { fetching: fetchingVg, error: errorFetchingVg, data } = useVg(true);

  const state = useStore();

  async function getTimeToNextEpoch() {
    // TODO: use bigint
    const block = Number(await fetchBlockNumber());
    const EPOCH_SIZE = await getEpochSize(contracts);
    const BLOCK_TIME = 5;
    const secondsToNextEpoch = BLOCK_TIME * (EPOCH_SIZE - (block % EPOCH_SIZE));
    const timeToNextEpoch = intervalToDuration({
      start: new Date(),
      end: add(new Date(), { seconds: secondsToNextEpoch }),
    });
    setHoursToNextEpoch(
      (timeToNextEpoch.minutes ?? 0) > 0
        ? (timeToNextEpoch.hours ?? 0) + 1
        : timeToNextEpoch.hours ?? 0
    );
  }
  useEffect(() => {
    getTimeToNextEpoch();
  }, []);

  useEffect(() => {
    fetchExchangeRate().then((rate) => setExchangeRate(rate));
    getTargetVotingYield(contracts).then((value) => setEstimatedAPY(value));
  }, []);

  useEffect(() => {
    if (Object.keys(router.query).includes("amount")) {
      const { amount } = router.query;
      console.log("setting amount as ", amount);
      if (typeof amount == "string") setCeloToInvest(amount);
    }
  }, [router.query]);

  useEffect(() => {
    if (fetchingVg == false && errorFetchingVg == undefined) {
      setValidatorGroups(data?.validator_groups ?? []);
      const isVgInQuery = Object.keys(router.query).includes("vg");
      if (isVgInQuery) {
        const vgInQuery = data?.validator_groups.find(
          (vg) => vg.address == router.query["vg"]
        );
        if (vgInQuery) {
          setSelectedVgAddress(vgInQuery.address);
          return;
        }
      }
      setSelectedVgAddress(data?.validator_groups[0].address ?? "");
    }
  }, [fetchingVg, errorFetchingVg, data]);

  const fetchAccountData = useCallback(
    async (address: string) => {
      const [unlockedCelo, nonVotingLockedCelo] = await Promise.all([
        getCELOBalance(contracts, address),
        getNonVotingLockedGold(contracts, address),
      ]);

      return { unlockedCelo, nonVotingLockedCelo };
    },
    [address]
  );

  useEffect(() => {
    if (address == null) return;

    fetchAccountData(address).then(({ unlockedCelo, nonVotingLockedCelo }) => {
      setUnlockedCelo(unlockedCelo);
      setNonVotingLockedCelo(nonVotingLockedCelo);
      setMaxCeloToInvest(unlockedCelo.minus(1e18).plus(nonVotingLockedCelo));
    });
  }, [address]);

  useEffect(() => {
    if (celoToInvest === "") {
      setMonthlyEarning(new BigNumber(0));
      setYearlyEarning(new BigNumber(0));
      return;
    }

    const celoToInvestBN = new BigNumber(celoToInvest);
    const yearly = celoToInvestBN.times(estimatedAPY).div(100);
    const monthly = yearly.div(12);
    setMonthlyEarning(monthly);
    setYearlyEarning(yearly);
  }, [celoToInvest]);

  const lockCELO = async (amount: BigNumber) =>
    performWalletAction(async () => {
      if (!unlockedCelo) return;
      console.log("Locking CELO");
      console.log(amount.lt(unlockedCelo));
      try {
        const lockedCelo = await contracts.getLockedGold();
        const txHash = await lockedCelo.write.lock({
          value: BigInt(amount.toFixed()),
        });
        console.log("txHash", txHash);
        await waitForTransaction({ hash: txHash });

        console.log("CELO locked");
        trackCELOLockedOrUnlockedOrWithdraw(
          amount.div(1e18).toNumber(),
          address!,
          "lock"
        );
        send("NEXT");
      } catch (e) {
        console.log("Couldn't lock");
        console.error("Failed to lock", e);
        throw e;
      }
    });

  const voteOnVg = createWalletAction(async () => {
    if (selectedVgAddress == undefined || selectedVgAddress == null) return;

    if (!celoToInvest) return;

    try {
      const txHash = await vote(
        contracts,
        selectedVgAddress as Address,
        new BigNumber(parseFloat(celoToInvest)).times(1e18)
      );
      console.log("txHash", txHash);
      await waitForTransaction({ hash: txHash });

      trackVoteOrRevoke(
        parseFloat(celoToInvest),
        address!,
        selectedVgAddress,
        "vote"
      );
      send("NEXT");
    } catch (e) {
      console.log("unable to vote", e);
      throw e;
    }
  });

  return (
    <Layout>
      <>
        <ReactTooltip place="top" type="dark" effect="solid" />
        <VoteVgDialog
          open={vgDialogOpen}
          setOpen={setVgDialogOpen}
          selectedVg={selectedVgAddress}
          setSelectedVg={setSelectedVgAddress}
          validatorGroups={validatorGroups}
        />
        <ReminderModal
          open={reminderModalOpen}
          setOpen={setReminderModalOpen}
          action="activate"
        />

        <h1 className="text-2xl font-medium text-gray-dark">Stake CELO</h1>
        <main className="space-y-5 lg:space-y-10 mt-5 lg:mt-10">
          {/* Amount Panel */}
          <div
            className={`border ${
              current.matches("idle")
                ? "border-gray-light"
                : "border-primary bg-primary-light-light"
            } rounded-md p-5 lg:p-10`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-start  space-x-3">
                <h3
                  className={`${
                    current.matches("idle")
                      ? "text-gray-dark"
                      : "text-primary-dark"
                  } text-xl`}
                >
                  Step 1: Staking Amount
                </h3>
                {current.matches("idle") ? (
                  <div
                    className="-mb-1"
                    data-tip="This is the amount of CELO you want to stake to gain rewards."
                  >
                    <InfoIcon />
                  </div>
                ) : (
                  <svg
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M16 0C7.17794 0 0 7.17794 0 16C0 24.8221 7.17794 32 16 32C24.8221 32 32 24.8221 32 16C32 7.17794 24.8221 0 16 0ZM24.9424 11.7895L14.7168 21.9348C14.1153 22.5363 13.1529 22.5764 12.5113 21.9749L7.09774 17.0426C6.45614 16.4411 6.41604 15.4386 6.97744 14.797C7.57895 14.1554 8.58145 14.1153 9.22306 14.7168L13.5138 18.6466L22.6566 9.50376C23.2982 8.86215 24.3008 8.86215 24.9424 9.50376C25.584 10.1454 25.584 11.1479 24.9424 11.7895Z" />
                  </svg>
                )}
              </div>
              {!current.matches("idle") && (
                <p className="text-primary-light text-lg font-medium">
                  You are staking:{" "}
                  {parseFloat(celoToInvest == "" ? "0" : celoToInvest).toFixed(
                    2
                  )}{" "}
                  CELO (${" "}
                  {(
                    parseFloat(celoToInvest == "" ? "0" : celoToInvest) *
                    exchangeRate
                  ).toFixed(2)}
                  )
                </p>
              )}
            </div>
            <div className={`${!current.matches("idle") && "hidden"}`}>
              <div className="md:flex items-end mt-5">
                <div className="md:shrink-0 md:w-1/3">
                  <CeloInput
                    celoAmountToInvest={celoToInvest}
                    setCeloAmountToInvest={setCeloToInvest}
                    exchangeRate={exchangeRate}
                    maxAmount={maxCeloToInvest}
                  />
                </div>
                <div className="ml-5 mb-3 text-gray">
                  / out of {maxCeloToInvest.div(1e18).toFormat(2)} Total CELO ($
                  {maxCeloToInvest.div(1e18).times(exchangeRate).toFormat(2)})
                  in your Wallet
                </div>
              </div>
              <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-x-32">
                <div className="text-gray-dark">
                  <p className="text-sm">You could be earning</p>
                  <p className="mt-2 text-lg font-medium">
                    {estimatedAPY.toFormat(2)}% APY
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray">Yearly Earnings</p>
                  <div className="mt-2 space-x-5 flex items-baseline">
                    <p className="text-lg text-gray-dark">
                      {yearlyEarning.toFormat(2)} CELO
                    </p>
                    <p className="text-gray">
                      $ {yearlyEarning.times(exchangeRate).toFormat(2)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray">Monthly Earnings</p>
                  <div className="mt-2 space-x-5 flex items-baseline">
                    <p className="text-lg text-gray-dark">
                      {monthlyEarning.toFormat(2)} CELO
                    </p>
                    <p className="text-gray">
                      $ {monthlyEarning.times(exchangeRate).toFormat(2)}
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="transition-all text-lg font-medium block w-full rounded-md mt-5 py-3 bg-primary text-white hover:bg-primary-dark focus:bg-primary-dark focus:outline-none active:bg-primary-dark-dark"
                onClick={() => {
                  if (
                    unlockedCelo === undefined ||
                    nonVotingLockedCelo === undefined
                  )
                    return;
                  /* 
                - If celoToInvest is lesser than nonVotingLocked
                  - continue to next step 
                - If celoToInvest is higher than nonVotingLockedCelo and lesser than the sum of unlockedCelo and nonVotingLockedCelo
                  - Lock the required CELO
                - If celoToInvest is higher than the sum of nonVotingLockedCelo and unlockedCelo
                  - Error state.
                */
                  const celoToInvestBN = new BigNumber(
                    parseFloat(celoToInvest)
                  ).times(1e18);

                  if (nonVotingLockedCelo.gte(celoToInvestBN)) {
                    // if available locked celo is more than celoToInvest
                    console.log("Continue.");
                    send("NEXT");
                  } else if (
                    nonVotingLockedCelo.plus(unlockedCelo).gt(celoToInvestBN)
                  ) {
                    // if the total of nonVotingLockedCelo and unlocked Celo is greater than celoToInvesdt
                    console.log("need to lock CELO");

                    lockCELO(celoToInvestBN.minus(nonVotingLockedCelo));
                  } else if (
                    nonVotingLockedCelo.plus(unlockedCelo).lt(celoToInvestBN)
                  ) {
                    // can't move forward, error.
                    console.log("can't move forward, error.");
                  }
                }}
              >
                Confirm &amp; Continue
              </button>
            </div>
          </div>

          {/* Voting Panel */}
          <div
            className={`border ${
              current.matches("idle") || current.matches("voting")
                ? "border-gray-light"
                : "border-primary bg-primary-light-light"
            } rounded-md p-5 lg:p-10`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start space-x-3">
                <h3
                  className={`${
                    current.matches("activating") ||
                    current.matches("completed")
                      ? "text-primary-dark"
                      : "text-gray-dark"
                  } text-xl`}
                >
                  Step 2: Vote For Validator
                </h3>
                {current.matches("activating") ||
                current.matches("completed") ? (
                  <svg
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M16 0C7.17794 0 0 7.17794 0 16C0 24.8221 7.17794 32 16 32C24.8221 32 32 24.8221 32 16C32 7.17794 24.8221 0 16 0ZM24.9424 11.7895L14.7168 21.9348C14.1153 22.5363 13.1529 22.5764 12.5113 21.9749L7.09774 17.0426C6.45614 16.4411 6.41604 15.4386 6.97744 14.797C7.57895 14.1554 8.58145 14.1153 9.22306 14.7168L13.5138 18.6466L22.6566 9.50376C23.2982 8.86215 24.3008 8.86215 24.9424 9.50376C25.584 10.1454 25.584 11.1479 24.9424 11.7895Z" />
                  </svg>
                ) : (
                  <button
                    className="-mb-1"
                    data-tip="In order to stake CELO, you need to cast vote towards electing Validator Groups on the network."
                  >
                    <InfoIcon />
                  </button>
                )}
              </div>
              {(current.matches("activating") ||
                current.matches("completed")) && (
                <p className="text-primary-light text-lg font-medium">
                  You are voting for: {selectedVg?.name}
                </p>
              )}
            </div>
            <div className={`${!current.matches("voting") && "hidden"}`}>
              <div className="text-gray mt-5">
                <p className="font-medium">
                  Why am I voting? What are Validator Groups?
                </p>
                <p className="mt-3 max-w-5xl">
                  Its easier than it sounds. Here’s how it work:
                  <ul className="list-disc list-inside my-2 space-y-1">
                    <li>
                      The staking process of Celo is based on the mechanism
                      where you vote for Validator Groups with your CELO
                    </li>
                    <li>
                      When the Validator Groups you vote for performs well - you
                      earn CELO. It's that simple!
                    </li>
                  </ul>
                  You don't have to go through the hustle of deciding which
                  Validator Group to vote for. We have the most suited Group for
                  you. You can vote for it right-away!
                </p>
              </div>
              <div className="mt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-dark">
                    Recommended Validator Group to vote for:
                  </span>
                  <button
                    className="text-primary flex items-center"
                    onClick={() => setVgDialogOpen(true)}
                  >
                    <span>
                      <svg
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-primary mr-2"
                      >
                        <g clip-path="url(#clip0)">
                          <path d="M19.8984 5.39233L26.4079 11.9018L9.93051 28.3792L3.42468 21.8697L19.8984 5.39233ZM31.3474 3.8224L28.4444 0.919403C27.3225 -0.202505 25.5007 -0.202505 24.375 0.919403L21.5942 3.70018L28.1038 10.2097L31.3474 6.96608C32.2175 6.09586 32.2175 4.69255 31.3474 3.8224ZM0.0181145 31.0193C-0.100351 31.5525 0.381012 32.0302 0.914225 31.9005L8.168 30.1418L1.66216 23.6323L0.0181145 31.0193Z" />
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="32" height="32" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Edit Validator Group preference
                  </button>
                </div>
                <div className="border border-gray-light rounded-md pl-6 pr-12 py-5 mt-3 overflow-x-auto">
                  <div className="flex">
                    <div className="flex items-center justify-center">
                      <button
                        className="text-gray-dark mx-auto flex items-center justify-center rounded-full p-2 relative z-10 hover:bg-primary-light-light focus:outline-none"
                        onClick={() => setExpandedVg((curr) => !curr)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`${expandedVg ? "rotate-180" : "rotate-0"}
                              h-6 w-6 transform transition-all duration-200`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-1 gap-9 text-center">
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">Name</span>
                        <span className="text-gray-dark text-base">
                          {selectedVg?.name}
                        </span>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">Group Score</span>
                        <span className="text-gray-dark text-base">
                          {selectedVg?.group_score
                            ? (selectedVg.group_score * 100).toFixed(2)
                            : "-"}{" "}
                          %
                        </span>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">Performance Score</span>
                        <span className="text-gray-dark text-base">
                          {selectedVg?.performance_score
                            ? (selectedVg.performance_score * 100).toFixed(2)
                            : "-"}{" "}
                          %
                        </span>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">Transparency Score</span>
                        <span className="text-gray-dark text-base">
                          {selectedVg?.transparency_score
                            ? (selectedVg.transparency_score * 100).toFixed(2)
                            : "-"}{" "}
                          %
                        </span>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">Estimated APY</span>
                        <span className="text-gray-dark text-base">
                          {selectedVg?.estimated_apy
                            ? selectedVg.estimated_apy.toFixed(2)
                            : "-"}{" "}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedVg && (
                    <div className="pl-6 mt-5 flex flex-1 gap-9 text-center">
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">
                          Elected/Total Validators
                        </span>
                        <div className="flex flex-wrap justify-center items-center">
                          {selectedVg?.validators.map((v) => (
                            <svg
                              key={v.address}
                              className={`h-4 w-4 ml-2 shadow-lg  ${
                                v.currently_elected
                                  ? "text-gray-dark"
                                  : "text-gray"
                              }`}
                              viewBox="0 0 32 32"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M31.9217 28.2182L25.8851 2.03636C25.53 0.872727 24.2102 0 23.5 0H8.5C7.61226 0 6.53233 0.872727 6.17724 2.03636L0.140599 28.2182C-0.392046 29.9636 0.673244 32 1.91608 32H29.9687C31.3891 32 32.2768 29.9636 31.9217 28.2182Z"
                                fill="currentColor"
                              />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">Received Votes</span>
                        <span className="text-gray-dark text-base">
                          {selectedVg?.recieved_votes
                            ? formatter.format(selectedVg.recieved_votes)
                            : "-"}{" "}
                          CELO
                        </span>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">Available Votes</span>
                        <span className="text-gray-dark text-base">
                          {selectedVg?.available_votes
                            ? formatter.format(selectedVg.available_votes)
                            : "-"}{" "}
                          CELO
                        </span>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">Epochs Served</span>
                        <span className="text-gray-dark text-base">
                          {selectedVg?.epochs_served
                            ? formatter.format(selectedVg.epochs_served)
                            : "-"}{" "}
                        </span>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">Locked CELO</span>
                        <span className="text-gray-dark text-base">
                          {selectedVg?.locked_celo
                            ? formatter.format(selectedVg.locked_celo)
                            : "-"}{" "}
                          CELO
                        </span>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">Slashing Penalty</span>
                        <span className="text-gray-dark text-base">
                          {selectedVg?.slashing_penalty_score
                            ? selectedVg.slashing_penalty_score.toFixed(2)
                            : "-"}{" "}
                        </span>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        <span className="text-gray">
                          Attestation Percentage
                        </span>
                        <span className="text-gray-dark text-base">
                          {selectedVg?.attestation_score
                            ? (selectedVg.attestation_score * 100).toFixed(2)
                            : "-"}{" "}
                          %
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                className="font-medium text-lg block w-full rounded-md mt-5 py-3 transition-all bg-primary text-white hover:bg-primary-dark focus:bg-primary-dark focus:outline-none active:bg-primary-dark-dark"
                onClick={() => {
                  voteOnVg();
                }}
              >
                Confirm & Continue
              </button>
            </div>
          </div>

          {/* Activate Votes Panel */}
          <div className="border border-gray-light rounded-md p-5 lg:p-10">
            <div className="flex items-center justify-start space-x-3">
              <h3 className="text-gray-dark text-xl">
                Step 3: Activate Staking
              </h3>
              <button
                className="-mb-1"
                data-tip="For security purposes, you need to Activate Vote in the next epoch. Only then the staking process will be complete."
              >
                <InfoIcon />
              </button>
            </div>
            <div
              className={`${
                !current.matches("activating") && "hidden"
              } font-medium`}
            >
              <p className="text-gray text-lg mt-5">Almost there!</p>
              <p className="text-gray mt-3">
                To finish staking & start earning rewards - please return back
                in{" "}
                <span className="text-primary text-lg">
                  {`${hoursToNextEpoch} ${
                    hoursToNextEpoch == 1 ? "hour" : "hours"
                  }`}
                </span>{" "}
                to activate your stake and start earning rewards.
              </p>
              <div className="mt-5 grid lg:grid-cols-2 gap-5">
                <button
                  className="text-primary flex items-center justify-center border-2 border-primary bg-white font-medium py-2 w-full text-lg rounded-md"
                  onClick={() => setReminderModalOpen(true)}
                >
                  <span className="mr-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.606 8.08232L15.9999 11.4923V4.52832L10.606 8.08232Z"
                        fill="#35D07F"
                      />
                      <path
                        d="M0 4.52832V11.4923L5.394 8.08232L0 4.52832Z"
                        fill="#35D07F"
                      />
                      <path
                        d="M15 2.5H1.00003C0.501029 2.5 0.105029 2.872 0.0300293 3.351L8.00003 8.602L15.97 3.351C15.895 2.872 15.499 2.5 15 2.5Z"
                        fill="#35D07F"
                      />
                      <path
                        d="M9.68998 8.68557L8.27498 9.61757C8.19098 9.67257 8.09598 9.69957 7.99998 9.69957C7.90398 9.69957 7.80898 9.67257 7.72498 9.61757L6.30998 8.68457L0.0319824 12.6556C0.108982 13.1306 0.502982 13.4996 0.999982 13.4996H15C15.497 13.4996 15.891 13.1306 15.968 12.6556L9.68998 8.68557Z"
                        fill="#35D07F"
                      />
                    </svg>
                  </span>
                  Add Email Reminder
                </button>
                <a
                  className="text-primary flex items-center justify-center border-2 border-primary bg-white font-medium py-2 w-full text-lg rounded-md"
                  href={`https://twitter.com/intent/tweet?text=I just staked some $CELO via @ChurritoFi. Earn rewards on the go with one of the simplest staking experiences on @CeloOrg protocol. Give it a try: https://churrito.fi`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-2">
                    <FaTwitter />
                  </span>
                  Tweet!
                </a>
              </div>
            </div>
          </div>
        </main>
      </>
    </Layout>
  );
}

export default Stake;
