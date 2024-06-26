import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Head from "next/head";

import useVg from "../../hooks/useVg";
import useStore from "../../store/vg-store";
import { ValidatorGroup } from "../../lib/types";
import CODE from "../../widget-code";

import Layout from "../../components/vg/layout";
import Loading from "../../components/Loading";
import CopyIcon from "../../components/icons/copy";
import { useCelo } from "../../hooks/useCelo";

const CodeBlock = ({ snippet }: { snippet: string }) => {
  return (
    <pre className="relative p-4 pt-8 pr-8 bg-gray-light border-2 border-gray rounded-md">
      <button
        onClick={() => {
          navigator.clipboard.writeText(snippet);
          toast.success("Code for the widget has been copied!");
        }}
        className="absolute top-4 right-4"
      >
        <CopyIcon size="lg" color="text-gray-dark" />
      </button>
      {snippet}
    </pre>
  );
};

export default function Widgets() {
  const { address, network } = useCelo();
  const state = useStore();
  const [vg, setVg] = useState<ValidatorGroup>();

  const { fetching, error, data: validatorGroup } = useVg(state.user);

  useEffect(() => {
    if (!fetching && !error && validatorGroup) {
      setVg(validatorGroup.validator_groups[0] ?? undefined);
    }
  }, [fetching, validatorGroup]);

  useEffect(() => {
    if (!address) return;
    if (network) {
      state.setNetwork(network.name);
    }
    const GROUP = "0x15ed3f6b79f5fb9ef1d99d37314dd626b3005f0b";
    const TESTING_ADDRESS = "0x6f80f637896e7068ad28cc45d6810b1dc8b08cf5";
    if (address == TESTING_ADDRESS) {
      state.setUser(GROUP);
    } else {
      state.setUser(address);
    }
  }, [address]);

  return (
    <>
      <Head>
        <script
          src="https://unpkg.com/churrofi-widgets@0.1.1/dist/churrofi-widgets-xl.js?module"
          type="module"
        />
        <script
          src="https://unpkg.com/churrofi-widgets@0.1.1/dist/churrofi-widgets-lg.js?module"
          type="module"
        />
        <script
          src="https://unpkg.com/churrofi-widgets@0.1.1/dist/churrofi-widgets-md.js?module"
          type="module"
        />
        <script
          src="https://unpkg.com/churrofi-widgets@0.1.1/dist/churrofi-widgets-sm.js?module"
          type="module"
        />
        <script
          src="https://unpkg.com/churrofi-widgets@0.1.1/dist/churrofi-widgets-xs.js?module"
          type="module"
        />
      </Head>

      <Layout>
        <div className="text-gray-dark">
          {vg ? (
            <>
              <header>
                <h1 className="text-2xl text-gray-dark font-medium">Widgets</h1>
                <p className="mt-5">
                  Choose from a wide range of Voting Wigets based on your
                  website’s theme & available space, to make it easy for CELO
                  Holders to vote.
                </p>
                {/* <TabGroup selected={selected} setSelected={setSelected} /> */}
              </header>
              <main className="mt-5 text-gray-dark space-y-10">
                <section className="border border-gray-light p-10 rounded-md">
                  <h3 className="text-xl font-medium">Extra Large Widgets</h3>
                  <div className="mt-5 space-y-10">
                    <div className="grid grid-cols-2">
                      <churrofi-widgets-xl
                        address={vg.address}
                        name={vg.name}
                      />

                      <CodeBlock
                        snippet={CODE("xl", vg.address, vg.name, false)}
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <churrofi-widgets-xl
                        address={vg.address}
                        name={vg.name}
                        theme="green"
                      />

                      <CodeBlock
                        snippet={CODE("xl", vg.address, vg.name, true)}
                      />
                    </div>
                  </div>
                </section>
                <section className="border border-gray-light p-10 rounded-md">
                  <h3 className="text-xl font-medium">Large Widgets</h3>
                  <div className="mt-5 space-y-10">
                    <div className="grid grid-cols-2">
                      <churrofi-widgets-lg
                        address={vg.address}
                        name={vg.name}
                      />

                      <CodeBlock
                        snippet={CODE("lg", vg.address, vg.name, false)}
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <churrofi-widgets-lg
                        address={vg.address}
                        name={vg.name}
                        theme="green"
                      />

                      <CodeBlock
                        snippet={CODE("lg", vg.address, vg.name, true)}
                      />
                    </div>
                  </div>
                </section>
                <section className="border border-gray-light p-10 rounded-md">
                  <h3 className="text-xl font-medium">Medium Widgets</h3>
                  <div className="mt-5 space-y-10">
                    <div className="grid grid-cols-2">
                      <churrofi-widgets-md
                        address={vg.address}
                        name={vg.name}
                      />

                      <CodeBlock
                        snippet={CODE("md", vg.address, vg.name, false)}
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <churrofi-widgets-md
                        address={vg.address}
                        name={vg.name}
                        theme="green"
                      />

                      <CodeBlock
                        snippet={CODE("md", vg.address, vg.name, true)}
                      />
                    </div>
                  </div>
                </section>
                <section className="border border-gray-light p-10 rounded-md">
                  <h3 className="text-xl font-medium">Small Widgets</h3>
                  <div className="mt-5 space-y-10">
                    <div className="grid grid-cols-2">
                      <churrofi-widgets-sm
                        address={vg.address}
                        name={vg.name}
                      />

                      <CodeBlock
                        snippet={CODE("sm", vg.address, vg.name, false)}
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <churrofi-widgets-sm
                        address={vg.address}
                        name={vg.name}
                        theme="green"
                      />

                      <CodeBlock
                        snippet={CODE("sm", vg.address, vg.name, true)}
                      />
                    </div>
                  </div>
                </section>
                <section className="border border-gray-light p-10 rounded-md">
                  <h3 className="text-xl font-medium">Extra Small Widgets</h3>
                  <div className="mt-5 space-y-10">
                    <div className="grid grid-cols-2">
                      <churrofi-widgets-xs
                        address={vg.address}
                        name={vg.name}
                      />

                      <CodeBlock
                        snippet={CODE("xs", vg.address, vg.name, false)}
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <churrofi-widgets-xs
                        address={vg.address}
                        name={vg.name}
                        theme="green"
                      />
                      <CodeBlock
                        snippet={CODE("xs", vg.address, vg.name, false)}
                      />
                    </div>
                  </div>
                </section>
              </main>
            </>
          ) : (
            <Loading open={!vg} />
          )}
        </div>
      </Layout>
    </>
  );
}
