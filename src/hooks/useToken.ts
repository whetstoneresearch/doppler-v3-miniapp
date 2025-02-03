import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { ReadDerc20 } from "doppler-v3-sdk";
import { getDrift } from "../utils/drift";
import { TokenData } from "../types";
import { INDEXER_URL } from "../services/indexer";
import { gql, request } from "graphql-request";

export const fetchDerc20TokenData = async (
  address: Address | undefined
): Promise<TokenData> => {
  if (!address) {
    throw "Token address is undefined";
  }

  try {
    const drift = getDrift();
    const token = new ReadDerc20(address, drift);

    const [name, symbol, decimals, totalSupply] = await Promise.all([
      token.getName(),
      token.getSymbol(),
      token.getDecimals(),
      token.getTotalSupply(),
    ]);

    if (!name || !symbol || !decimals || !totalSupply) {
      throw `Failed to fetch token data for ${address}: Token data not found`;
    }

    return {
      token,
      name,
      symbol,
      decimals,
      totalSupply,
    };
  } catch (error) {
    throw `Failed to fetch token data for ${address}: ${error}`;
  }
};

export function useTokenData(address: Address | undefined) {
  const tokenDataQuery = useQuery({
    queryKey: ["token-data", address],
    queryFn: async () => {
      return fetchDerc20TokenData(address);
    },
    enabled: Boolean(address),
  });

  if (tokenDataQuery.error) {
    throw tokenDataQuery.error;
  }

  return tokenDataQuery;
}

export const useToken = (address?: Address) => {
  const tokenQuery = gql`
    query Token($address: String!) {
      token(id: $address) {
        address
        name
        symbol
        decimals
        isDerc20
      }
    }
  `;

  return useQuery({
    queryKey: ["token", address],
    queryFn: () =>
      request(INDEXER_URL, tokenQuery, {
        address: address?.toLowerCase(),
      }),
    enabled: !!address,
    select: (data: any) => data.token,
  });
};
