/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Meta = {
  __typename?: 'Meta';
  status?: Maybe<Scalars['JSON']['output']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  _meta?: Maybe<Meta>;
  asset?: Maybe<Asset>;
  assets: AssetPage;
  hourBucket?: Maybe<HourBucket>;
  hourBuckets: HourBucketPage;
  module?: Maybe<Module>;
  modules: ModulePage;
  position?: Maybe<Position>;
  positions: PositionPage;
  token?: Maybe<Token>;
  tokens: TokenPage;
  user?: Maybe<User>;
  userAsset?: Maybe<UserAsset>;
  userAssets: UserAssetPage;
  users: UserPage;
  v3Pool?: Maybe<V3Pool>;
  v3Pools: V3PoolPage;
};


export type QueryAssetArgs = {
  address: Scalars['String']['input'];
};


export type QueryAssetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryHourBucketArgs = {
  id: Scalars['String']['input'];
};


export type QueryHourBucketsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<HourBucketFilter>;
};


export type QueryModuleArgs = {
  address: Scalars['String']['input'];
};


export type QueryModulesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ModuleFilter>;
};


export type QueryPositionArgs = {
  id: Scalars['String']['input'];
};


export type QueryPositionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PositionFilter>;
};


export type QueryTokenArgs = {
  address: Scalars['String']['input'];
};


export type QueryTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<TokenFilter>;
};


export type QueryUserArgs = {
  address: Scalars['String']['input'];
};


export type QueryUserAssetArgs = {
  assetId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryUserAssetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserAssetFilter>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserFilter>;
};


export type QueryV3PoolArgs = {
  address: Scalars['String']['input'];
};


export type QueryV3PoolsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<V3PoolFilter>;
};

export type Asset = {
  __typename?: 'asset';
  address: Scalars['String']['output'];
  createdAt: Scalars['BigInt']['output'];
  governance: Scalars['String']['output'];
  integrator: Scalars['String']['output'];
  liquidityMigrator: Scalars['String']['output'];
  migratedAt?: Maybe<Scalars['BigInt']['output']>;
  migrationPool: Scalars['String']['output'];
  numTokensToSell: Scalars['BigInt']['output'];
  numeraire: Scalars['String']['output'];
  pool?: Maybe<V3Pool>;
  poolInitializer: Scalars['String']['output'];
  timelock: Scalars['String']['output'];
  userAssets?: Maybe<UserAssetPage>;
};


