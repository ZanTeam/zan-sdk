import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Solana } from '@/solana/solana';
import { Commitment, Connection } from '@solana/web3.js';
import { transformEndpointToWss } from '@/utils';

// Mock the utils module
vi.mock('@/utils', () => ({
  transformEndpointToWss: vi.fn((endpoint: string) =>
    endpoint.replace('https://api.zan.top/node/', 'wss://api.zan.top/node/ws/'),
  ),
}));

// Mock @solana/web3.js
vi.mock('@solana/web3.js', () => ({
  Connection: vi.fn().mockImplementation(() => ({
    getBlockHeight: vi.fn().mockResolvedValue(12345),
    getBalance: vi.fn().mockResolvedValue(1000000),
    getSlot: vi.fn().mockResolvedValue(67890),
  })),
}));

describe('Solana', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create Solana instance with valid endpoint', () => {
    const endpoint = 'https://api.zan.top/node/v1/solana/mainnet/test';
    const solana = new Solana({ endpoint });

    expect(solana.endpoint).toBe(endpoint);
    expect(solana.connection).toBeDefined();
    expect(transformEndpointToWss).toHaveBeenCalledWith(endpoint);
  });

  it('should create Solana instance with string commitment', () => {
    const endpoint = 'https://api.zan.top/node/v1/solana/mainnet/test';
    const commitment = 'confirmed';
    const solana = new Solana({ endpoint, commitmentOrConfig: commitment });

    expect(solana.endpoint).toBe(endpoint);
    expect(solana.connection).toBeDefined();
    expect(Connection).toHaveBeenCalledWith(endpoint, {
      wsEndpoint: 'wss://api.zan.top/node/ws/v1/solana/mainnet/test',
      commitment: 'confirmed',
    });
  });

  it('should create Solana instance with ConnectionConfig object', () => {
    const endpoint = 'https://api.zan.top/node/v1/solana/mainnet/test';
    const config = {
      commitment: 'finalized' as Commitment,
      confirmTransactionInitialTimeout: 60000,
      disableRetryOnRateLimit: false,
    };
    const solana = new Solana({ endpoint, commitmentOrConfig: config });

    expect(solana.endpoint).toBe(endpoint);
    expect(solana.connection).toBeDefined();
    expect(Connection).toHaveBeenCalledWith(endpoint, {
      wsEndpoint: 'wss://api.zan.top/node/ws/v1/solana/mainnet/test',
      commitment: 'finalized',
      confirmTransactionInitialTimeout: 60000,
      disableRetryOnRateLimit: false,
    });
  });

  it('should create Solana instance with ConnectionConfig without commitment', () => {
    const endpoint = 'https://api.zan.top/node/v1/solana/mainnet/test';
    const config = {
      confirmTransactionInitialTimeout: 60000,
      disableRetryOnRateLimit: false,
    };
    const solana = new Solana({ endpoint, commitmentOrConfig: config });

    expect(solana.endpoint).toBe(endpoint);
    expect(solana.connection).toBeDefined();
    expect(Connection).toHaveBeenCalledWith(endpoint, {
      wsEndpoint: 'wss://api.zan.top/node/ws/v1/solana/mainnet/test',
      commitment: undefined,
      confirmTransactionInitialTimeout: 60000,
      disableRetryOnRateLimit: false,
    });
  });

  it('should create Solana instance without commitmentOrConfig', () => {
    const endpoint = 'https://api.zan.top/node/v1/solana/mainnet/test';
    const solana = new Solana({ endpoint });

    expect(solana.endpoint).toBe(endpoint);
    expect(solana.connection).toBeDefined();
    expect(Connection).toHaveBeenCalledWith(endpoint, {
      wsEndpoint: 'wss://api.zan.top/node/ws/v1/solana/mainnet/test',
      commitment: undefined,
    });
  });

  it('should handle different endpoint formats', () => {
    const endpoints = [
      'https://api.zan.top/node/v1/solana/mainnet/test',
      'https://api.zan.top/node/v1/solana/testnet/test',
      'https://api.zan.top/node/v1/solana/devnet/test',
    ];

    endpoints.forEach((endpoint) => {
      const solana = new Solana({ endpoint });
      expect(solana.endpoint).toBe(endpoint);
      expect(solana.connection).toBeDefined();
    });
  });

  it('should handle endpoints with query parameters', () => {
    const endpoint =
      'https://api.zan.top/node/v1/solana/mainnet/test?param=value';
    const solana = new Solana({ endpoint });

    expect(solana.endpoint).toBe(endpoint);
    expect(solana.connection).toBeDefined();
  });

  it('should handle endpoints with custom API paths', () => {
    const endpoint = 'https://api.zan.top/node/v1/solana/mainnet/custom-api';
    const solana = new Solana({ endpoint });

    expect(solana.endpoint).toBe(endpoint);
    expect(solana.connection).toBeDefined();
  });

  it('should transform endpoint correctly for WSS', () => {
    const endpoint = 'https://api.zan.top/node/v1/solana/mainnet/test';
    new Solana({ endpoint });

    expect(transformEndpointToWss).toHaveBeenCalledWith(endpoint);
  });

  it('should handle different commitment levels', () => {
    const commitments = ['processed', 'confirmed', 'finalized'] as const;
    const endpoint = 'https://api.zan.top/node/v1/solana/mainnet/test';

    commitments.forEach((commitment) => {
      const solana = new Solana({ endpoint, commitmentOrConfig: commitment });
      expect(solana.connection).toBeDefined();
    });
  });

  it('should handle complex ConnectionConfig objects', () => {
    const endpoint = 'https://api.zan.top/node/v1/solana/mainnet/test';
    const complexConfig = {
      commitment: 'confirmed' as Commitment,
      confirmTransactionInitialTimeout: 120000,
      disableRetryOnRateLimit: true,
      httpHeaders: { 'Custom-Header': 'value' },
      fetch: vi.fn(),
    };

    const solana = new Solana({ endpoint, commitmentOrConfig: complexConfig });
    expect(solana.connection).toBeDefined();
  });

  it('should preserve all properties from ConnectionConfig', () => {
    const endpoint = 'https://api.zan.top/node/v1/solana/mainnet/test';
    const config = {
      commitment: 'finalized' as Commitment,
      confirmTransactionInitialTimeout: 60000,
      disableRetryOnRateLimit: false,
      httpHeaders: { Authorization: 'Bearer token' },
    };

    new Solana({ endpoint, commitmentOrConfig: config });

    expect(Connection).toHaveBeenCalledWith(endpoint, {
      wsEndpoint: 'wss://api.zan.top/node/ws/v1/solana/mainnet/test',
      commitment: 'finalized',
      confirmTransactionInitialTimeout: 60000,
      disableRetryOnRateLimit: false,
      httpHeaders: { Authorization: 'Bearer token' },
    });
  });
});
