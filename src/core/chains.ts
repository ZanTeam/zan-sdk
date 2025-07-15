import { Chain } from 'viem';
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
import { praseInfoFromEndpoint } from '@/utils';
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

export const getChainFromEndpoint = (
  endpoint: string,
  endpointConfig?: {
    wss?: boolean;
  },
) => {
  const { chain, network } = praseInfoFromEndpoint(endpoint, endpointConfig);
  const viemChain = convertToViemChain[`${chain}-${network}`];
  if (viemChain) return viemChain;
  throw new ZANNotSupported(endpoint);
};
