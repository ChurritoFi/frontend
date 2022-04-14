import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useVg from "../../../hooks/useVg";
import { ValidatorGroup } from "../../../lib/types";
import ProfileHeader from "../../../components/vg/ProfileHeader";
import PerformanceMetricsPanel from "../../../components/vg/PerformanceMetricPanel";
import ValidatorsPanel from "../../../components/vg/ValidatorsPanel";
import Layout from "../../../components/app/layout";

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
    <Layout>
      <>
        {vg && (
          <div>
            <ProfileHeader vg={vg} />
            <PerformanceMetricsPanel vg={vg} />
            <ValidatorsPanel vg={vg} />
          </div>
        )}
      </>
    </Layout>
  );
}

export default ValidatorGroupPage;