export type AssetUserAssetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserAssetFilter>;
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  governance?: InputMaybe<Scalars['String']['input']>;
  governance_contains?: InputMaybe<Scalars['String']['input']>;
  governance_ends_with?: InputMaybe<Scalars['String']['input']>;
  governance_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  governance_not?: InputMaybe<Scalars['String']['input']>;
  governance_not_contains?: InputMaybe<Scalars['String']['input']>;
  governance_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  governance_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  governance_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  governance_starts_with?: InputMaybe<Scalars['String']['input']>;
  integrator?: InputMaybe<Scalars['String']['input']>;
  integrator_contains?: InputMaybe<Scalars['String']['input']>;
  integrator_ends_with?: InputMaybe<Scalars['String']['input']>;
  integrator_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  integrator_not?: InputMaybe<Scalars['String']['input']>;
  integrator_not_contains?: InputMaybe<Scalars['String']['input']>;
  integrator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  integrator_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  integrator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  integrator_starts_with?: InputMaybe<Scalars['String']['input']>;
  liquidityMigrator?: InputMaybe<Scalars['String']['input']>;
  liquidityMigrator_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityMigrator_ends_with?: InputMaybe<Scalars['String']['input']>;
  liquidityMigrator_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  liquidityMigrator_not?: InputMaybe<Scalars['String']['input']>;
  liquidityMigrator_not_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityMigrator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  liquidityMigrator_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  liquidityMigrator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  liquidityMigrator_starts_with?: InputMaybe<Scalars['String']['input']>;
  migratedAt?: InputMaybe<Scalars['BigInt']['input']>;
  migratedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  migratedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  migratedAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  migratedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  migratedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  migratedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  migratedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  migrationPool?: InputMaybe<Scalars['String']['input']>;
  migrationPool_contains?: InputMaybe<Scalars['String']['input']>;
  migrationPool_ends_with?: InputMaybe<Scalars['String']['input']>;
  migrationPool_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  migrationPool_not?: InputMaybe<Scalars['String']['input']>;
  migrationPool_not_contains?: InputMaybe<Scalars['String']['input']>;
  migrationPool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  migrationPool_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  migrationPool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  migrationPool_starts_with?: InputMaybe<Scalars['String']['input']>;
  numTokensToSell?: InputMaybe<Scalars['BigInt']['input']>;
  numTokensToSell_gt?: InputMaybe<Scalars['BigInt']['input']>;
  numTokensToSell_gte?: InputMaybe<Scalars['BigInt']['input']>;
  numTokensToSell_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  numTokensToSell_lt?: InputMaybe<Scalars['BigInt']['input']>;
  numTokensToSell_lte?: InputMaybe<Scalars['BigInt']['input']>;
  numTokensToSell_not?: InputMaybe<Scalars['BigInt']['input']>;
  numTokensToSell_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  numeraire?: InputMaybe<Scalars['String']['input']>;
  numeraire_contains?: InputMaybe<Scalars['String']['input']>;
  numeraire_ends_with?: InputMaybe<Scalars['String']['input']>;
  numeraire_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  numeraire_not?: InputMaybe<Scalars['String']['input']>;
  numeraire_not_contains?: InputMaybe<Scalars['String']['input']>;
  numeraire_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  numeraire_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  numeraire_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  numeraire_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  poolInitializer?: InputMaybe<Scalars['String']['input']>;
  poolInitializer_contains?: InputMaybe<Scalars['String']['input']>;
  poolInitializer_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolInitializer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolInitializer_not?: InputMaybe<Scalars['String']['input']>;
  poolInitializer_not_contains?: InputMaybe<Scalars['String']['input']>;
  poolInitializer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolInitializer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolInitializer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  poolInitializer_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  timelock?: InputMaybe<Scalars['String']['input']>;
  timelock_contains?: InputMaybe<Scalars['String']['input']>;
  timelock_ends_with?: InputMaybe<Scalars['String']['input']>;
  timelock_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timelock_not?: InputMaybe<Scalars['String']['input']>;
  timelock_not_contains?: InputMaybe<Scalars['String']['input']>;
  timelock_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  timelock_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timelock_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  timelock_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type AssetPage = {
  __typename?: 'assetPage';
  items: Array<Asset>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HourBucket = {
  __typename?: 'hourBucket';
  average: Scalars['BigInt']['output'];
  close: Scalars['BigInt']['output'];
  count: Scalars['Int']['output'];
  high: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  low: Scalars['BigInt']['output'];
  open: Scalars['BigInt']['output'];
};

export type HourBucketFilter = {
  AND?: InputMaybe<Array<InputMaybe<HourBucketFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HourBucketFilter>>>;
  average?: InputMaybe<Scalars['BigInt']['input']>;
  average_gt?: InputMaybe<Scalars['BigInt']['input']>;
  average_gte?: InputMaybe<Scalars['BigInt']['input']>;
  average_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  average_lt?: InputMaybe<Scalars['BigInt']['input']>;
  average_lte?: InputMaybe<Scalars['BigInt']['input']>;
  average_not?: InputMaybe<Scalars['BigInt']['input']>;
  average_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  close?: InputMaybe<Scalars['BigInt']['input']>;
  close_gt?: InputMaybe<Scalars['BigInt']['input']>;
  close_gte?: InputMaybe<Scalars['BigInt']['input']>;
  close_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  close_lt?: InputMaybe<Scalars['BigInt']['input']>;
  close_lte?: InputMaybe<Scalars['BigInt']['input']>;
  close_not?: InputMaybe<Scalars['BigInt']['input']>;
  close_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_gt?: InputMaybe<Scalars['Int']['input']>;
  count_gte?: InputMaybe<Scalars['Int']['input']>;
  count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  count_lt?: InputMaybe<Scalars['Int']['input']>;
  count_lte?: InputMaybe<Scalars['Int']['input']>;
  count_not?: InputMaybe<Scalars['Int']['input']>;
  count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  high?: InputMaybe<Scalars['BigInt']['input']>;
  high_gt?: InputMaybe<Scalars['BigInt']['input']>;
  high_gte?: InputMaybe<Scalars['BigInt']['input']>;
  high_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  high_lt?: InputMaybe<Scalars['BigInt']['input']>;
  high_lte?: InputMaybe<Scalars['BigInt']['input']>;
  high_not?: InputMaybe<Scalars['BigInt']['input']>;
  high_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  low?: InputMaybe<Scalars['BigInt']['input']>;
  low_gt?: InputMaybe<Scalars['BigInt']['input']>;
  low_gte?: InputMaybe<Scalars['BigInt']['input']>;
  low_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  low_lt?: InputMaybe<Scalars['BigInt']['input']>;
  low_lte?: InputMaybe<Scalars['BigInt']['input']>;
  low_not?: InputMaybe<Scalars['BigInt']['input']>;
  low_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  open?: InputMaybe<Scalars['BigInt']['input']>;
  open_gt?: InputMaybe<Scalars['BigInt']['input']>;
  open_gte?: InputMaybe<Scalars['BigInt']['input']>;
  open_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  open_lt?: InputMaybe<Scalars['BigInt']['input']>;
  open_lte?: InputMaybe<Scalars['BigInt']['input']>;
  open_not?: InputMaybe<Scalars['BigInt']['input']>;
  open_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type HourBucketPage = {
  __typename?: 'hourBucketPage';
  items: Array<HourBucket>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Module = {
  __typename?: 'module';
  address: Scalars['String']['output'];
  lastUpdated: Scalars['BigInt']['output'];
  state: Scalars['Int']['output'];
};

export type ModuleFilter = {
  AND?: InputMaybe<Array<InputMaybe<ModuleFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ModuleFilter>>>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  lastUpdated?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastUpdated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  state?: InputMaybe<Scalars['Int']['input']>;
  state_gt?: InputMaybe<Scalars['Int']['input']>;
  state_gte?: InputMaybe<Scalars['Int']['input']>;
  state_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  state_lt?: InputMaybe<Scalars['Int']['input']>;
  state_lte?: InputMaybe<Scalars['Int']['input']>;
  state_not?: InputMaybe<Scalars['Int']['input']>;
  state_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type ModulePage = {
  __typename?: 'modulePage';
  items: Array<Module>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Position = {
  __typename?: 'position';
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  liquidity: Scalars['BigInt']['output'];
  owner: Scalars['String']['output'];
  pool?: Maybe<V3Pool>;
  tickLower: Scalars['Int']['output'];
  tickUpper: Scalars['Int']['output'];
};

export type PositionFilter = {
  AND?: InputMaybe<Array<InputMaybe<PositionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PositionFilter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['String']['input']>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  tickLower?: InputMaybe<Scalars['Int']['input']>;
  tickLower_gt?: InputMaybe<Scalars['Int']['input']>;
  tickLower_gte?: InputMaybe<Scalars['Int']['input']>;
  tickLower_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  tickLower_lt?: InputMaybe<Scalars['Int']['input']>;
  tickLower_lte?: InputMaybe<Scalars['Int']['input']>;
  tickLower_not?: InputMaybe<Scalars['Int']['input']>;
  tickLower_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  tickUpper?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_gt?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_gte?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  tickUpper_lt?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_lte?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_not?: InputMaybe<Scalars['Int']['input']>;
  tickUpper_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type PositionPage = {
  __typename?: 'positionPage';
  items: Array<Position>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Token = {
  __typename?: 'token';
  address: Scalars['String']['output'];
  chainId: Scalars['BigInt']['output'];
  decimals: Scalars['Int']['output'];
  firstSeenAt: Scalars['BigInt']['output'];
  isDerc20: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  totalSupply: Scalars['BigInt']['output'];
};

export type TokenFilter = {
  AND?: InputMaybe<Array<InputMaybe<TokenFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TokenFilter>>>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  firstSeenAt?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeenAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeenAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeenAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  firstSeenAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeenAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeenAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  firstSeenAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  isDerc20?: InputMaybe<Scalars['Boolean']['input']>;
  isDerc20_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  isDerc20_not?: InputMaybe<Scalars['Boolean']['input']>;
  isDerc20_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type TokenPage = {
  __typename?: 'tokenPage';
  items: Array<Token>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'user';
  address: Scalars['String']['output'];
  createdAt: Scalars['BigInt']['output'];
  userAssets?: Maybe<UserAssetPage>;
};


export type UserUserAssetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserAssetFilter>;
};

export type UserAsset = {
  __typename?: 'userAsset';
  asset?: Maybe<Asset>;
  assetId: Scalars['String']['output'];
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type UserAssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<UserAssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<UserAssetFilter>>>;
  assetId?: InputMaybe<Scalars['String']['input']>;
  assetId_contains?: InputMaybe<Scalars['String']['input']>;
  assetId_ends_with?: InputMaybe<Scalars['String']['input']>;
  assetId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  assetId_not?: InputMaybe<Scalars['String']['input']>;
  assetId_not_contains?: InputMaybe<Scalars['String']['input']>;
  assetId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  assetId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  assetId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  assetId_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  userId_contains?: InputMaybe<Scalars['String']['input']>;
  userId_ends_with?: InputMaybe<Scalars['String']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId_not?: InputMaybe<Scalars['String']['input']>;
  userId_not_contains?: InputMaybe<Scalars['String']['input']>;
  userId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type UserAssetPage = {
  __typename?: 'userAssetPage';
  items: Array<UserAsset>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserFilter = {
  AND?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type UserPage = {
  __typename?: 'userPage';
  items: Array<User>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type V3Pool = {
  __typename?: 'v3Pool';
  address: Scalars['String']['output'];
  asset?: Maybe<Asset>;
  baseToken?: Maybe<Token>;
  createdAt: Scalars['BigInt']['output'];
  initializer?: Maybe<Scalars['String']['output']>;
  liquidity: Scalars['BigInt']['output'];
  positions?: Maybe<PositionPage>;
  price: Scalars['BigInt']['output'];
  quoteToken?: Maybe<Token>;
  sqrtPrice: Scalars['BigInt']['output'];
  tick: Scalars['Int']['output'];
};


export type V3PoolPositionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PositionFilter>;
};

export type V3PoolFilter = {
  AND?: InputMaybe<Array<InputMaybe<V3PoolFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<V3PoolFilter>>>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset?: InputMaybe<Scalars['String']['input']>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  asset_not?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with?: InputMaybe<Scalars['String']['input']>;
  baseToken?: InputMaybe<Scalars['String']['input']>;
  baseToken_contains?: InputMaybe<Scalars['String']['input']>;
  baseToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  baseToken_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  baseToken_not?: InputMaybe<Scalars['String']['input']>;
  baseToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  baseToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  baseToken_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  baseToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  baseToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  initializer?: InputMaybe<Scalars['String']['input']>;
  initializer_contains?: InputMaybe<Scalars['String']['input']>;
  initializer_ends_with?: InputMaybe<Scalars['String']['input']>;
  initializer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  initializer_not?: InputMaybe<Scalars['String']['input']>;
  initializer_not_contains?: InputMaybe<Scalars['String']['input']>;
  initializer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  initializer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  initializer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  initializer_starts_with?: InputMaybe<Scalars['String']['input']>;
  liquidity?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidity_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  price?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  quoteToken?: InputMaybe<Scalars['String']['input']>;
  quoteToken_contains?: InputMaybe<Scalars['String']['input']>;
  quoteToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  quoteToken_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  quoteToken_not?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  quoteToken_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  quoteToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  quoteToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  sqrtPrice?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  sqrtPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  sqrtPrice_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tick?: InputMaybe<Scalars['Int']['input']>;
  tick_gt?: InputMaybe<Scalars['Int']['input']>;
  tick_gte?: InputMaybe<Scalars['Int']['input']>;
  tick_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  tick_lt?: InputMaybe<Scalars['Int']['input']>;
  tick_lte?: InputMaybe<Scalars['Int']['input']>;
  tick_not?: InputMaybe<Scalars['Int']['input']>;
  tick_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type V3PoolPage = {
  __typename?: 'v3PoolPage';
  items: Array<V3Pool>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TokenFragmentFragment = { __typename?: 'token', address: string, name: string, symbol: string, decimals: number, isDerc20: boolean } & { ' $fragmentName'?: 'TokenFragmentFragment' };

export type AssetFragmentFragment = { __typename?: 'asset', address: string, numeraire: string, timelock: string, governance: string, liquidityMigrator: string, migrationPool: string, numTokensToSell: any, integrator: string, createdAt: any, migratedAt?: any | null } & { ' $fragmentName'?: 'AssetFragmentFragment' };

export type AssetsQueryVariables = Exact<{
  poolInitializer?: InputMaybe<Scalars['String']['input']>;
}>;


export type AssetsQuery = { __typename?: 'Query', assets: { __typename?: 'assetPage', items: Array<{ __typename?: 'asset', address: string, numeraire: string, timelock: string, governance: string, liquidityMigrator: string, migrationPool: string, numTokensToSell: any, integrator: string, createdAt: any, migratedAt?: any | null, pool?: { __typename?: 'v3Pool', address: string, liquidity: any, price: any, createdAt: any, baseToken?: { __typename?: 'token', address: string, name: string, symbol: string, decimals: number, isDerc20: boolean } | null, quoteToken?: { __typename?: 'token', address: string, name: string, symbol: string, decimals: number, isDerc20: boolean } | null } | null }> } };

export type TokenQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type TokenQuery = { __typename?: 'Query', token?: { __typename?: 'token', address: string, name: string, symbol: string, decimals: number, isDerc20: boolean, totalSupply: any, firstSeenAt: any } | null };

export type PositionsQueryVariables = Exact<{
  pool: Scalars['String']['input'];
}>;


export type PositionsQuery = { __typename?: 'Query', positions: { __typename?: 'positionPage', items: Array<{ __typename?: 'position', liquidity: any, tickLower: number, tickUpper: number }> } };

export type AssetQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type AssetQuery = { __typename?: 'Query', asset?: { __typename?: 'asset', numeraire: string, timelock: string, createdAt: any, migratedAt?: any | null, pool?: { __typename?: 'v3Pool', address: string, liquidity: any, price: any, tick: number, baseToken?: { __typename?: 'token', address: string, name: string, symbol: string, decimals: number } | null, quoteToken?: { __typename?: 'token', address: string, name: string, symbol: string, decimals: number } | null } | null } | null };

export const TokenFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TokenFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"isDerc20"}}]}}]} as unknown as DocumentNode<TokenFragmentFragment, unknown>;
export const AssetFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"numeraire"}},{"kind":"Field","name":{"kind":"Name","value":"timelock"}},{"kind":"Field","name":{"kind":"Name","value":"governance"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityMigrator"}},{"kind":"Field","name":{"kind":"Name","value":"migrationPool"}},{"kind":"Field","name":{"kind":"Name","value":"numTokensToSell"}},{"kind":"Field","name":{"kind":"Name","value":"integrator"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"migratedAt"}}]}}]} as unknown as DocumentNode<AssetFragmentFragment, unknown>;
export const AssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Assets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poolInitializer"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"poolInitializer_contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poolInitializer"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"StringValue","value":"createdAt","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"StringValue","value":"desc","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"numeraire"}},{"kind":"Field","name":{"kind":"Name","value":"timelock"}},{"kind":"Field","name":{"kind":"Name","value":"governance"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityMigrator"}},{"kind":"Field","name":{"kind":"Name","value":"migrationPool"}},{"kind":"Field","name":{"kind":"Name","value":"numTokensToSell"}},{"kind":"Field","name":{"kind":"Name","value":"integrator"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"migratedAt"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"baseToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"isDerc20"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quoteToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"isDerc20"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AssetsQuery, AssetsQueryVariables>;
export const TokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Token"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"isDerc20"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"firstSeenAt"}}]}}]}}]} as unknown as DocumentNode<TokenQuery, TokenQueryVariables>;
export const PositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Positions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pool"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pool"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pool"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"tickLower"}},{"kind":"Field","name":{"kind":"Name","value":"tickUpper"}}]}}]}}]}}]} as unknown as DocumentNode<PositionsQuery, PositionsQueryVariables>;
export const AssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Asset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numeraire"}},{"kind":"Field","name":{"kind":"Name","value":"timelock"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"tick"}},{"kind":"Field","name":{"kind":"Name","value":"baseToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quoteToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"migratedAt"}}]}}]}}]} as unknown as DocumentNode<AssetQuery, AssetQueryVariables>;