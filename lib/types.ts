import { BigNumber } from "bignumber.js";

export type VGSuggestion = {
  address: string;
  name?: string | null;
  group_score: number;
  transparency_score: number;
  performance_score: number;
  estimated_apy: number;
};

export type GroupVoting = {
  name: string;
  vg: string;
  active: BigNumber;
  pending: BigNumber;
};

export type ProcessedWithdrawals = {
  value: BigNumber;
  time: Date;
  status: WithdrawalStatus;
};

export enum WithdrawalStatus {
  PENDING = "Pending",
  AVAILABLE = "Available",
}

export interface ValidatorGroup {
  id: string;
  address: string;
  name?: string | null;
  email?: string | null;
  website_url?: string | null;
  discord_tag?: string | null;
  twitter_username?: string | null;
  geographic_location?: string | null;
  verified_dns: boolean;
  transparency_score: number;
  performance_score: number;
  attestation_score: number;
  estimated_apy: number;
  recieved_votes: number;
  available_votes: number;
  epochs_served: number;
  locked_celo: number;
  slashing_penalty_score: number;
  group_score: number;
  group_share: number;
  validators: Validator[];
}

export interface Validator {
  address: string;
  name?: string | null;
  currently_elected: boolean;
}

export type VGEditFormType = {
  email: string;
  geoURL: string;
  twitter: string;
  discord: string;
};

export type Question = {
  question: string;
  answer: string;
};

export type EpochReward = {
  epoch: number;
  reward: BigNumber;
};
