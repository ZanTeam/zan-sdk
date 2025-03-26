import { Chain } from "viem";
import { ZANInvalidEndpointUrl } from "../lib/errors/ZANInvalidEndpointUrl";
import {
  arbitrum,
  arbitrumSepolia,
  artelaTestnet,
  avalanche,
  avalancheFuji,
  base,
  bsc,
  bscTestnet,
  fantom,
  holesky,
  mainnet,
  mantle,
  mint,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  sepolia,
  taiko,
  tron,
  zksync,
} from "viem/chains";
import { ZANNotSupported } from "../lib/errors/ZANNotSupported";
const ETH_MAINNET_NETWORK = "eth-mainnet";

// 缺少了 ton starknet tron-nile bitcoin sui aptos core chainbase

const convertToViemChain: Record<string, Chain> = {
  [ETH_MAINNET_NETWORK]: mainnet, // The URL doesn't actually contain this
  "eth-sepolia": sepolia,
  "eth-holesky": holesky,
  "bsc-mainnet": bsc,
  "bsc-testnet": bscTestnet,
  "polygon-mainnet": polygon,
  "polygon-amoy": polygonAmoy,
  "optimism-mainnet": optimism,
  "optimism-sepolia": optimismSepolia,
  "arbitrum-one": arbitrum,
  "arbitrum-sepolia": arbitrumSepolia,
  "base-mainnet": base,
  "zksync-mainnet": zksync,
  "tron-mainnet": tron,
  "avalanche-mainnet": avalanche,
  "avalanche-testnet": avalancheFuji,
  "fantom-mainnet": fantom,
  "taiko-mainnet": taiko,
  "mantle-mainnet": mantle,
  "mint-mainnet": mint,
  "artela-testnet": artelaTestnet,
};

const praseInfoFromEndpoint = (endpoint: string) => {
  let paths: string[];
  let origin: string;

  try {
    const url = new URL(endpoint);
    paths = url.pathname.split("/");
    origin = url.origin;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new ZANInvalidEndpointUrl(endpoint);
  }
  const chain = paths.at(3);
  const network = paths.at(4);
  const api = paths.at(5);

  if (origin !== "https://api.zan.top" || !api || !chain || !network) {
    throw new ZANInvalidEndpointUrl(endpoint);
  }

  return {
    chain,
    network,
  };
};

export const getChainFromEndpoint = (endpoint: string) => {
  const { chain, network } = praseInfoFromEndpoint(endpoint);
  const viemChain = convertToViemChain[`${chain}-${network}`];
  if (viemChain) return viemChain;
  throw new ZANNotSupported(endpoint);
};

export const transformEndpoint = (endpoint: string) => {
  return endpoint.replace("/node/", "/data/");
};
