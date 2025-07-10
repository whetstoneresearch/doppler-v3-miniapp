import { graphql } from "../gql/gql";

// Define fragments first
export const TokenFragmentDoc = graphql(`
  fragment TokenFragment on token {
    address
    name
    symbol
    decimals
    isDerc20
  }
`);

export const AssetFragmentDoc = graphql(`
  fragment AssetFragment on asset {
    address
    numeraire
    timelock
    governance
    liquidityMigrator
    migrationPool
    numTokensToSell
    integrator
    createdAt
    migratedAt
  }
`);

// Then build queries using fragments
export const AssetsDocument = graphql(`
  query Assets($poolInitializer: String) {
    assets(
      where: { poolInitializer_contains: $poolInitializer }
      orderBy: "createdAt"
      orderDirection: "desc"
      limit: 10
    ) {
      items {
        address
        numeraire
        timelock
        governance
        liquidityMigrator
        migrationPool
        numTokensToSell
        integrator
        createdAt
        migratedAt
        pool {
          address
          liquidity
          price
          createdAt
          baseToken {
            address
            name
            symbol
            decimals
            isDerc20
          }
          quoteToken {
            address
            name
            symbol
            decimals
            isDerc20
          }
        }
      }
    }
  }
  ${AssetFragmentDoc}
  ${TokenFragmentDoc}
`);

export const TokenDocument = graphql(`
  query Token($address: String!) {
    token(address: $address) {
      address
      name
      symbol
      decimals
      isDerc20
      totalSupply
      firstSeenAt
    }
  }
`);

export const PositionsDocument = graphql(`
  query Positions($pool: String!) {
    positions(where: { pool: $pool }) {
      items {
        liquidity
        tickLower
        tickUpper
      }
    }
  }
`);

export const AssetDocument = graphql(`
  query Asset($address: String!) {
    asset(address: $address) {
      numeraire
      timelock
      pool {
        address
        liquidity
        price
        tick
        baseToken {
          address
          name
          symbol
          decimals
        }
        quoteToken {
          address
          name
          symbol
          decimals
        }
      }
      createdAt
      migratedAt
    }
  }
`);

export const PoolsDocument = graphql(`
  query Pools(
    $orderBy: String
    $orderDirection: String
    $limit: Int
    $where: poolFilter 
  ) {
    pools(
      orderBy: $orderBy
      orderDirection: $orderDirection
      limit: $limit
      where: $where
    ) {
      items {
      address
      chainId
      tick
      sqrtPrice
      liquidity
      createdAt
      asset {
        marketCapUsd
      }
      baseToken {
        address
        name
        symbol
      }
      quoteToken {
        address
        name
        symbol
      }
      price
      fee
      type
      dollarLiquidity
      dailyVolume {
        volumeUsd
      }
      volumeUsd
      percentDayChange
      totalFee0
      totalFee1
      minThreshold
      maxThreshold
      graduationBalance
      isToken0
      lastRefreshed
      lastSwapTimestamp
      reserves0
      reserves1
      marketCapUsd
      }
    }
  }
`);
