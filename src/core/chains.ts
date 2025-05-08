import { Chain } from 'viem';
import { ZANInvalidEndpointUrl } from '../lib/errors/ZANInvalidEndpointUrl';
import {
  arbitrum,
  arbitrumSepolia,
  artelaTestnet,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
  fantom,
  gravity,
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
} from 'viem/chains';
import { ZANNotSupported } from '../lib/errors/ZANNotSupported';
const ETH_MAINNET_NETWORK = 'eth-mainnet';

// 缺少了 ton starknet tron-nile bitcoin sui aptos core chainbase

const convertToViemChain: Record<string, Chain> = {
  [ETH_MAINNET_NETWORK]: mainnet, // The URL doesn't actually contain this
  'eth-sepolia': sepolia,
  'eth-holesky': holesky,
  'bsc-mainnet': bsc,
  'bsc-testnet': bscTestnet,
  'polygon-mainnet': polygon,
  'polygon-amoy': polygonAmoy,
  'optimism-mainnet': optimism,
  'optimism-sepolia': optimismSepolia,
  'arbitrum-one': arbitrum,
  'arbitrum-sepolia': arbitrumSepolia,
  'base-mainnet': base,
  'base-sepolia': baseSepolia,
  'zksync-mainnet': zksync,
  'tron-mainnet': tron,
  'avalanche-mainnet': avalanche,
  'avalanche-testnet': avalancheFuji,
  'fantom-mainnet': fantom,
  'taiko-mainnet': taiko,
  'mantle-mainnet': mantle,
  'mint-mainnet': mint,
  'artela-testnet': artelaTestnet,
  'gravity_alpha-mainnet': gravity,
};

const praseInfoFromEndpoint = (endpoint: string, wss?: boolean) => {
  let paths: string[];
  let origin: string;

  try {
    const url = new URL(endpoint);
    paths = url.pathname.split('/');
    origin = url.origin;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new ZANInvalidEndpointUrl(endpoint);
  }

  const bias = wss ? 1 : 0;

  const chain = paths.at(3 + bias);
  const network = paths.at(4 + bias);
  const api = paths.at(5 + bias);
  const originDomain = wss ? 'wss://api.zan.top' : 'https://api.zan.top';

  if (origin !== originDomain || !api || !chain || !network) {
    throw new ZANInvalidEndpointUrl(endpoint);
  }

  return {
    chain,
    network,
  };
};

export const getChainFromEndpoint = (
  endpoint: string,
  endpointConfig?: {
    wss?: boolean;
  },
) => {
  const { chain, network } = praseInfoFromEndpoint(
    endpoint,
    endpointConfig?.wss,
  );
  const viemChain = convertToViemChain[`${chain}-${network}`];
  if (viemChain) return viemChain;
  throw new ZANNotSupported(endpoint);
};

export const transformEndpoint = (endpoint: string) => {
  return endpoint.replace('/node/', '/data/');
};

export const transformWssEndpoint = (endpoint: string) => {
  return endpoint.replace('https://', 'wss://');
};
