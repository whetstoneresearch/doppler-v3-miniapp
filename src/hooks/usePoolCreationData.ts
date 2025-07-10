import { useQuery } from "@tanstack/react-query";
import { Address, zeroAddress } from "viem";
import { ReadDerc20, ReadFactory } from "doppler-v3-sdk";
import { getDrift } from "../utils/drift";
import { base } from "viem/chains";

export type PoolQueryResult = {
  data: PoolData[] | undefined;
  error: Error | null;
  isLoading: boolean;
};

export type TokenData = {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply?: bigint;
  poolBalance?: bigint;
};

export type PoolData = {
  asset: TokenData;
  numeraire: TokenData;
  pool: Address;
  poolAssetBalance: bigint;
  poolNumeraireBalance: bigint;
};

export interface PoolCreationData {
  asset: ReadDerc20;
  numeraire: ReadDerc20;
  pool: Address;
  governance: Address;
  liquidityMigrator: Address;
  migrationPool: Address;
  poolInitializer: Address;
  timelock: Address;
}

const getCreationData = async (airlock: Address) => {
  const drift = getDrift(base);
  const readFactory = new ReadFactory(airlock, drift);
  const logs = await readFactory.getCreateEvents({
    fromBlock: 0n,
    toBlock: "latest",
  });
  const assetDatas = await Promise.all(
    logs.map(async (log) => {
      const assetData = await readFactory.getAssetData(log.args.asset);
      const { numeraire, ...rest } = assetData;
      return {
        ...rest,
        asset: new ReadDerc20(log.args.asset, drift),
        numeraire: new ReadDerc20(numeraire, drift),
      };
    })
  );
  return assetDatas;
};

const getPoolCreationData = async (poolCreation: PoolCreationData) => {
  const { numeraire, asset } = poolCreation;
  const numeraireAddress = numeraire.contract.address;
  const [assetData, numeraireData] = await Promise.all([
    Promise.all([
      asset.getName(),
      asset.getSymbol(),
      asset.getDecimals(),
      asset.getTotalSupply(),
      asset.getBalanceOf(poolCreation.pool),
    ]),
    Promise.all([
      numeraireAddress != zeroAddress ? numeraire.getName() : "Ether",
      numeraireAddress != zeroAddress ? numeraire.getSymbol() : "WETH",
      numeraireAddress != zeroAddress ? numeraire.getDecimals() : 18,
      numeraireAddress != zeroAddress
        ? numeraire.getBalanceOf(poolCreation.pool)
        : 0n,
    ]),
  ]);

  const [
    assetName,
    assetSymbol,
    assetDecimals,
    assetTotalSupply,
    poolAssetBalance,
  ] = assetData;
  const [
    numeraireName,
    numeraireSymbol,
    numeraireDecimals,
    poolNumeraireBalance,
  ] = numeraireData;

  return {
    asset: {
      address: poolCreation.asset.contract.address,
      name: assetName,
      symbol: assetSymbol,
      decimals: assetDecimals,
      totalSupply: assetTotalSupply,
    },
    numeraire: {
      address: poolCreation.numeraire.contract.address,
      name: numeraireName,
      symbol: numeraireSymbol,
      decimals: numeraireDecimals,
    },
    pool: poolCreation.pool,
    poolAssetBalance,
    poolNumeraireBalance,
  };
};

export function usePoolCreationDatas(airlock: Address) {
  const creationsQuery = useQuery({
    queryKey: ["create-events", airlock],
    queryFn: async () => {
      return getCreationData(airlock);
    },
  });

  const poolsQuery = useQuery({
    queryKey: [
      "pools",
      creationsQuery.data?.map((pc) => pc.asset.contract.address),
    ],
    queryFn: async () => {
      const poolDatas = await Promise.all(
        creationsQuery?.data?.map(async (creationData) => {
          return getPoolCreationData(creationData);
        }) ?? []
      );
      return poolDatas;
    },
    enabled: !!creationsQuery.data,
  });

  return {
    isLoading: poolsQuery.isLoading || creationsQuery.isLoading,
    error: poolsQuery.error || creationsQuery.error,
    data: poolsQuery.data,
  };
}
