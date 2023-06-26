// import { WrapperCache } from "@celo/contractkit/lib/contract-cache";
// import { useCelo as useCeloOrig, UseCelo } from "@celo/react-celo";

import { useAccount, useDisconnect, useNetwork } from "wagmi";
import { Address, getContract, multicall, getWalletClient } from "@wagmi/core";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import {
  registryABI,
  accountsABI,
  blockchainParametersABI,
  goldTokenABI,
  lockedGoldABI,
  electionABI,
  epochRewardsABI,
  validatorsABI,
} from "../lib/abis/celo";
import { useMemo, useRef } from "react";

const REGISTRY_CONTRACT_ADDRESS = "0x000000000000000000000000000000000000ce10";

const CONTRACTS = {
  Accounts: accountsABI,
  BlockchainParameters: blockchainParametersABI,
  GoldToken: goldTokenABI,
  LockedGold: lockedGoldABI,
  Election: electionABI,
  EpochRewards: epochRewardsABI,
  Validators: validatorsABI,
};

async function getContracts() {
  const contractAddresses: Address[] = await multicall({
    contracts: Object.keys(CONTRACTS).map(
      (name) =>
        ({
          address: REGISTRY_CONTRACT_ADDRESS,
          abi: registryABI,
          functionName: "getAddressForString",
          args: [name],
        } as const)
    ),
    allowFailure: false,
  });

  const walletClient = (await getWalletClient({ chainId: 42220 })) ?? undefined;

  // Repetitive code, but at least it's type safe
  const contractsByName = {
    Accounts: getContract({
      address: contractAddresses[0],
      abi: accountsABI,
      walletClient,
    }),
    BlockchainParameters: getContract({
      address: contractAddresses[1],
      abi: blockchainParametersABI,
      walletClient,
    }),
    GoldToken: getContract({
      address: contractAddresses[2],
      abi: goldTokenABI,
      walletClient,
    }),
    LockedGold: getContract({
      address: contractAddresses[3],
      abi: lockedGoldABI,
      walletClient,
    }),
    Election: getContract({
      address: contractAddresses[4],
      abi: electionABI,
      walletClient,
    }),
    EpochRewards: getContract({
      address: contractAddresses[5],
      abi: epochRewardsABI,
      walletClient,
    }),
    Validators: getContract({
      address: contractAddresses[6],
      abi: validatorsABI,
      walletClient,
    }),
  };

  // const contractsByName = typeSafeObjectFromEntries(
  //   typeSafeObjectEntries(CONTRACTS).map(([name, abi], i) => {
  //     return [
  //       name,
  //       getContract({
  //         address: contractAddresses[i],
  //         abi,
  //         walletClient,
  //       }),
  //     ];
  //   })
  // );

  return contractsByName;
}

function useContracts() {
  // const walletClient = useWalletClient();
  const contractsPromise = useRef(getContracts());

  // useEffect(() => {
  //   console.log("Changing contracts promise");
  //   contractsPromise.current = getContracts();
  // }, [walletClient]);

  const contracts = useMemo(() => {
    return {
      getAccounts: () =>
        contractsPromise.current.then((contracts) => {
          return contracts.Accounts;
        }),
      getBlockchainParameters: () =>
        contractsPromise.current.then((contracts) => {
          return contracts.BlockchainParameters;
        }),
      getGoldToken: () =>
        contractsPromise.current.then((contracts) => {
          return contracts.GoldToken;
        }),
      getLockedGold: () =>
        contractsPromise.current.then((contracts) => {
          return contracts.LockedGold;
        }),
      getElection: () =>
        contractsPromise.current.then((contracts) => {
          return contracts.Election;
        }),
      getEpochRewards: () =>
        contractsPromise.current.then((contracts) => {
          return contracts.EpochRewards;
        }),
      getValidators: () =>
        contractsPromise.current.then((contracts) => {
          return contracts.Validators;
        }),
    };
    // return typeSafeObjectFromEntries(
    //   typeSafeObjectEntries(CONTRACTS).map(([name, abi]) => {
    //     return [
    //       `get${name}`,
    //       contractsPromise.current.then((contracts) => {
    //         return contracts[name];
    //       }),
    //     ];
    //   })
    // );
  }, []);

  return contracts;
}

export type Contracts = ReturnType<typeof useContracts>;

export function useCelo() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const contracts = useContracts();
  const network = useNetwork();
  // const { contractsCache, ...rest } = useCeloOrig();

  return {
    // ...rest,
    // contracts: contractsCache as WrapperCache,
    network: network.chain,
    address,
    openConnectModal,
    destroy: disconnect,
    contracts,
  };
}
