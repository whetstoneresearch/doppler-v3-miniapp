import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

const alchemyKey = import.meta.env.VITE_ALCHEMY_API_KEY;

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [injected(), coinbaseWallet()],
  transports: {
    [baseSepolia.id]: http(`https://sepolia.base.org`),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
