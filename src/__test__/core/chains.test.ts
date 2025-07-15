import { describe, expect, it } from 'vitest';
import { getChainFromEndpoint } from '@/core/chains';
import { ZANNotSupported } from '@/lib/errors/ZANNotSupported';
import { mainnet, sepolia, bsc, polygon, optimism } from 'viem/chains';

describe('getChainFromEndpoint', () => {
  it('should return mainnet chain for eth-mainnet', () => {
    const endpoint = 'https://api.zan.top/node/v1/eth/mainnet/test';
    const chain = getChainFromEndpoint(endpoint);

    expect(chain).toBe(mainnet);
  });

  it('should return sepolia chain for eth-sepolia', () => {
    const endpoint = 'https://api.zan.top/node/v1/eth/sepolia/test';
    const chain = getChainFromEndpoint(endpoint);

    expect(chain).toBe(sepolia);
  });

  it('should return bsc chain for bsc-mainnet', () => {
    const endpoint = 'https://api.zan.top/node/v1/bsc/mainnet/test';
    const chain = getChainFromEndpoint(endpoint);

    expect(chain).toBe(bsc);
  });

  it('should return polygon chain for polygon-mainnet', () => {
    const endpoint = 'https://api.zan.top/node/v1/polygon/mainnet/test';
    const chain = getChainFromEndpoint(endpoint);

    expect(chain).toBe(polygon);
  });

  it('should return optimism chain for optimism-mainnet', () => {
    const endpoint = 'https://api.zan.top/node/v1/optimism/mainnet/test';
    const chain = getChainFromEndpoint(endpoint);

    expect(chain).toBe(optimism);
  });

  it('should handle WSS endpoints with wss config', () => {
    const wssEndpoint = 'wss://api.zan.top/node/ws/v1/eth/mainnet/test';
    const chain = getChainFromEndpoint(wssEndpoint, { wss: true });

    expect(chain).toBe(mainnet);
  });

  it('should handle testnet networks', () => {
    const testnetEndpoints = [
      'https://api.zan.top/node/v1/eth/sepolia/test',
      'https://api.zan.top/node/v1/bsc/testnet/test',
      'https://api.zan.top/node/v1/polygon/amoy/test',
      'https://api.zan.top/node/v1/optimism/sepolia/test',
      'https://api.zan.top/node/v1/arbitrum/sepolia/test',
      'https://api.zan.top/node/v1/base/sepolia/test',
    ];

    testnetEndpoints.forEach((endpoint) => {
      const chain = getChainFromEndpoint(endpoint);
      expect(chain).toBeDefined();
      expect(typeof chain.id).toBe('number');
    });
  });

  it('should handle other supported networks', () => {
    const supportedEndpoints = [
      'https://api.zan.top/node/v1/base/mainnet/test',
      'https://api.zan.top/node/v1/zksync/mainnet/test',
      'https://api.zan.top/node/v1/tron/mainnet/test',
      'https://api.zan.top/node/v1/avalanche/mainnet/test',
      'https://api.zan.top/node/v1/fantom/mainnet/test',
      'https://api.zan.top/node/v1/taiko/mainnet/test',
      'https://api.zan.top/node/v1/mantle/mainnet/test',
      'https://api.zan.top/node/v1/mint/mainnet/test',
      'https://api.zan.top/node/v1/artela/testnet/test',
      'https://api.zan.top/node/v1/gravity_alpha/mainnet/test',
    ];

    supportedEndpoints.forEach((endpoint) => {
      const chain = getChainFromEndpoint(endpoint);
      expect(chain).toBeDefined();
      expect(typeof chain.id).toBe('number');
    });
  });

  it('should throw ZANNotSupported for unsupported chain', () => {
    const unsupportedEndpoint =
      'https://api.zan.top/node/v1/unsupported/mainnet/test';

    expect(() => getChainFromEndpoint(unsupportedEndpoint)).toThrow(
      ZANNotSupported,
    );
    expect(() => getChainFromEndpoint(unsupportedEndpoint)).toThrow(
      'The chain for endpoint URL https://api.zan.top/node/v1/unsupported/mainnet/test is not currently supported by the ZAN SDK.',
    );
  });

  it('should throw ZANNotSupported for unsupported network', () => {
    const unsupportedNetworkEndpoint =
      'https://api.zan.top/node/v1/eth/unsupported/test';

    expect(() => getChainFromEndpoint(unsupportedNetworkEndpoint)).toThrow(
      ZANNotSupported,
    );
  });

  it('should throw ZANNotSupported for unsupported chain-network combination', () => {
    const unsupportedCombinationEndpoint =
      'https://api.zan.top/node/v1/unknown/testnet/test';

    expect(() => getChainFromEndpoint(unsupportedCombinationEndpoint)).toThrow(
      ZANNotSupported,
    );
  });

  it('should handle WSS endpoints without wss config', () => {
    const wssEndpoint = 'wss://api.zan.top/node/ws/v1/eth/mainnet/test';
    const chain = getChainFromEndpoint(wssEndpoint);

    expect(chain).toBe(mainnet);
  });
});
