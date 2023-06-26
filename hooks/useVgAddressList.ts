import { useCallback, useEffect, useState } from "react";
import { useCelo } from "./useCelo";
import { getRegisteredValidatorGroups, ValidatorGroup } from "../lib/celo";

export default function useValidatorGroups() {
  const { contracts } = useCelo();
  const [validatorGroups, setValidatorGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const getVgs = useCallback(async () => {
    const registeredGroups: ValidatorGroup[] =
      await getRegisteredValidatorGroups(contracts);
    return registeredGroups;
  }, []);

  useEffect(() => {
    getVgs().then((vgs) => {
      setValidatorGroups(vgs.map((vg) => vg.address));
      setLoading(false);
    });
  }, []);
  return { validatorGroups, loading };
}
