import { describe, expect, it } from 'vitest';
import { validateConfig } from '@/core/advancedApi/lib/utils';
import { ZANInvalidInputParams } from '@/lib/errors/ZANInvalidInputParams';
import { z } from 'zod';

describe('validateConfig', () => {
  it('should not throw error for valid config', () => {
    const schema = z.object({
      contractAddress: z.string(),
      tokenId: z.string(),
    });
    
    const validConfig = {
      contractAddress: '0x1234567890123456789012345678901234567890',
      tokenId: '123',
    };
    
    expect(() => validateConfig(validConfig, schema)).not.toThrow();
  });

  it('should throw ZANInvalidInputParams for invalid config', () => {
    const schema = z.object({
      contractAddress: z.string(),
      tokenId: z.string(),
    });
    
    const invalidConfig = {
      contractAddress: '0x1234567890123456789012345678901234567890',
      // missing tokenId
    };
    
    expect(() => validateConfig(invalidConfig, schema)).toThrow(ZANInvalidInputParams);
  });

  it('should throw ZANInvalidInputParams for completely invalid config', () => {
    const schema = z.object({
      contractAddress: z.string(),
      tokenId: z.string(),
    });
    
    const invalidConfig = {
      // missing all required fields
    };
    
    expect(() => validateConfig(invalidConfig, schema)).toThrow(ZANInvalidInputParams);
  });

  it('should throw ZANInvalidInputParams for wrong data types', () => {
    const schema = z.object({
      contractAddress: z.string(),
      tokenId: z.string(),
    });
    
    const invalidConfig = {
      contractAddress: 123, // should be string
      tokenId: '123',
    };
    
    expect(() => validateConfig(invalidConfig, schema)).toThrow(ZANInvalidInputParams);
  });

  it('should handle complex nested schemas', () => {
    const schema = z.object({
      contractAddress: z.string(),
      options: z.object({
        includeMetadata: z.boolean(),
        limit: z.number().optional(),
      }),
    });
    
    const validConfig = {
      contractAddress: '0x1234567890123456789012345678901234567890',
      options: {
        includeMetadata: true,
        limit: 10,
      },
    };
    
    expect(() => validateConfig(validConfig, schema)).not.toThrow();
  });

  it('should throw error for invalid nested schema', () => {
    const schema = z.object({
      contractAddress: z.string(),
      options: z.object({
        includeMetadata: z.boolean(),
        limit: z.number().optional(),
      }),
    });
    
    const invalidConfig = {
      contractAddress: '0x1234567890123456789012345678901234567890',
      options: {
        includeMetadata: 'true', // should be boolean
        limit: 10,
      },
    };
    
    expect(() => validateConfig(invalidConfig, schema)).toThrow(ZANInvalidInputParams);
  });

  it('should handle array schemas', () => {
    const schema = z.object({
      addresses: z.array(z.string()),
      limit: z.number(),
    });
    
    const validConfig = {
      addresses: [
        '0x1234567890123456789012345678901234567890',
        '0x0987654321098765432109876543210987654321',
      ],
      limit: 10,
    };
    
    expect(() => validateConfig(validConfig, schema)).not.toThrow();
  });

  it('should throw error for invalid array schema', () => {
    const schema = z.object({
      addresses: z.array(z.string()),
      limit: z.number(),
    });
    
    const invalidConfig = {
      addresses: [
        '0x1234567890123456789012345678901234567890',
        123, // should be string
      ],
      limit: 10,
    };
    
    expect(() => validateConfig(invalidConfig, schema)).toThrow(ZANInvalidInputParams);
  });

  it('should handle optional fields', () => {
    const schema = z.object({
      contractAddress: z.string(),
      tokenId: z.string().optional(),
    });
    
    const configWithoutOptional = {
      contractAddress: '0x1234567890123456789012345678901234567890',
    };
    
    const configWithOptional = {
      contractAddress: '0x1234567890123456789012345678901234567890',
      tokenId: '123',
    };
    
    expect(() => validateConfig(configWithoutOptional, schema)).not.toThrow();
    expect(() => validateConfig(configWithOptional, schema)).not.toThrow();
  });

  it('should handle null and undefined values', () => {
    const schema = z.object({
      contractAddress: z.string(),
      tokenId: z.string().nullable(),
    });
    
    const configWithNull = {
      contractAddress: '0x1234567890123456789012345678901234567890',
      tokenId: null,
    };
    
    expect(() => validateConfig(configWithNull, schema)).not.toThrow();
  });
}); 