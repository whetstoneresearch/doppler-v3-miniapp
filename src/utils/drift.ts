import { createDrift } from "@delvtech/drift";
import { viemAdapter } from "@delvtech/drift-viem";
import { Chain, createPublicClient, http, WalletClient } from "viem";
import { INDEXER_URL } from "../services/indexer";

export function getDrift(chain: Chain, walletClient?: WalletClient) {
  const publicClient = createPublicClient({
    chain,
    transport: http(INDEXER_URL),
  });

  return createDrift({ adapter: viemAdapter({ publicClient, walletClient }) });
}

