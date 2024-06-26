import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/vg/layout";
import useStore from "../../store/vg-store";
import useVgList from "../../hooks/useVgAddressList";
import CheckingVg from "../../components/vg/dialogs/checking-vg";
import Link from "next/link";
import VgDash from "../../components/vg/dash";
import vgMapping from "../../vg-mapping";

import { FaVolumeUp } from "react-icons/fa";
import { useCelo } from "../../hooks/useCelo";

function Dashboard() {
  const { openConnectModal, address, network } = useCelo();
  const state = useStore();
  const userConnected: boolean = !(address == null);
  const {
    validatorGroups,
    loading: vgListLoading,
  }: { validatorGroups: string[]; loading: boolean } = useVgList();

  const [isVg, setIsVg] = useState(false);
  useEffect(() => {
    if (address == null) return;
    state.setUser(address);
    if (!network) return;
    state.setNetwork(network.name);
  }, [address]);

  useEffect(() => {
    console.log(vgMapping.map((vg) => vg.Beneficiary));

    const GROUP = "0x614b7654ba0cc6000abe526779911b70c1f7125a";
    const TESTING_ADDRESS = [
      // "0x6f80f637896e7068ad28cc45d6810b1dc8b08cf5",
      "0xcecdcb570c5433d8ba004b7a5a793cc97aa517b6",
      "0x3a85a88a1d7ced078066ce8f9cd524e965265b1e",
      "0xec687AF2f05e6472BfE3eD63Bef9261609040700",
    ];
    if (address == null || vgListLoading) return;
    if (TESTING_ADDRESS.includes(address)) {
      setIsVg(true);
      state.setUser(GROUP);
    } else {
      if (validatorGroups.map((a) => a.toLowerCase()).includes(address)) {
        setIsVg(true);
        state.setUser(address);
      } else {
        const vgAccount = vgMapping.find(
          (vg) => vg.Beneficiary.toLowerCase() === address
        );
        if (vgAccount) {
          setIsVg(true);
          state.setUser(vgAccount.ContractAddress.toLowerCase());
        }
      }
    }
  }, [address, vgListLoading]);

  return (
    <Layout>
      <>
        <CheckingVg dialogOpen={userConnected && !isVg && vgListLoading} />
        {!userConnected ? (
          <div>
            <div>
              <h3 className="text-2xl font-medium">Welcome!</h3>
              <p className="mt-2.5 text-gray text-lg">
                Please connect the Celo Wallet of your Validator Group to log in
                to your profile. <br />
                If your group address is a{" "}
                <span className="text-secondary-dark">ReleaseGold</span>{" "}
                contract, connect the address of the beneficiary to log in to
                your profile:
              </p>
            </div>
            <div className="mt-24 flex flex-col justify-center items-center">
              <img src="/assets/wallet.svg" />
              <button
                className="text-white bg-primary rounded-md px-10 py-3 mt-14 space-x-3 flex items-center"
                onClick={() => openConnectModal?.()}
              >
                <img src="/assets/celo-wallet.png" />
                <span>Connect Celo Wallet</span>
              </button>
            </div>
          </div>
        ) : (
          <div id="app-div">
            {(() => {
              if (!vgListLoading) {
                if (isVg) {
                  return (
                    <div>
                      <VgDash />
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <h3 className="text-2xl font-medium">
                        Oops, your account is not a validator group.
                      </h3>
                      <p className="text-gray-dark mt-2 text-lg">
                        It seems like this account is not registered as a
                        Validator Group. Try logging in as a CELO Holder
                        instead?
                      </p>
                      <p className="text-gray-dark mt-1 text-lg">
                        In case you're having trouble logging in to your
                        dashboard as a validator group, please fill up this{" "}
                        <a
                          href="https://forms.gle/5trDsGFgPWr2c2Ra7"
                          target="_blank"
                          rel="norefferer"
                          className="font-medium text-primary-dark-dark"
                        >
                          form
                        </a>
                        .
                      </p>
                      <Link
                        href="/app/dashboard"
                        passHref
                        className="mt-6 text-white text-lg bg-primary rounded-md px-10 py-3 inline-block"
                      >
                        Login as a CELO holder
                      </Link>
                    </div>
                  );
                }
              }
            })()}
          </div>
        )}
      </>
    </Layout>
  );
}

export default Dashboard;
