import { WrapperCache } from "@celo/contractkit/lib/contract-cache";
import { useCelo as useCeloOrig, UseCelo } from "@celo/react-celo";

export function useCelo() {
  const { contractsCache, ...rest } = useCeloOrig();

  return {
    ...rest,
    contracts: contractsCache as WrapperCache,
  };
}
