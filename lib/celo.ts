import { BigNumber } from "bignumber.js";
// TODO: remove @celo/base dependency
import { concurrentMap } from "@celo/base/lib/async";
import {
  eqAddress,
  findAddressIndex,
  NULL_ADDRESS,
} from "@celo/base/lib/address";
import { EpochReward } from "./types";
import { Contracts } from "../hooks/useCelo";
import { Address } from "wagmi";
import { fetchBlockNumber } from "@wagmi/core";

export const getEpochSize = async (contracts: Contracts) => {
  const blockchainParamsWrapper = await contracts.getBlockchainParameters();
  const epochSize = await blockchainParamsWrapper.read.getEpochSize(); // .getEpochSizeNumber();
  // TODO: use bigint
  return Number(epochSize);
};

export const getCELOBalance = async (contracts: Contracts, address: string) => {
  const goldToken = await contracts.getGoldToken();
  const goldTokenBalance = await goldToken.read.balanceOf([address as Address]);
  // TODO: check if we could return bigint directly
  return new BigNumber(goldTokenBalance.toString());
};

export const getNonVotingLockedGold = async (
  contracts: Contracts,
  address: string
) => {
  const lockedGold = await contracts.getLockedGold();
  const nonVotingLockedGold =
    await lockedGold.read.getAccountNonvotingLockedGold([address as Address]);

  return new BigNumber(nonVotingLockedGold.toString());
};

export const getVotingCelo = async (contracts: Contracts, address: string) => {
  const lockedGold = await contracts.getLockedGold();
  const totalLockedGold = await lockedGold.read.getAccountTotalLockedGold([
    address as Address,
  ]);
  const nonVotingLockedGold =
    await lockedGold.read.getAccountNonvotingLockedGold([address as Address]);

  return new BigNumber(
    (totalLockedGold - nonVotingLockedGold).toString()
  ).abs();
};

export interface PendingWithdrawal {
  time: BigNumber;
  value: BigNumber;
}

type FetchPendingWithdrawalsResult = {
  totalCeloUnlocking: BigNumber;
  totalCeloWithdrawable: BigNumber;
  pendingWithdrawals: PendingWithdrawal[];
};

function zip<A, B>(as: readonly A[], bs: readonly B[]) {
  const len = Math.min(as.length, bs.length);
  const res: [A, B][] = [];

  for (let i = 0; i < len; i++) {
    res.push([as[i], bs[i]]);
  }
  return res;
}

export async function fetchPendingWithdrawals(
  contracts: Contracts,
  address: string
): Promise<FetchPendingWithdrawalsResult> {
  const lockedGold = await contracts.getLockedGold();
  const pendingWithdrawalsRaw = await lockedGold.read.getPendingWithdrawals([
    address as Address,
  ]);

  const pendingWithdrawals = zip(
    pendingWithdrawalsRaw[1],
    pendingWithdrawalsRaw[0]
  ).map(
    ([time, value]): PendingWithdrawal => ({
      time: new BigNumber(time.toString()),
      value: new BigNumber(value.toString()),
    })
  );

  let totalCeloUnlocking = new BigNumber(0);
  let totalCeloWithdrawable = new BigNumber(0);

  const currentTime = Math.round(new Date().getTime() / 1000);
  for (let i = 0; i < pendingWithdrawals.length; i++) {
    const currentWithdrawal = pendingWithdrawals[i];

    if (currentWithdrawal.time.isLessThan(currentTime)) {
      totalCeloWithdrawable = totalCeloWithdrawable.plus(
        currentWithdrawal.value
      );
    } else {
      totalCeloUnlocking = totalCeloUnlocking.plus(currentWithdrawal.value);
    }
  }

  return { totalCeloUnlocking, totalCeloWithdrawable, pendingWithdrawals };
}

interface GroupVote {
  group: Address;
  pending: BigNumber;
  active: BigNumber;
}

async function getVotesForGroupByAccount(
  election: Awaited<ReturnType<Contracts["getElection"]>>,
  account: Address,
  group: Address,
  blockNumber?: number
): Promise<GroupVote> {
  const options =
    blockNumber !== undefined
      ? { blockNumber: BigInt(blockNumber) }
      : undefined;
  const pending = await election.read.getPendingVotesForGroupByAccount(
    [group, account],
    options
  );

  const active = await election.read.getActiveVotesForGroupByAccount(
    [group, account],
    options
  );

  return {
    group,
    pending: new BigNumber(pending.toString()),
    active: new BigNumber(active.toString()),
  };
}

