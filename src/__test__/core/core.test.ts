import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Core } from '@/core/core';
import { ZANInvalidEndpointUrl } from '@/lib/errors/ZANInvalidEndpointUrl';
import { mainnet } from 'viem/chains';

// Mock viem modules
vi.mock('viem', () => ({
  createPublicClient: vi.fn(() => ({
    extend: vi.fn(() => ({
      extend: vi.fn(() => ({
        // Mock client methods
        getBlockNumber: vi.fn(),
        getBalance: vi.fn(),
      })),
    })),
  })),
  http: vi.fn(),
  publicActions: {},
}));

// Mock the advanced API modules
vi.mock('@/core/advancedApi/nft_evm', () => ({
  ntfEvmActions: vi.fn(() => ({
    getNftMetadata: vi.fn(),
    getNftHolders: vi.fn(),
  })),
}));

vi.mock('@/core/advancedApi/token_evm', () => ({
  tokenEvmActions: vi.fn(() => ({
    getTokenMetadata: vi.fn(),
    getTokenHolders: vi.fn(),
  })),
}));

describe('Core', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create Core instance with valid endpoint', () => {
    const endpoint = 'https://api.zan.top/node/v1/eth/mainnet/test';
    const core = new Core({ endpoint });

    expect(core.endpoint).toBe(endpoint);
    expect(core.client).toBeDefined();
  });

  it('should create Core instance with custom chain', () => {
    const endpoint = 'https://api.zan.top/node/v1/eth/mainnet/test';
    const core = new Core({ endpoint, chain: mainnet });

    expect(core.endpoint).toBe(endpoint);
    expect(core.client).toBeDefined();
  });

  it('should throw ZANInvalidEndpointUrl for endpoint without node', () => {
    const invalidEndpoint = 'https://api.zan.top/data/v1/eth/mainnet/test';

    expect(() => new Core({ endpoint: invalidEndpoint })).toThrow(
      ZANInvalidEndpointUrl,
    );
    expect(() => new Core({ endpoint: invalidEndpoint })).toThrow(
      'Endpoint URL https://api.zan.top/data/v1/eth/mainnet/test is not in a valid ZAN endpoint format',
    );
  });

  it('should throw ZANInvalidEndpointUrl for invalid endpoint format', () => {
    const invalidEndpoints = [
      'https://api.zan.top/wrong/v1/eth/mainnet/test',
      'https://wrong-domain.com/node/v1/eth/mainnet/test',
      'ftp://api.zan.top/node/v1/eth/mainnet/test',
    ];

    invalidEndpoints.forEach((endpoint) => {
      expect(() => new Core({ endpoint })).toThrow(ZANInvalidEndpointUrl);
    });
  });

  it('should handle different chain endpoints', () => {
    const endpoints = [
      'https://api.zan.top/node/v1/bsc/mainnet/test',
      'https://api.zan.top/node/v1/polygon/mainnet/test',
      'https://api.zan.top/node/v1/optimism/mainnet/test',
    ];

    endpoints.forEach((endpoint) => {
      const core = new Core({ endpoint });
      expect(core.endpoint).toBe(endpoint);
      expect(core.client).toBeDefined();
    });
  });

  it('should handle testnet endpoints', () => {
    const testnetEndpoints = [
      'https://api.zan.top/node/v1/eth/sepolia/test',
      'https://api.zan.top/node/v1/bsc/testnet/test',
      'https://api.zan.top/node/v1/polygon/amoy/test',
    ];

    testnetEndpoints.forEach((endpoint) => {
      const core = new Core({ endpoint });
      expect(core.endpoint).toBe(endpoint);
      expect(core.client).toBeDefined();
    });
  });

  it('should use provided chain instead of deriving from endpoint', () => {
    const endpoint = 'https://api.zan.top/node/v1/bsc/mainnet/test';
    const customChain = mainnet;
    const core = new Core({ endpoint, chain: customChain });

    expect(core.endpoint).toBe(endpoint);
    expect(core.client).toBeDefined();
  });

  it('should handle endpoints with query parameters', () => {
    const endpointWithQuery =
      'https://api.zan.top/node/v1/eth/mainnet/test?param=value';
    const core = new Core({ endpoint: endpointWithQuery });

    expect(core.endpoint).toBe(endpointWithQuery);
    expect(core.client).toBeDefined();
  });

  it('should handle endpoints with custom API paths', () => {
    const customApiEndpoint =
      'https://api.zan.top/node/v1/eth/mainnet/custom-api';
    const core = new Core({ endpoint: customApiEndpoint });

    expect(core.endpoint).toBe(customApiEndpoint);
    expect(core.client).toBeDefined();
  });
});
