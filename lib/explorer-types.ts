export enum Order {
  ASC,
  DESC,
}

export type SortStatus = {
  key: string;
  order: Order;
};

export const FIELDS = [
  {
    name: "Group Name",
    key: "name",
    tip: null,
  },
  {
    name: "Elected/Total Validators",
    key: "validators",
    tip: "How many validators are elected out of the total validators in the group.",
  },
  {
    name: "Received Votes",
    key: "received",
    tip: "Total votes received by the group (in CELO)",
  },
  {
    name: "Available Votes",
    key: "available",
    tip: "The amount of votes that can be made on the group (in CELO)",
  },
  {
    name: "Attestation Score",
    key: "attestation",
    tip: "Score derived from the attestation percentage of all the Validators in the group.",
  },
  {
    name: "Overall Score",
    key: "score",
    tip: "Represent overall wellness of the group.",
  },
  {
    name: "Estimated APY",
    key: "apy",
    tip: "Percentage of return you can expect on your staked CELO over an year.",
  },
];