export const getVotingSummary = async (
  contracts: Contracts,
  address: string
): Promise<GroupVote[]> => {
  let groupVotes: GroupVote[] = [];
  const election = await contracts.getElection();
  const groupsVotedByAccount = await election.read.getGroupsVotedForByAccount([
    address as Address,
  ]);

  for (let vg of groupsVotedByAccount) {
    const groupVote: GroupVote = await getVotesForGroupByAccount(
      election,
      address as Address,
      vg
    );
    groupVotes.push(groupVote);
  }

  return groupVotes;
};

export interface ValidatorGroup {
  name: string;
  address: Address;
  members: Address[];
  membersUpdated: number;
  affiliates: Address[];
  commission: BigNumber;
  nextCommission: BigNumber;
  nextCommissionBlock: BigNumber;
  lastSlashed: BigNumber;
  slashingMultiplier: BigNumber;
}

export interface Validator {
  name: string;
  address: Address;
  ecdsaPublicKey: string;
  blsPublicKey: string;
  affiliation: string | null;
  score: BigNumber;
  signer: Address;
}

/** Get list of registered validator addresses */
async function getRegisteredValidatorsAddresses(
  validators: Awaited<ReturnType<Contracts["getValidators"]>>,
  blockNumber?: number
): Promise<readonly Address[]> {
  const options =
    blockNumber !== undefined
      ? { blockNumber: BigInt(blockNumber) }
      : undefined;
  return validators.read.getRegisteredValidators(options);
}

/** Get list of registered validator group addresses */
// TODO: check this works, it was originally using `proxyCall`
async function getRegisteredValidatorGroupsAddresses(
  contracts: Contracts
): Promise<readonly Address[]> {
  const validators = await contracts.getValidators();
  const validatorGroups = await validators.read.getRegisteredValidatorGroups();
  return validatorGroups;
}

/*
readonly outputs: readonly [{
        readonly name: "ecdsaPublicKey";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }, {
        readonly name: "blsPublicKey";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }, {
        readonly name: "affiliation";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "score";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "signer";
        readonly internalType: "address";
        readonly type: "address";
    }];
*/

async function getValidator(
  contracts: Contracts,
  address: Address,
  blockNumber?: number
): Promise<Validator> {
  const options =
    blockNumber !== undefined
      ? { blockNumber: BigInt(blockNumber) }
      : undefined;

  const validators = await contracts.getValidators();
  const res = await validators.read.getValidator([address], options);
  const accounts = await contracts.getAccounts();
  const name = (await accounts.read.getName([address], options)) || "";

  return {
    name,
    address,
    ecdsaPublicKey: res[0],
    blsPublicKey: res[1],
    affiliation: res[2],
    score: new BigNumber(res[3].toString()),
    signer: res[4],
  };
}

/** Get list of registered validators */
async function getRegisteredValidators(
  contracts: Contracts,
  blockNumber?: number
): Promise<Validator[]> {
  const validators = await contracts.getValidators();
  const vgAddresses = await getRegisteredValidatorsAddresses(
    validators,
    blockNumber
  );
  // Spread to fix readonly TS requirement
  // TODO: update concurrentMap to handle readonly
  return concurrentMap(10, [...vgAddresses], (addr) =>
    getValidator(contracts, addr, blockNumber)
  );
}

/** Get list of registered validator groups */
export async function getRegisteredValidatorGroups(
  contracts: Contracts
): Promise<ValidatorGroup[]> {
  const vgAddresses = await getRegisteredValidatorGroupsAddresses(contracts);
  return concurrentMap(10, [...vgAddresses], (addr) =>
    getValidatorGroup(contracts, addr, false)
  );
}

const bigIntMax = (...args: bigint[]) => args.reduce((m, e) => (e > m ? e : m));

