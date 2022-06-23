import { useCallback, useEffect, useState } from "react";
import { ValidatorGroup } from "@celo/contractkit/lib/wrappers/Validators";
import { useCelo } from "./useCelo";

export default function useValidatorGroups() {
  const { contracts } = useCelo();
  const [validatorGroups, setValidatorGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const getVgs = useCallback(async () => {
    const validators = await contracts.getValidators();
    const registeredGroups: ValidatorGroup[] =
      await validators.getRegisteredValidatorGroups();
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
