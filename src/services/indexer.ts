import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import {
  AssetsDocument,
  AssetsQuery,
  TokenQuery,
  AssetQuery,
  PositionsQuery,
} from "../gql/graphql";
import { AssetDocument, PositionsDocument, TokenDocument } from "./documents";

export const INDEXER_URL = import.meta.env.VITE_INDEXER_GRAPHQL;

export const useToken = (address: string) =>
  useQuery<TokenQuery>({
    queryKey: ["indexer", "token", address],
    queryFn: () => request(INDEXER_URL, TokenDocument, { address }),
  });

export const useAssets = (poolInitializer?: string) =>
  useQuery<AssetsQuery>({
    queryKey: ["indexer", "assets", poolInitializer],
    queryFn: () =>
      request(INDEXER_URL, AssetsDocument, {
        poolInitializer: poolInitializer?.toLowerCase(),
      }),
  });

export const useAsset = (address: string) =>
  useQuery<AssetQuery>({
    queryKey: ["indexer", "asset", address],
    queryFn: () => request(INDEXER_URL, AssetDocument, { address }),
  });

export const usePositions = (pool: string | undefined) =>
  useQuery<PositionsQuery>({
    queryKey: ["indexer", "positions", pool],
    queryFn: () => {
      if (!pool) throw new Error("Pool address required");
      return request(INDEXER_URL, PositionsDocument, { pool });
    },
    enabled: !!pool,
  });
// export const usePositions = (owner: string) =>
//   useQuery<PositionPage>({
//     queryKey: ["indexer", "positions", owner],
//     queryFn: () =>
//       request(INDEXER_URL, PositionPageDocument, {
//         owner: owner.toLowerCase(),
//       }),
//     enabled: !!owner,
//   });

// export const useHourBuckets = (poolId: string) =>
//   useQuery<HourBucketPage>({
//     queryKey: ["indexer", "hourBuckets", poolId],
//     queryFn: () =>
//       request(INDEXER_URL, HourBucketPageDocument, {
//         poolId: poolId.toLowerCase(),
//       }),
//   });
