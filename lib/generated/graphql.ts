import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type Epoch = {
  __typename?: "Epoch";
  CreatedAt: Scalars["Time"];
  EndBlock: Scalars["Int"];
  Number: Scalars["Int"];
  StartBlock: Scalars["Int"];
  id: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  UpdateVGSocialInfo?: Maybe<ValidatorGroup>;
};

export type MutationUpdateVgSocialInfoArgs = {
  discord_tag?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  geographic_location?: InputMaybe<Scalars["String"]>;
  twitter_username?: InputMaybe<Scalars["String"]>;
  vg_id: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  ValidatorGroup?: Maybe<ValidatorGroup>;
  ValidatorGroups: Array<ValidatorGroup>;
};

export type QueryValidatorGroupArgs = {
  address: Scalars["String"];
};

export type QueryValidatorGroupsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  sort_by_score?: InputMaybe<Scalars["Boolean"]>;
};

export type Validator = {
  __typename?: "Validator";
  address: Scalars["String"];
  created_at: Scalars["Time"];
  currently_elected: Scalars["Boolean"];
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type ValidatorGroup = {
  __typename?: "ValidatorGroup";
  Address: Scalars["String"];
  AttestationScore: Scalars["Float"];
  AvailableVotes: Scalars["Int"];
  CurrentlyElected: Scalars["Boolean"];
  DiscordTag?: Maybe<Scalars["String"]>;
  Email?: Maybe<Scalars["String"]>;
  EpochRegisteredAt: Scalars["Int"];
  EpochsServed: Scalars["Int"];
  EstimatedAPY: Scalars["Float"];
  GeographicLocation: Scalars["String"];
  GroupScore: Scalars["Float"];
  GroupShare: Scalars["Float"];
  ID: Scalars["ID"];
  LockedCelo: Scalars["Int"];
  LockedCeloPercentile: Scalars["Float"];
  Name?: Maybe<Scalars["String"]>;
  PerformanceScore: Scalars["Float"];
  RecievedVotes: Scalars["Int"];
  SlashingPenaltyScore: Scalars["Float"];
  TransparencyScore: Scalars["Float"];
  TwitterUsername?: Maybe<Scalars["String"]>;
  Validators: Array<Validator>;
  VerifiedDns: Scalars["Boolean"];
  WebsiteUrl?: Maybe<Scalars["String"]>;
};

export type ValidatorGroupQueryVariables = Exact<{
  address: Scalars["String"];
}>;

export type ValidatorGroupQuery = {
  __typename?: "Query";
  ValidatorGroup?: {
    __typename?: "ValidatorGroup";
    ID: string;
    Address: string;
    Name?: string | null;
    Email?: string | null;
    WebsiteUrl?: string | null;
    DiscordTag?: string | null;
    TwitterUsername?: string | null;
    GeographicLocation: string;
    VerifiedDns: boolean;
    TransparencyScore: number;
    PerformanceScore: number;
    AttestationScore: number;
    EstimatedAPY: number;
    RecievedVotes: number;
    AvailableVotes: number;
    EpochsServed: number;
    LockedCelo: number;
    SlashingPenaltyScore: number;
    GroupScore: number;
    GroupShare: number;
    Validators: Array<{
      __typename?: "Validator";
      address: string;
      name?: string | null;
      currently_elected: boolean;
    }>;
  } | null;
};

export type UpdateValidatorGroupSocialInfoMutationVariables = Exact<{
  id: Scalars["ID"];
  email?: InputMaybe<Scalars["String"]>;
  twitter?: InputMaybe<Scalars["String"]>;
  discord?: InputMaybe<Scalars["String"]>;
  geoURL?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateValidatorGroupSocialInfoMutation = {
  __typename?: "Mutation";
  UpdateVGSocialInfo?: {
    __typename?: "ValidatorGroup";
    ID: string;
    Email?: string | null;
    TwitterUsername?: string | null;
    DiscordTag?: string | null;
    GeographicLocation: string;
  } | null;
};

export type ValidatorGroupsQueryVariables = Exact<{
  sort_by_score?: InputMaybe<Scalars["Boolean"]>;
  limit?: InputMaybe<Scalars["Int"]>;
}>;

export type ValidatorGroupsQuery = {
  __typename?: "Query";
  ValidatorGroups: Array<{
    __typename?: "ValidatorGroup";
    ID: string;
    Address: string;
    Name?: string | null;
    VerifiedDns: boolean;
    TwitterUsername?: string | null;
    DiscordTag?: string | null;
    GeographicLocation: string;
    Email?: string | null;
    TransparencyScore: number;
    PerformanceScore: number;
    EstimatedAPY: number;
    RecievedVotes: number;
    AvailableVotes: number;
    GroupShare: number;
    GroupScore: number;
    EpochsServed: number;
    LockedCelo: number;
    SlashingPenaltyScore: number;
    AttestationScore: number;
    Validators: Array<{
      __typename?: "Validator";
      address: string;
      name?: string | null;
      currently_elected: boolean;
    }>;
  }>;
};

export type ValidatorGroupsSuggestionQueryVariables = Exact<{
  sort_by_score?: InputMaybe<Scalars["Boolean"]>;
  limit?: InputMaybe<Scalars["Int"]>;
}>;

export type ValidatorGroupsSuggestionQuery = {
  __typename?: "Query";
  ValidatorGroups: Array<{
    __typename?: "ValidatorGroup";
    Address: string;
    Name?: string | null;
    GroupScore: number;
    TransparencyScore: number;
    PerformanceScore: number;
    EstimatedAPY: number;
  }>;
};

export const ValidatorGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ValidatorGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "address" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ValidatorGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "address" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "address" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ID" } },
                { kind: "Field", name: { kind: "Name", value: "Address" } },
                { kind: "Field", name: { kind: "Name", value: "Name" } },
                { kind: "Field", name: { kind: "Name", value: "Email" } },
                { kind: "Field", name: { kind: "Name", value: "WebsiteUrl" } },
                { kind: "Field", name: { kind: "Name", value: "DiscordTag" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "TwitterUsername" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "GeographicLocation" },
                },
                { kind: "Field", name: { kind: "Name", value: "VerifiedDns" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "TransparencyScore" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "PerformanceScore" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "AttestationScore" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "EstimatedAPY" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "RecievedVotes" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "AvailableVotes" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "EpochsServed" },
                },
                { kind: "Field", name: { kind: "Name", value: "LockedCelo" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "SlashingPenaltyScore" },
                },
                { kind: "Field", name: { kind: "Name", value: "GroupScore" } },
                { kind: "Field", name: { kind: "Name", value: "GroupShare" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "Validators" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currently_elected" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ValidatorGroupQuery, ValidatorGroupQueryVariables>;
export const UpdateValidatorGroupSocialInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateValidatorGroupSocialInfo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "twitter" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "discord" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "geoURL" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "UpdateVGSocialInfo" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "vg_id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "twitter_username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "twitter" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "discord_tag" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "discord" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "geographic_location" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "geoURL" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ID" } },
                { kind: "Field", name: { kind: "Name", value: "Email" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "TwitterUsername" },
                },
                { kind: "Field", name: { kind: "Name", value: "DiscordTag" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "GeographicLocation" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateValidatorGroupSocialInfoMutation,
  UpdateValidatorGroupSocialInfoMutationVariables
>;
export const ValidatorGroupsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ValidatorGroups" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "sort_by_score" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ValidatorGroups" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort_by_score" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort_by_score" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ID" } },
                { kind: "Field", name: { kind: "Name", value: "Address" } },
                { kind: "Field", name: { kind: "Name", value: "Name" } },
                { kind: "Field", name: { kind: "Name", value: "VerifiedDns" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "TwitterUsername" },
                },
                { kind: "Field", name: { kind: "Name", value: "DiscordTag" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "GeographicLocation" },
                },
                { kind: "Field", name: { kind: "Name", value: "Email" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "TransparencyScore" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "PerformanceScore" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "EstimatedAPY" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "RecievedVotes" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "AvailableVotes" },
                },
                { kind: "Field", name: { kind: "Name", value: "GroupShare" } },
                { kind: "Field", name: { kind: "Name", value: "GroupScore" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "EpochsServed" },
                },
                { kind: "Field", name: { kind: "Name", value: "LockedCelo" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "SlashingPenaltyScore" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "AttestationScore" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "Validators" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currently_elected" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ValidatorGroupsQuery,
  ValidatorGroupsQueryVariables
>;
export const ValidatorGroupsSuggestionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ValidatorGroupsSuggestion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "sort_by_score" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ValidatorGroups" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort_by_score" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort_by_score" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "Address" } },
                { kind: "Field", name: { kind: "Name", value: "Name" } },
                { kind: "Field", name: { kind: "Name", value: "GroupScore" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "TransparencyScore" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "PerformanceScore" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "EstimatedAPY" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ValidatorGroupsSuggestionQuery,
  ValidatorGroupsSuggestionQueryVariables
>;
