import { describe, expect, it } from 'vitest';
import {
  praseInfoFromEndpoint,
  transformEndpointToAdvanced,
  transformEndpointToWss,
} from '@/utils/endpoint';
import { ZANInvalidEndpointUrl } from '@/lib/errors/ZANInvalidEndpointUrl';

describe('praseInfoFromEndpoint', () => {
  it('should parse valid HTTPS endpoint correctly', () => {
    const endpoint = 'https://api.zan.top/node/v1/eth/mainnet/test';
    const result = praseInfoFromEndpoint(endpoint);

    expect(result).toEqual({
      chain: 'eth',
      network: 'mainnet',
      api: 'test',
      wss: false,
    });
  });

  it('should parse valid WSS endpoint correctly', () => {
    const endpoint = 'wss://api.zan.top/node/ws/v1/eth/mainnet/test';
    const result = praseInfoFromEndpoint(endpoint, { wss: true });

    expect(result).toEqual({
      chain: 'eth',
      network: 'mainnet',
      api: 'test',
      wss: true,
    });
  });

  it('should parse WSS endpoint with wss config correctly', () => {
    const endpoint = 'wss://api.zan.top/node/ws/v1/eth/mainnet/test';
    const result = praseInfoFromEndpoint(endpoint, { wss: true });

    expect(result).toEqual({
      chain: 'eth',
      network: 'mainnet',
      api: 'test',
      wss: true,
    });
  });

  it('should throw ZANInvalidEndpointUrl for invalid URL', () => {
    const invalidEndpoint = 'invalid-url';

    expect(() => praseInfoFromEndpoint(invalidEndpoint)).toThrow(
      ZANInvalidEndpointUrl,
    );
    expect(() => praseInfoFromEndpoint(invalidEndpoint)).toThrow(
      'Endpoint URL invalid-url is not in a valid ZAN endpoint format',
    );
  });

  it('should throw ZANInvalidEndpointUrl for wrong domain', () => {
    const wrongDomainEndpoint =
      'https://wrong-domain.com/node/v1/eth/mainnet/test';

    expect(() => praseInfoFromEndpoint(wrongDomainEndpoint)).toThrow(
      ZANInvalidEndpointUrl,
    );
  });

  it('should throw ZANInvalidEndpointUrl for missing chain', () => {
    const missingChainEndpoint = 'https://api.zan.top/node/v1/mainnet/test';

    expect(() => praseInfoFromEndpoint(missingChainEndpoint)).toThrow(
      ZANInvalidEndpointUrl,
    );
  });

  it('should throw ZANInvalidEndpointUrl for missing network', () => {
    const missingNetworkEndpoint = 'https://api.zan.top/node/v1/eth/test';

    expect(() => praseInfoFromEndpoint(missingNetworkEndpoint)).toThrow(
      ZANInvalidEndpointUrl,
    );
  });

  it('should throw ZANInvalidEndpointUrl for missing api', () => {
    const missingApiEndpoint = 'https://api.zan.top/node/v1/eth/mainnet';

    expect(() => praseInfoFromEndpoint(missingApiEndpoint)).toThrow(
      ZANInvalidEndpointUrl,
    );
  });

  it('should handle different chain and network combinations', () => {
    const bscEndpoint = 'https://api.zan.top/node/v1/bsc/mainnet/test';
    const result = praseInfoFromEndpoint(bscEndpoint);

    expect(result).toEqual({
      chain: 'bsc',
      network: 'mainnet',
      api: 'test',
      wss: false,
    });
  });

  it('should handle testnet networks', () => {
    const testnetEndpoint = 'https://api.zan.top/node/v1/eth/sepolia/test';
    const result = praseInfoFromEndpoint(testnetEndpoint);

    expect(result).toEqual({
      chain: 'eth',
      network: 'sepolia',
      api: 'test',
      wss: false,
    });
  });
});

describe('transformEndpointToAdvanced', () => {
  it('should transform node endpoint to data endpoint', () => {
    const nodeEndpoint = 'https://api.zan.top/node/v1/eth/mainnet/test';
    const result = transformEndpointToAdvanced(nodeEndpoint);

    expect(result).toBe('https://api.zan.top/data/v1/eth/mainnet/test');
  });

  it('should handle WSS endpoints', () => {
    const wssEndpoint = 'wss://api.zan.top/node/ws/v1/eth/mainnet/test';
    const result = transformEndpointToAdvanced(wssEndpoint);

    expect(result).toBe('wss://api.zan.top/data/ws/v1/eth/mainnet/test');
  });
});

describe('transformEndpointToWss', () => {
  it('should transform HTTPS endpoint to WSS with ws path', () => {
    const httpsEndpoint = 'https://api.zan.top/node/v1/eth/mainnet/test';
    const result = transformEndpointToWss(httpsEndpoint);

    expect(result).toBe('wss://api.zan.top/node/ws/v1/eth/mainnet/test');
  });

  it('should handle endpoints with different paths', () => {
    const customEndpoint = 'https://api.zan.top/node/custom/path/test';
    const result = transformEndpointToWss(customEndpoint);

    expect(result).toBe('wss://api.zan.top/node/ws/custom/path/test');
  });

  it('should handle endpoints with query parameters', () => {
    const endpointWithQuery =
      'https://api.zan.top/node/v1/eth/mainnet/test?param=value';
    const result = transformEndpointToWss(endpointWithQuery);

    expect(result).toBe(
      'wss://api.zan.top/node/ws/v1/eth/mainnet/test?param=value',
    );
  });
});
