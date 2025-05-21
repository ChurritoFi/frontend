import { useAccount, useDisconnect, useNetwork, useWalletClient } from "wagmi";
import { Address, getContract, multicall, getWalletClient } from "@wagmi/core";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Abi, Hash, WalletClient } from "viem";
import { getDataSuffix, submitReferral } from "@divvi/referral-sdk";

import {
  registryABI,
  accountsABI,
  blockchainParametersABI,
  goldTokenABI,
  lockedGoldABI,
  electionABI,
  epochRewardsABI,
  validatorsABI,
} from "@celo/abis/types/wagmi";
import { useEffect, useMemo, useRef } from "react";

const REGISTRY_CONTRACT_ADDRESS = "0x000000000000000000000000000000000000ce10";

const STORAGE_KEY_BASE = "divvi-submitted-suffixes-"; // Base key
const MAX_RETRIES = 5;

// Helper to generate a user-specific storage key, ensuring address is lowercased
function getUserStorageKey(userAddress: Address): string {
  return STORAGE_KEY_BASE + userAddress.toLowerCase();
}

// Helper to check if a data suffix was already submitted for a given user
function isDataSuffixSubmitted(
  dataSuffix: string,
  userAddress: Address
): boolean {
  const userStorageKey = getUserStorageKey(userAddress);
  try {
    const stored = localStorage.getItem(userStorageKey);
    if (stored) {
      const userSubmissions = JSON.parse(stored) as string[];
      return userSubmissions.includes(dataSuffix);
    }
  } catch (e) {
    console.error(
      "Failed to read submitted suffixes from localStorage for user:",
      userAddress,
      e
    );
  }
  return false;
}

// Helper to mark a data suffix as submitted in localStorage for a given user
function markDataSuffixAsSubmitted(
  dataSuffix: string,
  userAddress: Address
): void {
  const userStorageKey = getUserStorageKey(userAddress);
  let userSubmissions: string[] = [];
  try {
    const stored = localStorage.getItem(userStorageKey);
    if (stored) {
      userSubmissions = JSON.parse(stored) as string[];
    }
    if (!userSubmissions.includes(dataSuffix)) {
      userSubmissions.push(dataSuffix);
      localStorage.setItem(userStorageKey, JSON.stringify(userSubmissions));
    }
  } catch (e) {
    console.error(
      "Failed to save submitted suffix to localStorage for user:",
      userAddress,
      e
    );
  }
}

const CONTRACTS = {
  Accounts: accountsABI,
  BlockchainParameters: blockchainParametersABI,
  GoldToken: goldTokenABI,
  LockedGold: lockedGoldABI,
  Election: electionABI,
  EpochRewards: epochRewardsABI,
  Validators: validatorsABI,
};

// Define a minimal type for what we expect from a contract with write methods
// This helps avoid issues with specific GetContractReturnType exports from wagmi/core
interface WritableContract {
  write: Record<string, (...args: any[]) => Promise<`0x${string}`>>;
  // Allow other properties to ensure the original contract structure is preserved
  [key: string]: any;
}