async function getValidatorGroup(
  contracts: Contracts,
  address: Address,
  getAffiliates: boolean = true,
  blockNumber?: number
): Promise<ValidatorGroup> {
  const options =
    blockNumber !== undefined
      ? { blockNumber: BigInt(blockNumber) }
      : undefined;

  const validators = await contracts.getValidators();
  const res = await validators.read.getValidatorGroup([address], options);
  const accounts = await contracts.getAccounts();
  const name = (await accounts.read.getName([address], options)) || "";
  let affiliates: Validator[] = [];
  if (getAffiliates) {
    const validators = await getRegisteredValidators(contracts, blockNumber);
    affiliates = validators
      .filter((v) => v.affiliation && eqAddress(v.affiliation, address))
      .filter((v) => !res[0].includes(v.address));
  }
  return {
    name,
    address,
    members: Array.from(res[0]),
    commission: new BigNumber(res[1].toString()),
    nextCommission: new BigNumber(res[2].toString()),
    nextCommissionBlock: new BigNumber(res[3].toString()),
    membersUpdated: Number(res[4].reduce((a, b) => bigIntMax(a, b), BigInt(0))),
    affiliates: affiliates.map((v) => v.address),
    slashingMultiplier: new BigNumber(res[5].toString()),
    lastSlashed: new BigNumber(res[6].toString()),
  };
}

export const getVgName = async (
  contracts: Contracts,
  groupAddress: string
): Promise<string> => {
  const group: ValidatorGroup = await getValidatorGroup(
    contracts,
    groupAddress as Address,
    false
  );
  return group.name;
};

export const hasActivatablePendingVotes = async (
  contracts: Contracts,
  address: string
): Promise<boolean> => {
  const elections = await contracts.getElection();
  const groups = await elections.read.getGroupsVotedForByAccount([
    address as Address,
  ]);
  const isActivatable = await Promise.all(
    groups.map((g) =>
      elections.read.hasActivatablePendingVotes([address as Address, g])
    )
  );
  return isActivatable.some((a: boolean) => a);
};

// async function _activate() // = proxySend(this.connection, this.contract.methods.activate)

/**
 * Activates any activatable pending votes.
 * @param account The account with pending votes to activate.
 */
export async function activate(contracts: Contracts, account: Address) {
  //: Promise<Array<CeloTransactionObject<boolean>>> {
  const elections = await contracts.getElection();
  const groups = await elections.read.getGroupsVotedForByAccount([
    account as Address,
  ]);
  const isActivatable = await Promise.all(
    groups.map((g) =>
      elections.read.hasActivatablePendingVotes([account as Address, g])
    )
  );
  const groupsActivatable = groups.filter((_, i) => isActivatable[i]);
  return Promise.all(
    groupsActivatable.map((g) => elections.write.activate([g]))
  );
}

export interface ValidatorGroupVote {
  address: Address;
  name: string;
  votes: BigNumber;
  capacity: BigNumber;
  eligible: boolean;
}

/**
 * Returns the current eligible validator groups and their total votes.
 */
async function getEligibleValidatorGroupsVotes(
  contracts: Contracts
): Promise<ValidatorGroupVote[]> {
  const election = await contracts.getElection();
  const res = await election.read.getTotalVotesForEligibleValidatorGroups();

  return zip(res[0], res[1]).map(([a, b]) => ({
    address: a,
    name: "",
    votes: new BigNumber(b.toString()),
    capacity: new BigNumber(0),
    eligible: true,
  }));
}

async function findLesserAndGreaterAfterVote(
  contracts: Contracts,
  votedGroup: Address,
  voteWeight: BigNumber
): Promise<{ lesser: Address; greater: Address }> {
  const currentVotes = await getEligibleValidatorGroupsVotes(contracts);
  const selectedGroup = currentVotes.find((votes) =>
    eqAddress(votes.address, votedGroup)
  );
  const voteTotal = selectedGroup
    ? selectedGroup.votes.plus(voteWeight)
    : voteWeight;
  let greaterKey = NULL_ADDRESS as Address;
  let lesserKey = NULL_ADDRESS as Address;

  // This leverages the fact that the currentVotes are already sorted from
  // greatest to lowest value
  for (const vote of currentVotes) {
    if (!eqAddress(vote.address, votedGroup)) {
      if (vote.votes.isLessThanOrEqualTo(voteTotal)) {
        lesserKey = vote.address;
        break;
      }
      greaterKey = vote.address;
    }
  }

  return { lesser: lesserKey, greater: greaterKey };
}

/**
 * Increments the number of total and pending votes for `group`.
 * @param validatorGroup The validator group to vote for.
 * @param value The amount of gold to use to vote.
 */
