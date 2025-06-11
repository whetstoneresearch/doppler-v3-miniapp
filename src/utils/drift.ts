import { createDrift, Drift } from "@delvtech/drift";
import { viemAdapter } from "@delvtech/drift-viem";
import { getPublicClient } from "@wagmi/core";
import { config } from "../wagmi";
import { WalletClient } from "viem";

export function getDrift(walletClient?: WalletClient): Drift {
  const publicClient = getPublicClient(config);
  return createDrift({ adapter: viemAdapter({ publicClient, walletClient }) });
}
