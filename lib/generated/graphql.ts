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
  bigint: number;
  float8: number;
  timestamptz: string;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["Boolean"]>;
  _gt?: InputMaybe<Scalars["Boolean"]>;
  _gte?: InputMaybe<Scalars["Boolean"]>;
  _in?: InputMaybe<Array<Scalars["Boolean"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["Boolean"]>;
  _lte?: InputMaybe<Scalars["Boolean"]>;
  _neq?: InputMaybe<Scalars["Boolean"]>;
  _nin?: InputMaybe<Array<Scalars["Boolean"]>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["String"]>;
  _gt?: InputMaybe<Scalars["String"]>;
  _gte?: InputMaybe<Scalars["String"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]>;
  _in?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]>;
  _lt?: InputMaybe<Scalars["String"]>;
  _lte?: InputMaybe<Scalars["String"]>;
  _neq?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]>;
  _nin?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["bigint"]>;
  _gt?: InputMaybe<Scalars["bigint"]>;
  _gte?: InputMaybe<Scalars["bigint"]>;
  _in?: InputMaybe<Array<Scalars["bigint"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["bigint"]>;
  _lte?: InputMaybe<Scalars["bigint"]>;
  _neq?: InputMaybe<Scalars["bigint"]>;
  _nin?: InputMaybe<Array<Scalars["bigint"]>>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["float8"]>;
  _gt?: InputMaybe<Scalars["float8"]>;
  _gte?: InputMaybe<Scalars["float8"]>;
  _in?: InputMaybe<Array<Scalars["float8"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["float8"]>;
  _lte?: InputMaybe<Scalars["float8"]>;
  _neq?: InputMaybe<Scalars["float8"]>;
  _nin?: InputMaybe<Array<Scalars["float8"]>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = "asc",
  /** in ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in descending order, nulls first */
  Desc = "desc",
  /** in descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

export type Query_Root = {
  __typename?: "query_root";
  /** fetch data from the table: "validator_groups" */
  validator_groups: Array<Validator_Groups>;
  /** fetch data from the table: "validator_groups" using primary key columns */
  validator_groups_by_pk?: Maybe<Validator_Groups>;
  /** An array relationship */
  validators: Array<Validators>;
  /** fetch data from the table: "validators" using primary key columns */
  validators_by_pk?: Maybe<Validators>;
};

export type Query_RootValidator_GroupsArgs = {
  distinct_on?: InputMaybe<Array<Validator_Groups_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Validator_Groups_Order_By>>;
  where?: InputMaybe<Validator_Groups_Bool_Exp>;
};

export type Query_RootValidator_Groups_By_PkArgs = {
  id: Scalars["String"];
};

export type Query_RootValidatorsArgs = {
  distinct_on?: InputMaybe<Array<Validators_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Validators_Order_By>>;
  where?: InputMaybe<Validators_Bool_Exp>;
};

export type Query_RootValidators_By_PkArgs = {
  id: Scalars["String"];
};

export type Subscription_Root = {
  __typename?: "subscription_root";
  /** fetch data from the table: "validator_groups" */
  validator_groups: Array<Validator_Groups>;
  /** fetch data from the table: "validator_groups" using primary key columns */
  validator_groups_by_pk?: Maybe<Validator_Groups>;
  /** An array relationship */
  validators: Array<Validators>;
  /** fetch data from the table: "validators" using primary key columns */
  validators_by_pk?: Maybe<Validators>;
};

export type Subscription_RootValidator_GroupsArgs = {
  distinct_on?: InputMaybe<Array<Validator_Groups_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Validator_Groups_Order_By>>;
  where?: InputMaybe<Validator_Groups_Bool_Exp>;
};

export type Subscription_RootValidator_Groups_By_PkArgs = {
  id: Scalars["String"];
};

export type Subscription_RootValidatorsArgs = {
  distinct_on?: InputMaybe<Array<Validators_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Validators_Order_By>>;
  where?: InputMaybe<Validators_Bool_Exp>;
};

export type Subscription_RootValidators_By_PkArgs = {
  id: Scalars["String"];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["timestamptz"]>;
  _gt?: InputMaybe<Scalars["timestamptz"]>;
  _gte?: InputMaybe<Scalars["timestamptz"]>;
  _in?: InputMaybe<Array<Scalars["timestamptz"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["timestamptz"]>;
  _lte?: InputMaybe<Scalars["timestamptz"]>;
  _neq?: InputMaybe<Scalars["timestamptz"]>;
  _nin?: InputMaybe<Array<Scalars["timestamptz"]>>;
};

/** columns and relationships of "validator_groups" */
export type Validator_Groups = {
  __typename?: "validator_groups";
  address: Scalars["String"];
  attestation_score: Scalars["float8"];
  available_votes: Scalars["bigint"];
  created_at: Scalars["timestamptz"];
  currently_elected: Scalars["Boolean"];
  discord_tag?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  epoch_registered_at: Scalars["bigint"];
  epochs_served: Scalars["bigint"];
  estimated_apy: Scalars["float8"];
  geographic_location?: Maybe<Scalars["String"]>;
  group_score: Scalars["float8"];
  group_share: Scalars["float8"];
  id: Scalars["String"];
  locked_celo: Scalars["bigint"];
  locked_celo_percentile: Scalars["float8"];
  name?: Maybe<Scalars["String"]>;
  /** A computed field, executes function "overall_score" */
  overall_score?: Maybe<Scalars["float8"]>;
  performance_score: Scalars["float8"];
  recieved_votes: Scalars["bigint"];
  slashing_penalty_score: Scalars["float8"];
  transparency_score: Scalars["float8"];
  twitter_username?: Maybe<Scalars["String"]>;
  /** An array relationship */
  validators: Array<Validators>;
  verified_dns: Scalars["Boolean"];
  website_url?: Maybe<Scalars["String"]>;
};

/** columns and relationships of "validator_groups" */
export type Validator_GroupsValidatorsArgs = {
  distinct_on?: InputMaybe<Array<Validators_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Validators_Order_By>>;
  where?: InputMaybe<Validators_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "validator_groups". All fields are combined with a logical 'AND'. */
export type Validator_Groups_Bool_Exp = {
  _and?: InputMaybe<Array<Validator_Groups_Bool_Exp>>;
  _not?: InputMaybe<Validator_Groups_Bool_Exp>;
  _or?: InputMaybe<Array<Validator_Groups_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  attestation_score?: InputMaybe<Float8_Comparison_Exp>;
  available_votes?: InputMaybe<Bigint_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  currently_elected?: InputMaybe<Boolean_Comparison_Exp>;
  discord_tag?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  epoch_registered_at?: InputMaybe<Bigint_Comparison_Exp>;
  epochs_served?: InputMaybe<Bigint_Comparison_Exp>;
  estimated_apy?: InputMaybe<Float8_Comparison_Exp>;
  geographic_location?: InputMaybe<String_Comparison_Exp>;
  group_score?: InputMaybe<Float8_Comparison_Exp>;
  group_share?: InputMaybe<Float8_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  locked_celo?: InputMaybe<Bigint_Comparison_Exp>;
  locked_celo_percentile?: InputMaybe<Float8_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  overall_score?: InputMaybe<Float8_Comparison_Exp>;
  performance_score?: InputMaybe<Float8_Comparison_Exp>;
  recieved_votes?: InputMaybe<Bigint_Comparison_Exp>;
  slashing_penalty_score?: InputMaybe<Float8_Comparison_Exp>;
  transparency_score?: InputMaybe<Float8_Comparison_Exp>;
  twitter_username?: InputMaybe<String_Comparison_Exp>;
  validators?: InputMaybe<Validators_Bool_Exp>;
  verified_dns?: InputMaybe<Boolean_Comparison_Exp>;
  website_url?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "validator_groups". */
export type Validator_Groups_Order_By = {
  address?: InputMaybe<Order_By>;
  attestation_score?: InputMaybe<Order_By>;
  available_votes?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  currently_elected?: InputMaybe<Order_By>;
  discord_tag?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  epoch_registered_at?: InputMaybe<Order_By>;
  epochs_served?: InputMaybe<Order_By>;
  estimated_apy?: InputMaybe<Order_By>;
  geographic_location?: InputMaybe<Order_By>;
  group_score?: InputMaybe<Order_By>;
  group_share?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  locked_celo?: InputMaybe<Order_By>;
  locked_celo_percentile?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  overall_score?: InputMaybe<Order_By>;
  performance_score?: InputMaybe<Order_By>;
  recieved_votes?: InputMaybe<Order_By>;
  slashing_penalty_score?: InputMaybe<Order_By>;
  transparency_score?: InputMaybe<Order_By>;
  twitter_username?: InputMaybe<Order_By>;
  validators_aggregate?: InputMaybe<Validators_Aggregate_Order_By>;
  verified_dns?: InputMaybe<Order_By>;
  website_url?: InputMaybe<Order_By>;
};

/** select columns of table "validator_groups" */
export enum Validator_Groups_Select_Column {
  /** column name */
  Address = "address",
  /** column name */
  AttestationScore = "attestation_score",
  /** column name */
  AvailableVotes = "available_votes",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  CurrentlyElected = "currently_elected",
  /** column name */
  DiscordTag = "discord_tag",
  /** column name */
  Email = "email",
  /** column name */
  EpochRegisteredAt = "epoch_registered_at",
  /** column name */
  EpochsServed = "epochs_served",
  /** column name */
  EstimatedApy = "estimated_apy",
  /** column name */
  GeographicLocation = "geographic_location",
  /** column name */
  GroupScore = "group_score",
  /** column name */
  GroupShare = "group_share",
  /** column name */
  Id = "id",
  /** column name */
  LockedCelo = "locked_celo",
  /** column name */
  LockedCeloPercentile = "locked_celo_percentile",
  /** column name */
  Name = "name",
  /** column name */
  PerformanceScore = "performance_score",
  /** column name */
  RecievedVotes = "recieved_votes",
  /** column name */
  SlashingPenaltyScore = "slashing_penalty_score",
  /** column name */
  TransparencyScore = "transparency_score",
  /** column name */
  TwitterUsername = "twitter_username",
  /** column name */
  VerifiedDns = "verified_dns",
  /** column name */
  WebsiteUrl = "website_url",
}

/** columns and relationships of "validators" */
export type Validators = {
  __typename?: "validators";
  address: Scalars["String"];
  created_at: Scalars["timestamptz"];
  currently_elected: Scalars["Boolean"];
  id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  validator_group_id?: Maybe<Scalars["String"]>;
};

/** order by aggregate values of table "validators" */
export type Validators_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Validators_Max_Order_By>;
  min?: InputMaybe<Validators_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "validators". All fields are combined with a logical 'AND'. */
export type Validators_Bool_Exp = {
  _and?: InputMaybe<Array<Validators_Bool_Exp>>;
  _not?: InputMaybe<Validators_Bool_Exp>;
  _or?: InputMaybe<Array<Validators_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  currently_elected?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  validator_group_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "validators" */
export type Validators_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  validator_group_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "validators" */
export type Validators_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  validator_group_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "validators". */
export type Validators_Order_By = {
  address?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  currently_elected?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  validator_group_id?: InputMaybe<Order_By>;
};

/** select columns of table "validators" */
export enum Validators_Select_Column {
  /** column name */
  Address = "address",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  CurrentlyElected = "currently_elected",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  ValidatorGroupId = "validator_group_id",
}

export type ValidatorGroupQueryVariables = Exact<{
  address: Scalars["String"];
}>;

export type ValidatorGroupQuery = {
  __typename?: "query_root";
  validator_groups: Array<{
    __typename?: "validator_groups";
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
    validators: Array<{
      __typename?: "validators";
      address: string;
      name?: string | null;
      currently_elected: boolean;
    }>;
  }>;
};

export type ValidatorGroupsQueryVariables = Exact<{
  order_by?: InputMaybe<
    Array<Validator_Groups_Order_By> | Validator_Groups_Order_By
  >;
  limit?: InputMaybe<Scalars["Int"]>;
}>;

export type ValidatorGroupsQuery = {
  __typename?: "query_root";
  validator_groups: Array<{
    __typename?: "validator_groups";
    id: string;
    address: string;
    name?: string | null;
    verified_dns: boolean;
    twitter_username?: string | null;
    discord_tag?: string | null;
    geographic_location?: string | null;
    email?: string | null;
    transparency_score: number;
    performance_score: number;
    estimated_apy: number;
    recieved_votes: number;
    available_votes: number;
    group_share: number;
    group_score: number;
    epochs_served: number;
    locked_celo: number;
    slashing_penalty_score: number;
    attestation_score: number;
    validators: Array<{
      __typename?: "validators";
      address: string;
      name?: string | null;
      currently_elected: boolean;
    }>;
  }>;
};

export type ValidatorGroupsSuggestionQueryVariables = Exact<{
  order_by?: InputMaybe<
    Array<Validator_Groups_Order_By> | Validator_Groups_Order_By
  >;
  limit?: InputMaybe<Scalars["Int"]>;
}>;

export type ValidatorGroupsSuggestionQuery = {
  __typename?: "query_root";
  validator_groups: Array<{
    __typename?: "validator_groups";
    address: string;
    name?: string | null;
    group_score: number;
    transparency_score: number;
    performance_score: number;
    estimated_apy: number;
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
            name: { kind: "Name", value: "validator_groups" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "address" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "address" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "website_url" } },
                { kind: "Field", name: { kind: "Name", value: "discord_tag" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "twitter_username" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographic_location" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "verified_dns" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "transparency_score" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "performance_score" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attestation_score" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "estimated_apy" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "recieved_votes" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "available_votes" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "epochs_served" },
                },
                { kind: "Field", name: { kind: "Name", value: "locked_celo" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "slashing_penalty_score" },
                },
                { kind: "Field", name: { kind: "Name", value: "group_score" } },
                { kind: "Field", name: { kind: "Name", value: "group_share" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "validators" },
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
            name: { kind: "Name", value: "order_by" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "validator_groups_order_by" },
              },
            },
          },
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
            name: { kind: "Name", value: "validator_groups" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "order_by" },
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
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "verified_dns" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "twitter_username" },
                },
                { kind: "Field", name: { kind: "Name", value: "discord_tag" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographic_location" },
                },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "transparency_score" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "performance_score" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "estimated_apy" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "recieved_votes" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "available_votes" },
                },
                { kind: "Field", name: { kind: "Name", value: "group_share" } },
                { kind: "Field", name: { kind: "Name", value: "group_score" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "epochs_served" },
                },
                { kind: "Field", name: { kind: "Name", value: "locked_celo" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "slashing_penalty_score" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attestation_score" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "validators" },
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
            name: { kind: "Name", value: "order_by" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "validator_groups_order_by" },
              },
            },
          },
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
            name: { kind: "Name", value: "validator_groups" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "order_by" },
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
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "group_score" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "transparency_score" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "performance_score" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "estimated_apy" },
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