export async function vote(
  contracts: Contracts,
  validatorGroup: Address,
  value: BigNumber
) {
  //: Promise<CeloTransactionObject<boolean>> {
  const { lesser, greater } = await findLesserAndGreaterAfterVote(
    contracts,
    validatorGroup,
    value
  );

  const election = await contracts.getElection();
  return election.write.vote([
    validatorGroup,
    BigInt(value.toFixed()),
    lesser,
    greater,
  ]);
}

async function revokePending(
  contracts: Contracts,
  account: Address,
  group: Address,
  value: BigNumber
) {
  //: Promise<CeloTransactionObject<boolean>> {
  const election = await contracts.getElection();
  const groups = await election.read.getGroupsVotedForByAccount([account]);
  // Spread to fix TS error
  // TODO fix findAddressIndex
  const index = findAddressIndex(group, [...groups]);
  const { lesser, greater } = await findLesserAndGreaterAfterVote(
    contracts,
    group,
    value.times(-1)
  );

  return election.write.revokePending([
    group,
    BigInt(value.toFixed()),
    lesser,
    greater,
    BigInt(index),
  ]);
}

/**
 * Creates a transaction object for revoking active votes.
 * @param account Account to revoke votes for.
 * @param group Validator group to revoke votes from.
 * @param value Amount to be removed from active votes.
 * @param lesserAfterVote First group address with less vote than `account`.
 * @param greaterAfterVote First group address with more vote than `account`.
 * @dev Must pass both `lesserAfterVote` and `greaterAfterVote` or neither.
 */
async function revokeActive(
  contracts: Contracts,
  account: Address,
  group: Address,
  value: BigNumber,
  lesserAfterVote?: Address,
  greaterAfterVote?: Address
) {
  //: Promise<CeloTransactionObject<boolean>> {
  const election = await contracts.getElection();

  let lesser: Address, greater: Address;

  const groups = await election.read.getGroupsVotedForByAccount([account]);
  // Spread to fix TS error
  // TODO fix findAddressIndex
  const index = findAddressIndex(group, [...groups]);
  if (lesserAfterVote !== undefined && greaterAfterVote !== undefined) {
    lesser = lesserAfterVote;
    greater = greaterAfterVote;
  } else {
    const res = await findLesserAndGreaterAfterVote(
      contracts,
      group,
      value.times(-1)
    );
    lesser = res.lesser;
    greater = res.greater;
  }

  return election.write.revokeActive([
    group,
    BigInt(value.toFixed()),
    lesser,
    greater,
    BigInt(index),
  ]);
}

export async function revoke(
  contracts: Contracts,
  account: Address,
  group: Address,
  value: BigNumber
) {
  //: Promise<Array<CeloTransactionObject<boolean>>> {
  const election = await contracts.getElection();
  const vote = await getVotesForGroupByAccount(election, account, group);
  if (value.gt(vote.pending.plus(vote.active))) {
    throw new Error(
      `can't revoke more votes for ${group} than have been made by ${account}`
    );
  }
  const txos = [];
  const pendingValue = BigNumber.minimum(vote.pending, value);
  if (!pendingValue.isZero()) {
    txos.push(await revokePending(contracts, account, group, pendingValue));
  }
  if (pendingValue.lt(value)) {
    const activeValue = value.minus(pendingValue);
    const { lesser, greater } = await findLesserAndGreaterAfterVote(
      contracts,
      group,
      value.times(-1)
    );
    txos.push(
      await revokeActive(
        contracts,
        account,
        group,
        activeValue,
        lesser,
        greater
      )
    );
  }
  return txos;
}

export const fetchEpochRewards = async (
  contracts: Contracts,
  address: string
): Promise<EpochReward[]> => {
  const validators = await contracts.getValidators();
  // TODO: use bigint
  const epochSize = Number(await validators.read.getEpochSize());
  // TODO: does this work? and use bigint
  const blockN = Number(await fetchBlockNumber());
  const epochNow = getEpochFromBlock(blockN, epochSize);

  const unitsPerEpoch = await fetchUnitsPerEpoch(
    contracts,
    [address],
    epochNow
  );
  const groupSet = new Set<string>();
  unitsPerEpoch.forEach((v) => v.forEach((units, k) => groupSet.add(k)));
  const groups = Array.from(groupSet.values());
  if (groups.length == 0) return []; // no rewards

  const unitsByGroup = await fetchGroupUnitsPerEpoch(
    contracts,
    groups,
    epochNow
  );

  const rewardsByGroup = await fetchGroupRewardsPerEpoch(contracts, groups);

  const byEpoch = new Map();
  unitsPerEpoch.forEach((unitsPerG, epoch) => {
    let asGold = byEpoch.get(epoch) || new BigNumber(0);
    unitsPerG.forEach((units, group) => {
      const unitsTotal = unitsByGroup.get(group)?.get(epoch);
      const rewardTotal = rewardsByGroup.get(group)?.get(epoch);
      if (rewardTotal) {
        const delta = rewardTotal
          .multipliedBy(units)
          .dividedToIntegerBy(unitsTotal);
        asGold = asGold.plus(delta);
      }
    });
    if (asGold.gt(0)) {
      byEpoch.set(epoch, asGold);
    }
  });

  return Array.from(byEpoch.entries()).map(([epoch, v]) => ({
    epoch: epoch,
    reward: v,
  }));
};

