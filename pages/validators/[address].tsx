import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "../../components/home/nav";
import useVg from "../../hooks/useVg";
import { ValidatorGroup } from "../../lib/types";
import ProfileHeader from "../../components/vg/ProfileHeader";
import PerformanceMetricsPanel from "../../components/vg/PerformanceMetricPanel";
import ValidatorsPanel from "../../components/vg/ValidatorsPanel";
import Link from "next/link";

function ValidatorGroupPage() {
  const address = useRouter().query.address;
  const [vg, setVg] = useState<ValidatorGroup>();

  const { fetching, error, data: validatorGroup } = useVg(String(address));

  useEffect(() => {
    if (!fetching && !error && validatorGroup) {
      setVg(validatorGroup.validator_groups[0] ?? undefined);
    }
  }, [fetching, validatorGroup]);

  return (
    <>
      <Nav />
      {vg && (
        <div className="relative px-40 mt-48 mb-24">
          <ProfileHeader vg={vg} />
          <PerformanceMetricsPanel vg={vg} />
          <ValidatorsPanel vg={vg} />
          <Link href={`/app/stake?vg=${vg.address}`} passHref>
            <a
              target="_blank"
              className="fixed bottom-20 right-40 bg-primary hover:bg-primary-dark focus:bg-primary-dark active:bg-primary-dark-dark focus:outline-none px-14 py-3 rounded-md text-white text-lg font-medium shadow-sm transition-all"
            >
              Stake on {vg.name ? vg.name : `${vg.address.slice(0, 8)}...`}
            </a>
          </Link>
        </div>
      )}
    </>
  );
}

export default ValidatorGroupPage;
