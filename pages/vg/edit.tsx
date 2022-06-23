import React, { useEffect, useMemo, useRef, useState } from "react";

import useStore from "../../store/vg-store";
import Layout from "../../components/vg/layout";
import { ValidatorGroup } from "../../lib/types";
import useVg from "../../hooks/useVg";
import WelcomeHeading from "../../components/vg/welcome-heading";
import TransparencyScoreBar from "../../components/vg/transparency-score-bar";
import VgEditForm from "../../components/vg/vg-edit-form";
import TwitterDialog from "../../components/vg/dialogs/twitter";

import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import Loading from "../../components/Loading";
import { useCelo } from "../../hooks/useCelo";

const EditMachine = createMachine({
  id: "EditMachine",
  initial: "loading",
  states: {
    loading: {
      on: { NEXT: "idle", ERROR: "error" },
    },
    idle: {
      on: { NEXT: "updating" },
    },
    updating: {
      on: { NEXT: "idle", ERROR: "error" },
    },
    error: {
      on: { NEXT: "idle" },
    },
  },
});

export default function Edit() {
  const [current, send] = useMachine(EditMachine);
  console.log(current.value);
  const { address, network } = useCelo();
  const state = useStore();
  const [vg, setVg] = useState<ValidatorGroup>();
  const [twitterOpen, setTwitterOpen] = useState(false);

  const { fetching, error, data: validatorGroup } = useVg(state.user);
  const effectRunCount = useRef(0);

  useEffect(() => {
    if (!fetching && !error && validatorGroup) {
      effectRunCount.current++;
      if (effectRunCount.current === 1) {
        console.log("loading complete.");
        send("NEXT");
      }

      setVg(validatorGroup.validator_groups[0] ?? undefined);
    }
  }, [fetching, validatorGroup]);

  useEffect(() => {
    state.setNetwork(network.name);
    if (address == null) return;
    const GROUP = "0x614b7654ba0cc6000abe526779911b70c1f7125a";
    const TESTING_ADDRESS = "0x6f80f637896e7068ad28cc45d6810b1dc8b08cf5";
    if (address === "") return;
    if (address == TESTING_ADDRESS) {
      state.setUser(GROUP);
    } else {
      state.setUser(address);
    }
  }, [address]);

  useEffect(() => {
    console.log(current.value);
  }, [current.value]);

  return (
    <Layout>
      <>
        <Loading
          open={current.matches("updating") || current.matches("loading")}
        />
        <TwitterDialog open={twitterOpen} setOpen={setTwitterOpen} />
        {vg && (
          <div>
            <WelcomeHeading name={vg.name} address={vg.address} />
            <TransparencyScoreBar score={Number(vg.transparency_score)} />
            <VgEditForm
              vg={vg}
              setVg={setVg}
              send={send}
              setTwitterOpen={() => setTwitterOpen(true)}
            />
          </div>
        )}
      </>
    </Layout>
  );
}
