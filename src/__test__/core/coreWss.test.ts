import { describe, expect, it, vi, beforeEach } from 'vitest';
import { CoreWss } from '@/core/coreWss';
import { ZANInvalidEndpointUrl } from '@/lib/errors/ZANInvalidEndpointUrl';
import { mainnet } from 'viem/chains';

// Mock viem modules
vi.mock('viem', () => ({
  createPublicClient: vi.fn(() => ({
    // Mock client methods
    getBlockNumber: vi.fn(),
    getBalance: vi.fn(),
  })),
  webSocket: vi.fn(),
}));

describe('CoreWss', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create CoreWss instance with valid WSS endpoint', () => {
    const endpoint = 'wss://api.zan.top/node/ws/v1/eth/mainnet/test';
    const coreWss = new CoreWss({ endpoint });

    expect(coreWss.endpoint).toBe(endpoint);
    expect(coreWss.client).toBeDefined();
  });

  it('should create CoreWss instance with custom chain', () => {
    const endpoint = 'wss://api.zan.top/node/ws/v1/eth/mainnet/test';
    const coreWss = new CoreWss({ endpoint, chain: mainnet });

    expect(coreWss.endpoint).toBe(endpoint);
    expect(coreWss.client).toBeDefined();
  });

  it('should create CoreWss instance with config', () => {
    const endpoint = 'wss://api.zan.top/node/ws/v1/eth/mainnet/test';
    const config = { retryCount: 3 };
    const coreWss = new CoreWss({ endpoint, config });

    expect(coreWss.endpoint).toBe(endpoint);
    expect(coreWss.client).toBeDefined();
  });

  it('should throw ZANInvalidEndpointUrl for non-WSS endpoint', () => {
    const invalidEndpoints = [
      'https://api.zan.top/node/v1/eth/mainnet/test',
      'http://api.zan.top/node/v1/eth/mainnet/test',
      'ftp://api.zan.top/node/v1/eth/mainnet/test',
      'invalid-url',
    ];

    invalidEndpoints.forEach((endpoint) => {
      expect(() => new CoreWss({ endpoint })).toThrow(ZANInvalidEndpointUrl);
      expect(() => new CoreWss({ endpoint })).toThrow(
        'Endpoint URL ' + endpoint + ' is not in a valid ZAN endpoint format',
      );
    });
  });

  it('should handle different chain endpoints', () => {
    const endpoints = [
      'wss://api.zan.top/node/ws/v1/bsc/mainnet/test',
      'wss://api.zan.top/node/ws/v1/polygon/mainnet/test',
      'wss://api.zan.top/node/ws/v1/optimism/mainnet/test',
    ];

    endpoints.forEach((endpoint) => {
      const coreWss = new CoreWss({ endpoint });
      expect(coreWss.endpoint).toBe(endpoint);
      expect(coreWss.client).toBeDefined();
    });
  });

  it('should handle testnet endpoints', () => {
    const testnetEndpoints = [
      'wss://api.zan.top/node/ws/v1/eth/sepolia/test',
      'wss://api.zan.top/node/ws/v1/bsc/testnet/test',
      'wss://api.zan.top/node/ws/v1/polygon/amoy/test',
    ];

    testnetEndpoints.forEach((endpoint) => {
      const coreWss = new CoreWss({ endpoint });
      expect(coreWss.endpoint).toBe(endpoint);
      expect(coreWss.client).toBeDefined();
    });
  });

  it('should use provided chain instead of deriving from endpoint', () => {
    const endpoint = 'wss://api.zan.top/node/ws/v1/bsc/mainnet/test';
    const customChain = mainnet;
    const coreWss = new CoreWss({ endpoint, chain: customChain });

    expect(coreWss.endpoint).toBe(endpoint);
    expect(coreWss.client).toBeDefined();
  });

  it('should handle endpoints with query parameters', () => {
    const endpointWithQuery =
      'wss://api.zan.top/node/ws/v1/eth/mainnet/test?param=value';
    const coreWss = new CoreWss({ endpoint: endpointWithQuery });

    expect(coreWss.endpoint).toBe(endpointWithQuery);
    expect(coreWss.client).toBeDefined();
  });

  it('should handle endpoints with custom API paths', () => {
    const customApiEndpoint =
      'wss://api.zan.top/node/ws/v1/eth/mainnet/custom-api';
    const coreWss = new CoreWss({ endpoint: customApiEndpoint });

    expect(coreWss.endpoint).toBe(customApiEndpoint);
    expect(coreWss.client).toBeDefined();
  });

  it('should handle endpoints with different WSS configurations', () => {
    const endpoint = 'wss://api.zan.top/node/ws/v1/eth/mainnet/test';
    const configs = [
      { retryCount: 3 },
      { timeout: 5000 },
      { retryCount: 5, timeout: 10000 },
    ];

    configs.forEach((config) => {
      const coreWss = new CoreWss({ endpoint, config });
      expect(coreWss.endpoint).toBe(endpoint);
      expect(coreWss.client).toBeDefined();
    });
  });

  it('should handle endpoints with complex paths', () => {
    const complexEndpoints = [
      'wss://api.zan.top/node/ws/v1/eth/mainnet/deep/nested/path',
      'wss://api.zan.top/node/ws/v1/eth/mainnet/api/v2/endpoint',
    ];

    complexEndpoints.forEach((endpoint) => {
      const coreWss = new CoreWss({ endpoint });
      expect(coreWss.endpoint).toBe(endpoint);
      expect(coreWss.client).toBeDefined();
    });
  });
});
