import Link from "next/link";
import React, { useEffect, useState } from "react";
import useVg from "../../hooks/useVg";
import { Validator, ValidatorGroup } from "../../lib/types";
import useStore from "../../store/vg-store";
import PerformanceMetricsPanel from "./PerformanceMetricPanel";
import TransparencyScoreBar from "./transparency-score-bar";
import ValidatorsPanel from "./ValidatorsPanel";
import WelcomeHeading from "./welcome-heading";

const formatter = new Intl.NumberFormat("en-US");
export default function VgDash() {
  const [vg, setVg] = useState<ValidatorGroup>();
  const user = useStore((state) => state.user);
  const { fetching, error, data: validatorGroup } = useVg(user);

  useEffect(() => {
    if (validatorGroup) {
      setVg(validatorGroup.validator_groups[0] ?? undefined);
    }
  }, [fetching, validatorGroup]);

  return (
    <>
      {(() => {
        if (error) {
          console.log(error);
        } else if (!fetching && vg) {
          return (
            <>
              <WelcomeHeading name={vg.name} address={vg.address} />
              <TransparencyScoreBar score={Number(vg.transparency_score)} />
              <NavButtons />
              <PerformanceMetricsPanel vg={vg} />
              <ValidatorsPanel vg={vg} />
            </>
          );
        }
      })()}
    </>
  );
}

function NavButtons() {
  return (
    <div className="mt-10 space-x-4 text-center">
      <Link
        href="/vg/edit"
        passHref
        className="inline-block px-11 py-3 border-2 border-primary bg-primary text-white font-medium rounded-md"
      >
        Complete Your Profile
      </Link>
      <Link
        href="/vg/profile"
        passHref
        className="inline-block px-11 py-3 bg-white text-primary border-2 border-primary font-medium rounded-md"
      >
        View Your Profile
      </Link>
    </div>
  );
}
