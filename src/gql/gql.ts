/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  fragment TokenFragment on token {\n    address\n    name\n    symbol\n    decimals\n    isDerc20\n  }\n": types.TokenFragmentFragmentDoc,
    "\n  fragment AssetFragment on asset {\n    address\n    numeraire\n    timelock\n    governance\n    liquidityMigrator\n    migrationPool\n    numTokensToSell\n    integrator\n    createdAt\n    migratedAt\n  }\n": types.AssetFragmentFragmentDoc,
    "\n  query Assets($poolInitializer: String) {\n    assets(\n      where: { poolInitializer_contains: $poolInitializer }\n      orderBy: \"createdAt\"\n      orderDirection: \"desc\"\n      limit: 10\n    ) {\n      items {\n        address\n        numeraire\n        timelock\n        governance\n        liquidityMigrator\n        migrationPool\n        numTokensToSell\n        integrator\n        createdAt\n        migratedAt\n        pool {\n          address\n          liquidity\n          price\n          createdAt\n          baseToken {\n            address\n            name\n            symbol\n            decimals\n            isDerc20\n          }\n          quoteToken {\n            address\n            name\n            symbol\n            decimals\n            isDerc20\n          }\n        }\n      }\n    }\n  }\n  \n  \n": types.AssetsDocument,
    "\n  query Token($address: String!) {\n    token(address: $address) {\n      address\n      name\n      symbol\n      decimals\n      isDerc20\n      totalSupply\n      firstSeenAt\n    }\n  }\n": types.TokenDocument,
    "\n  query Positions($pool: String!) {\n    positions(where: { pool: $pool }) {\n      items {\n        liquidity\n        tickLower\n        tickUpper\n      }\n    }\n  }\n": types.PositionsDocument,
    "\n  query Asset($address: String!) {\n    asset(address: $address) {\n      numeraire\n      timelock\n      pool {\n        address\n        liquidity\n        price\n        tick\n        baseToken {\n          address\n          name\n          symbol\n          decimals\n        }\n        quoteToken {\n          address\n          name\n          symbol\n          decimals\n        }\n      }\n      createdAt\n      migratedAt\n    }\n  }\n": types.AssetDocument,
    "\n  query Pools(\n    $orderBy: String\n    $orderDirection: String\n    $limit: Int\n    $where: poolFilter \n  ) {\n    pools(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      limit: $limit\n      where: $where\n    ) {\n      items {\n      address\n      chainId\n      tick\n      sqrtPrice\n      liquidity\n      createdAt\n      asset {\n        marketCapUsd\n      }\n      baseToken {\n        address\n        name\n        symbol\n      }\n      quoteToken {\n        address\n        name\n        symbol\n      }\n      price\n      fee\n      type\n      dollarLiquidity\n      dailyVolume {\n        volumeUsd\n      }\n      volumeUsd\n      percentDayChange\n      totalFee0\n      totalFee1\n      graduationThreshold\n      graduationBalance\n      isToken0\n      lastRefreshed\n      lastSwapTimestamp\n      reserves0\n      reserves1\n      marketCapUsd\n      }\n    }\n  }\n": types.PoolsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TokenFragment on token {\n    address\n    name\n    symbol\n    decimals\n    isDerc20\n  }\n"): (typeof documents)["\n  fragment TokenFragment on token {\n    address\n    name\n    symbol\n    decimals\n    isDerc20\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AssetFragment on asset {\n    address\n    numeraire\n    timelock\n    governance\n    liquidityMigrator\n    migrationPool\n    numTokensToSell\n    integrator\n    createdAt\n    migratedAt\n  }\n"): (typeof documents)["\n  fragment AssetFragment on asset {\n    address\n    numeraire\n    timelock\n    governance\n    liquidityMigrator\n    migrationPool\n    numTokensToSell\n    integrator\n    createdAt\n    migratedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Assets($poolInitializer: String) {\n    assets(\n      where: { poolInitializer_contains: $poolInitializer }\n      orderBy: \"createdAt\"\n      orderDirection: \"desc\"\n      limit: 10\n    ) {\n      items {\n        address\n        numeraire\n        timelock\n        governance\n        liquidityMigrator\n        migrationPool\n        numTokensToSell\n        integrator\n        createdAt\n        migratedAt\n        pool {\n          address\n          liquidity\n          price\n          createdAt\n          baseToken {\n            address\n            name\n            symbol\n            decimals\n            isDerc20\n          }\n          quoteToken {\n            address\n            name\n            symbol\n            decimals\n            isDerc20\n          }\n        }\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  query Assets($poolInitializer: String) {\n    assets(\n      where: { poolInitializer_contains: $poolInitializer }\n      orderBy: \"createdAt\"\n      orderDirection: \"desc\"\n      limit: 10\n    ) {\n      items {\n        address\n        numeraire\n        timelock\n        governance\n        liquidityMigrator\n        migrationPool\n        numTokensToSell\n        integrator\n        createdAt\n        migratedAt\n        pool {\n          address\n          liquidity\n          price\n          createdAt\n          baseToken {\n            address\n            name\n            symbol\n            decimals\n            isDerc20\n          }\n          quoteToken {\n            address\n            name\n            symbol\n            decimals\n            isDerc20\n          }\n        }\n      }\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Token($address: String!) {\n    token(address: $address) {\n      address\n      name\n      symbol\n      decimals\n      isDerc20\n      totalSupply\n      firstSeenAt\n    }\n  }\n"): (typeof documents)["\n  query Token($address: String!) {\n    token(address: $address) {\n      address\n      name\n      symbol\n      decimals\n      isDerc20\n      totalSupply\n      firstSeenAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Positions($pool: String!) {\n    positions(where: { pool: $pool }) {\n      items {\n        liquidity\n        tickLower\n        tickUpper\n      }\n    }\n  }\n"): (typeof documents)["\n  query Positions($pool: String!) {\n    positions(where: { pool: $pool }) {\n      items {\n        liquidity\n        tickLower\n        tickUpper\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Asset($address: String!) {\n    asset(address: $address) {\n      numeraire\n      timelock\n      pool {\n        address\n        liquidity\n        price\n        tick\n        baseToken {\n          address\n          name\n          symbol\n          decimals\n        }\n        quoteToken {\n          address\n          name\n          symbol\n          decimals\n        }\n      }\n      createdAt\n      migratedAt\n    }\n  }\n"): (typeof documents)["\n  query Asset($address: String!) {\n    asset(address: $address) {\n      numeraire\n      timelock\n      pool {\n        address\n        liquidity\n        price\n        tick\n        baseToken {\n          address\n          name\n          symbol\n          decimals\n        }\n        quoteToken {\n          address\n          name\n          symbol\n          decimals\n        }\n      }\n      createdAt\n      migratedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Pools(\n    $orderBy: String\n    $orderDirection: String\n    $limit: Int\n    $where: poolFilter \n  ) {\n    pools(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      limit: $limit\n      where: $where\n    ) {\n      items {\n      address\n      chainId\n      tick\n      sqrtPrice\n      liquidity\n      createdAt\n      asset {\n        marketCapUsd\n      }\n      baseToken {\n        address\n        name\n        symbol\n      }\n      quoteToken {\n        address\n        name\n        symbol\n      }\n      price\n      fee\n      type\n      dollarLiquidity\n      dailyVolume {\n        volumeUsd\n      }\n      volumeUsd\n      percentDayChange\n      totalFee0\n      totalFee1\n      graduationThreshold\n      graduationBalance\n      isToken0\n      lastRefreshed\n      lastSwapTimestamp\n      reserves0\n      reserves1\n      marketCapUsd\n      }\n    }\n  }\n"): (typeof documents)["\n  query Pools(\n    $orderBy: String\n    $orderDirection: String\n    $limit: Int\n    $where: poolFilter \n  ) {\n    pools(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      limit: $limit\n      where: $where\n    ) {\n      items {\n      address\n      chainId\n      tick\n      sqrtPrice\n      liquidity\n      createdAt\n      asset {\n        marketCapUsd\n      }\n      baseToken {\n        address\n        name\n        symbol\n      }\n      quoteToken {\n        address\n        name\n        symbol\n      }\n      price\n      fee\n      type\n      dollarLiquidity\n      dailyVolume {\n        volumeUsd\n      }\n      volumeUsd\n      percentDayChange\n      totalFee0\n      totalFee1\n      graduationThreshold\n      graduationBalance\n      isToken0\n      lastRefreshed\n      lastSwapTimestamp\n      reserves0\n      reserves1\n      marketCapUsd\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;