// Helper function to retry the referral submission
async function submitReferralWithRetry(
  txHash: Hash,
  dataSuffix: string,
  userAddress: Address,
  attempt = 1
): Promise<void> {
  // Skip if this suffix was already submitted successfully for this user
  if (isDataSuffixSubmitted(dataSuffix, userAddress)) {
    console.log(
      "Skipping referral submission - already submitted for this suffix by user",
      dataSuffix,
      userAddress
    );
    return;
  }
  console.log(
    `Submitting divvi referral (attempt ${attempt}/${MAX_RETRIES})`,
    txHash,
    dataSuffix,
    userAddress
  );

  try {
    const res = await submitReferral({
      txHash,
      chainId: 42220,
    });
    const body = await res.json();
    console.log(
      "Divvi referral submitted successfully",
      body,
      dataSuffix,
      userAddress
    );

    // Mark this suffix as successfully submitted for this user
    markDataSuffixAsSubmitted(dataSuffix, userAddress);
  } catch (e) {
    // Don't retry if it's a client error
    if (e instanceof Error && e.message.startsWith("Client error:")) {
      console.error(
        "Failed to submit divvi referral (client error)",
        dataSuffix,
        userAddress,
        e
      );
      return;
    }

    // Retry up to 5 times
    if (attempt < MAX_RETRIES) {
      // Exponential backoff: 1s, 2s, 4s, 8s
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.log(
        `Retrying divvi referral submission in ${delay}ms`,
        dataSuffix,
        userAddress
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return submitReferralWithRetry(
        txHash,
        dataSuffix,
        userAddress,
        attempt + 1
      );
    }

    console.error(
      `Failed to submit divvi referral after ${MAX_RETRIES} attempts`,
      dataSuffix,
      userAddress,
      e
    );
  }
}

// Helper function to wrap contract write interactions with the Divvi dataSuffix
function wrapContractWithDataSuffix<TContract extends WritableContract>(
  contractInstance: TContract,
  initialUserAddress: Address | undefined // Address from walletClient at init time
): TContract {
  if (!contractInstance.write || !initialUserAddress) {
    // Skip if no write methods or no initial address
    return contractInstance;
  }

  const writeProxy = new Proxy(contractInstance.write, {
    get(target, prop: string) {
      const originalMethod = target[prop];
      if (typeof originalMethod !== "function") {
        return originalMethod;
      }

      return async (...args: any[]): Promise<`0x${string}`> => {
        const hasArgs = args.length && Array.isArray(args[0]);
        const methodArgs = hasArgs ? args[0] : [];
        const options = (hasArgs ? args[1] : args[0]) ?? {};

        const actingUserAddress =
          (typeof options.account === "string"
            ? (options.account as Address | undefined)
            : undefined) || initialUserAddress;

        if (!actingUserAddress) {
          // This should never happen
          throw new Error("No acting user address found");
        }

        const dataSuffix = getDataSuffix({
          consumer: "0x3e6e1f37249bb22d8543fdb0728716632eac24ac", // ChurritoFi
          providers: [
            "0x5f0a55fad9424ac99429f635dfb9bf20c3360ab8", // Proof of Ship – Divvi Track
            "0x6226dde08402642964f9a6de844ea3116f0dfc7e", // Divvi Integration Rewards
            "0x0423189886d7966f0dd7e7d256898daeee625dca", // Proof of Impact Season 0
            "0xc95876688026be9d6fa7a7c33328bd013effa2bb", // Scout Game
          ],
        });

        const txHash = await originalMethod(methodArgs, {
          ...options,
          dataSuffix,
        });

        // Submit in the background without blocking
        submitReferralWithRetry(txHash, dataSuffix, actingUserAddress).catch(
          (e) => {
            console.error("Unexpected error in retry mechanism", e);
          }
        );

        return txHash;
      };
    },
  });

  return {
    ...contractInstance,
    write: writeProxy,
  };
}

async function initContracts() {
  console.log("Init contracts");
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
  const initialUserAddress = walletClient?.account?.address;

  if (!walletClient) {
    console.log("No wallet client");
  } else {
    console.log("Got wallet client, user address:", initialUserAddress);
  }

  // Repetitive code, but at least it's type safe
  const contractsByName = {
    Accounts: wrapContractWithDataSuffix(
      getContract({
        address: contractAddresses[0],
        abi: accountsABI,
        walletClient,
      }),
      initialUserAddress
    ),
    BlockchainParameters: wrapContractWithDataSuffix(
      getContract({
        address: contractAddresses[1],
        abi: blockchainParametersABI,
        walletClient,
      }),
      initialUserAddress
    ),
    GoldToken: wrapContractWithDataSuffix(
      getContract({
        address: contractAddresses[2],
        abi: goldTokenABI,
        walletClient,
      }),
      initialUserAddress
    ),
    LockedGold: wrapContractWithDataSuffix(
      getContract({
        address: contractAddresses[3],
        abi: lockedGoldABI,
        walletClient,
      }),
      initialUserAddress
    ),
    Election: wrapContractWithDataSuffix(
      getContract({
        address: contractAddresses[4],
        abi: electionABI,
        walletClient,
      }),
      initialUserAddress
    ),
    EpochRewards: wrapContractWithDataSuffix(
      getContract({
        address: contractAddresses[5],
        abi: epochRewardsABI,
        walletClient,
      }),
      initialUserAddress
    ),
    Validators: wrapContractWithDataSuffix(
      getContract({
        address: contractAddresses[6],
        abi: validatorsABI,
        walletClient,
      }),
      initialUserAddress
    ),
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

let contractsPromise: ReturnType<typeof initContracts> | undefined;
let hadWalletClient = false;

function getContracts() {
  contractsPromise =
    contractsPromise ??
    initContracts().catch((e) => {
      contractsPromise = undefined;
      throw e;
    });
  return contractsPromise;
}

function useContracts() {
  const { data: walletClient } = useWalletClient();

  // Reset contracts if wallet client changes
  if (walletClient && !hadWalletClient) {
    hadWalletClient = true;
    contractsPromise = undefined;
  } else if (!walletClient && hadWalletClient) {
    hadWalletClient = false;
    contractsPromise = undefined;
  }

  const contracts = useMemo(() => {
    return {
      getAccounts: () =>
        getContracts().then((contracts) => {
          return contracts.Accounts;
        }),
      getBlockchainParameters: () =>
        getContracts().then((contracts) => {
          return contracts.BlockchainParameters;
        }),
      getGoldToken: () =>
        getContracts().then((contracts) => {
          return contracts.GoldToken;
        }),
      getLockedGold: () =>
        getContracts().then((contracts) => {
          return contracts.LockedGold;
        }),
      getElection: () =>
        getContracts().then((contracts) => {
          return contracts.Election;
        }),
      getEpochRewards: () =>
        getContracts().then((contracts) => {
          return contracts.EpochRewards;
        }),
      getValidators: () =>
        getContracts().then((contracts) => {
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