export function getEpochFromBlock(block: number, epochSize: number) {
  if (block == 0) return 0;

  let epochNumber = Math.floor(block / epochSize);
  if (block % epochSize == 0) {
    return epochNumber;
  } else {
    return epochNumber + 1;
  }
}

async function fetchUnitsPerEpoch(
  contracts: Contracts,
  addresses: string[],
  epochNow: number
) {
  const validators = await contracts.getValidators();
  // TODO: use bigint
  const epochSize = Number(await validators.read.getEpochSize());
  const electionDirect = await contracts.getElection();

  // const activateEvents = await electionDirect.getPastEvents(
  //   "ValidatorGroupVoteActivated",
  //   { fromBlock: 0, filter: { account: addresses } }
  // );
  // const revokeEvents = await electionDirect.getPastEvents(
  //   "ValidatorGroupActiveVoteRevoked",
  //   { fromBlock: 0, filter: { account: addresses } }
  // );

  // TODO: fix this
  // @ts-ignore
  const activateEvents = [];
  // TODO: fix this
  // @ts-ignore
  const revokeEvents = [];

  const unitsPerEpoch = new Map<number, Map<string, BigNumber>>();
  // TODO: fix this
  // @ts-ignore
  for (const event of activateEvents) {
    const group = event.returnValues.group;
    const epochFirst = getEpochFromBlock(event.blockNumber, epochSize);
    const units = new BigNumber(event.returnValues.units);

    for (let epoch = epochFirst; epoch < epochNow; epoch += 1) {
      let unitsPerG = unitsPerEpoch.get(epoch);
      if (!unitsPerG) {
        unitsPerG = new Map<string, BigNumber>();
        unitsPerEpoch.set(epoch, unitsPerG);
      }
      unitsPerG.set(group, units.plus(unitsPerG.get(group) || 0));
    }
  }

  // TODO: fix this
  // @ts-ignore
  for (const event of revokeEvents) {
    const group = event.returnValues.group;
    const epochFirst = getEpochFromBlock(event.blockNumber, epochSize);
    const units = new BigNumber(event.returnValues.units);
    for (let epoch = epochFirst; epoch < epochNow; epoch += 1) {
      let unitsPerG = unitsPerEpoch.get(epoch);
      if (!unitsPerG) {
        unitsPerG = new Map<string, BigNumber>();
        unitsPerEpoch.set(epoch, unitsPerG);
      }
      const unitsNew = unitsPerG.get(group)?.minus(units);
      if (!unitsNew) {
        continue;
      }
      if (unitsNew.lt(0)) {
        throw new Error(`units must never be negative: ${group} ${epoch}`);
      } else if (unitsNew.eq(0)) {
        unitsPerG.delete(group);
        if (unitsPerG.size === 0) {
          unitsPerEpoch.delete(epoch);
        }
      } else {
        unitsPerG.set(group, unitsNew);
      }
    }
  }
  return unitsPerEpoch;
}

