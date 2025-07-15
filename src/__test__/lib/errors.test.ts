import { describe, expect, it } from 'vitest';
import { ZANInvalidEndpointUrl } from '@/lib/errors/ZANInvalidEndpointUrl';
import { ZANNotSupported } from '@/lib/errors/ZANNotSupported';

describe('ZANInvalidEndpointUrl', () => {
  it('should create error with correct message', () => {
    const endpoint = 'https://invalid-endpoint.com';
    const error = new ZANInvalidEndpointUrl(endpoint);
    
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(
      'Endpoint URL https://invalid-endpoint.com is not in a valid ZAN endpoint format. Please provide a valid ZAN endpoint URL.'
    );
  });

  it('should handle different endpoint formats', () => {
    const invalidEndpoints = [
      'invalid-url',
      'ftp://api.zan.top/node/v1/eth/mainnet',
      'http://wrong-domain.com/node/v1/eth/mainnet',
      'https://api.zan.top/wrong-path/v1/eth/mainnet',
    ];

    invalidEndpoints.forEach(endpoint => {
      const error = new ZANInvalidEndpointUrl(endpoint);
      expect(error.message).toContain(endpoint);
      expect(error.message).toContain('is not in a valid ZAN endpoint format');
    });
  });

  it('should extend Error class', () => {
    const error = new ZANInvalidEndpointUrl('test');
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('ZANInvalidEndpointUrl');
  });
});

describe('ZANNotSupported', () => {
  it('should create error with correct message', () => {
    const endpoint = 'https://api.zan.top/node/v1/unsupported-chain/mainnet';
    const error = new ZANNotSupported(endpoint);
    
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(
      'The chain for endpoint URL https://api.zan.top/node/v1/unsupported-chain/mainnet is not currently supported by the ZAN SDK.'
    );
  });

  it('should handle different endpoint formats', () => {
    const unsupportedEndpoints = [
      'https://api.zan.top/node/v1/unknown/mainnet',
      'wss://api.zan.top/node/ws/v1/unsupported/testnet',
      'https://api.zan.top/node/v1/obsolete/mainnet',
    ];

    unsupportedEndpoints.forEach(endpoint => {
      const error = new ZANNotSupported(endpoint);
      expect(error.message).toContain(endpoint);
      expect(error.message).toContain('is not currently supported by the ZAN SDK');
    });
  });

  it('should extend Error class', () => {
    const error = new ZANNotSupported('test');
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('ZANNotSupported');
  });
}); 