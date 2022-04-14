import { useState, useEffect, useMemo, useCallback } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";

import { Switch, Transition } from "@headlessui/react";
import Loader from "react-loader-spinner";

import { BigNumber } from "bignumber.js";
import * as Fathom from "fathom-client";

import useStore from "../../store/store";

import ActivateVgDialog from "../../components/app/dialogs/activate-vg";
import CreateAccountDialog from "../../components/app/dialogs/create-account";

import {
  getCELOBalance,
  getNonVotingLockedGold,
  getVotingCelo,
  fetchPendingWithdrawals,
  getVgName,
  getVotingSummary,
} from "../../lib/celo";
import { GroupVoting } from "../../lib/types";

import Layout from "../../components/app/layout";
import StatGrid from "../../components/app/stat-grid";
import VotingSummary from "../../components/app/voting-summary";
import EpochRewardGraph from "../../components/app/EpochRewardGraph";

import { trackActivate } from "../../lib/supabase";

export default function dashboard() {
  const [votingSummary, setVotingSummary] = useState<GroupVoting[]>([]);
  const [loadingVotingSummary, setLoadingVotingSummary] =
    useState<boolean>(false);
  const [advancedEnabled, setAdvancedEnabled] = useState<boolean>(false);
  const [loadingAccountData, setLoadingAccountData] = useState<boolean>(false);
  const [pendingVotes, setPendingVotes] = useState<BigNumber>(new BigNumber(0));

  const { kit, address, connect, destroy, performActions } = useContractKit();

  const state = useStore();
  const userConnected = useMemo(() => state.user.length > 0, [state.user]);
  const hasActivatableVotes = state.hasActivatableVotes;

  const fetchVotingSummary = useCallback(() => {
    if (address == null) return;
    setLoadingVotingSummary(true);
    getVotingSummary(kit, address)
      .then((groupVotes) =>
        Promise.all(
          groupVotes.map(async (group) => ({
            vg: group.group,
            name: await getVgName(kit, group.group),
            active: group.active,
            pending: group.pending,
          }))
        )
      )
      .then((summary) => {
        setLoadingVotingSummary(false);
        setVotingSummary(summary);
        let pendingCELO = new BigNumber(0);
        for (let v of summary) {
          pendingCELO = pendingCELO.plus(v.pending);
        }
        // set pending votes.
        setPendingVotes(pendingCELO);
      });
  }, []);

  async function fetchAllAccountData(address: string) {
    setLoadingAccountData(true);
    const { totalCeloUnlocking, totalCeloWithdrawable } =
      await fetchPendingWithdrawals(kit, address);
    const celoBalance = await getCELOBalance(kit, address);
    const nonVotingLockedGold = await getNonVotingLockedGold(kit, address);
    const votingLockedCelo = await getVotingCelo(kit, address);

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
    setLoadingAccountData(false);
  }

  useEffect(() => {
    if (address != null) {
      // fetches and sets the data to global store.
      fetchAllAccountData(address);

      // gets all Vgs voted for by the user.
      fetchVotingSummary();

      Fathom.trackGoal("H0U4OOXH", 0);
    }
  }, [address]);

  async function connectWallet() {
    await connect();

    Fathom.trackGoal("Z3PWXCND", 0);
  }

  const activateVg = async () => {
    if (address == null) return;
    try {
      await performActions(async (k) => {
        const election = await k.contracts.getElection();
        await Promise.all(
          (
            await election.activate(address)
          ).map((tx) => tx.sendAndWaitForReceipt({ from: k.defaultAccount }))
        );
      });
      trackActivate(address);
      console.log("Votes activated");
      state.setHasActivatableVotes(false);
    } catch (e) {
      console.log(`Unable to activate votes ${e}`);
    } finally {
      fetchAllAccountData(address);
      fetchVotingSummary();
    }
  };

  return (
    <Layout>
      <>
        <ActivateVgDialog open={hasActivatableVotes} activate={activateVg} />
        <CreateAccountDialog />
        {!userConnected ? (
          <div>
            <div className="text-gray-dark">
              <h3 className="text-2xl font-medium">Welcome, celo holder!</h3>
              <p className="mt-2.5 text-gray text-lg lg:w-4/5">
                Safest way to put your CELO to work &amp; earn rewards on the
                go! All you need to get started is a Celo Wallet &amp; some CELO
                in it. Staking CELO has never been this easy. Let’s get started
                by connecting your Celo Wallet...
              </p>
            </div>
            <div className="mt-12 lg:mt-24 flex flex-col justify-center items-center">
              <img src="/assets/wallet.svg" />
              <button
                className="text-white bg-primary rounded-md px-10 py-3 mt-14 space-x-3 flex items-center"
                onClick={connectWallet}
              >
                <img src="/assets/celo-wallet.png" />
                <span>Connect Celo Wallet</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center text-gray-dark">
              <h3 className="text-2xl font-medium">Dashboard</h3>
              <p>
                <Switch.Group as="div" className="flex items-center">
                  <Switch.Label as="span" className="mr-3">
                    <span
                      className={`${
                        advancedEnabled ? "text-primary" : "text-gray"
                      } text-medium`}
                    >
                      Advanced View
                    </span>
                  </Switch.Label>
                  <Switch
                    checked={advancedEnabled}
                    onChange={setAdvancedEnabled}
                    className={`${
                      advancedEnabled ? "bg-primary" : "bg-gray-light"
                    }
                      relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-gray-light rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        advancedEnabled ? "translate-x-5" : "translate-x-0"
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </Switch>
                </Switch.Group>
              </p>
            </div>
            <div className="mt-5 lg:mt-10">
              {loadingAccountData && (
                <div className="h-full flex justify-center items-center">
                  <Loader type="Oval" color="#35d07f" height={60} width={60} />
                </div>
              )}

              <Transition
                show={!loadingAccountData}
                enter="transition-all duration-200 transform"
                enterFrom="opacity-0 -translate-y-36"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <StatGrid
                  advanced={advancedEnabled}
                  pendingVotes={pendingVotes}
                />
              </Transition>
            </div>
            <div>
              <EpochRewardGraph address={address} kit={kit} />
            </div>
            <VotingSummary
              votingSummary={votingSummary}
              loading={loadingVotingSummary}
              showWithdraw={!advancedEnabled}
            />
          </div>
        )}
      </>
    </Layout>
  );
}