async function fetchGroupUnitsPerEpoch(
  contracts: Contracts,
  groups: string[],
  epochNow: number
) {
  const validators = await contracts.getValidators();
  // TODO: use bigint
  const epochSize = Number(await validators.read.getEpochSize());
  const electionDirect = await contracts.getElection();

  // const activateEvents = await electionDirect.getPastEvents(
  //   "ValidatorGroupVoteActivated",
  //   { fromBlock: 0, filter: { group: groups } }
  // );
  // const revokeEvents = await electionDirect.getPastEvents(
  //   "ValidatorGroupActiveVoteRevoked",
  //   { fromBlock: 0, filter: { group: groups } }
  // );

  // TODO: fix this
  // @ts-ignore
  const activateEvents = [];
  // TODO: fix this
  // @ts-ignore
  const revokeEvents = [];

  const unitsByGroup = new Map<string, Map<number, BigNumber>>();

  // TODO: fix this
  // @ts-ignore
  for (const event of activateEvents) {
    const group = event.returnValues.group;
    const epochFirst = getEpochFromBlock(event.blockNumber, epochSize);
    const units = new BigNumber(event.returnValues.units);

    let unitsPerEpoch = unitsByGroup.get(group);
    if (!unitsPerEpoch) {
      unitsPerEpoch = new Map<number, BigNumber>();
      unitsByGroup.set(group, unitsPerEpoch);
    }
    for (let epoch = epochFirst; epoch < epochNow; epoch += 1) {
      unitsPerEpoch.set(epoch, units.plus(unitsPerEpoch.get(epoch) || 0));
    }
  }

  // TODO: fix this
  // @ts-ignore
  for (const event of revokeEvents) {
    const group = event.returnValues.group;
    const epochFirst = getEpochFromBlock(event.blockNumber, epochSize);
    const units = new BigNumber(event.returnValues.units);

    const unitsPerEpoch = unitsByGroup.get(group);
    if (!unitsPerEpoch) {
      continue;
    }
    for (let epoch = epochFirst; epoch < epochNow; epoch += 1) {
      const unitsNew = unitsPerEpoch.get(epoch)?.minus(units);
      if (!unitsNew) {
        continue;
      }
      if (unitsNew.lt(0)) {
        throw new Error(`units must never be negative: ${group} ${epoch}`);
      } else if (unitsNew.eq(0)) {
        unitsPerEpoch.delete(epoch);
        if (unitsPerEpoch.size === 0) {
          unitsByGroup.delete(group);
        }
      } else {
        unitsPerEpoch.set(epoch, unitsNew);
      }
    }
  }
  return unitsByGroup;
}

async function fetchGroupRewardsPerEpoch(
  contracts: Contracts,
  groups: string[]
) {
  const validators = await contracts.getValidators();
  const epochSize = Number(await validators.read.getEpochSize());
  const electionDirect = await contracts.getElection();

  // const events = await electionDirect.getPastEvents(
  //   "EpochRewardsDistributedToVoters",
  //   { fromBlock: 0, filter: { group: groups } }
  // );

  // TODO: fix this
  // @ts-ignore
  const events = [];

  const r = new Map();

  // TODO: fix this
  // @ts-ignore
  for (const event of events) {
    const group = event.returnValues.group;
    const epoch = getEpochFromBlock(event.blockNumber, epochSize);
    const value = new BigNumber(event.returnValues.value);
    let perEpoch = r.get(group);
    if (!perEpoch) {
      perEpoch = new Map();
      r.set(group, perEpoch);
    }
    perEpoch.set(epoch, value.plus(perEpoch.get(epoch) || 0));
  }
  return r;
}

export async function getTargetVotingYield(contracts: Contracts) {
  const epochReward = await contracts.getEpochRewards();

  const [rewardMultiplierResp, targetVotingYieldResp] = await Promise.all([
    // fetches the current reward multiplier from the contract.
    epochReward.read.getRewardsMultiplier(),
    // fetches the current target voting yield parameters  from the contract.
    epochReward.read.getTargetVotingYieldParameters(),
  ]);

  // targetVotingYield -> 160000000000000000000 (0.00016 * 10^24)
  // target inflation over an year -> (0.00016 + 1) ** 365 = 1.06
  // 1.06 represents 6% increase year-over-year.
  const targetVotingYield = new BigNumber(targetVotingYieldResp[0].toString())
    .div(10 ** 24)
    .plus(1)
    .exponentiatedBy(365)
    .minus(1);

  // rewardMultiplier changes based on the target inflation rate for the network.
  // for more info -> https://docs.celo.org/celo-codebase/protocol/proof-of-stake/epoch-rewards#adjusting-rewards-for-target-schedule
  const rewardMultiplier = new BigNumber(rewardMultiplierResp.toString()).div(
    10 ** 24
  );

  // target yield -> targetVotingYield * rewardMultiplier
  return targetVotingYield.times(rewardMultiplier).times(100);
}
