import { describe, expect, it } from 'vitest';
import { validateConfig } from '@/core/advancedApi/lib/utils';
import { ZanNftMetaDataRequestSchema } from '@/core/advancedApi/lib/schema/zan_getNftMetaData';
import { ZANInvalidInputParams } from '@/lib/errors/ZANInvalidInputParams';
import { ZanNftIDsRequestSchema } from '@/core/advancedApi/lib/schema/zan_getNftIDs';

describe('init method', () => {
  it('validateConfig', () => {
    expect(() => validateConfig({}, ZanNftMetaDataRequestSchema)).toThrow(
      ZANInvalidInputParams,
    );
  });

  it('ZANInvalidInputParams multi error', () => {
    expect(() => validateConfig({}, ZanNftIDsRequestSchema)).toThrow(
      'Invalid input parameters, contractAddress: Required, topN: Required',
    );
  });
});

import { ZodError } from 'zod';

describe('ZANInvalidInputParams', () => {
  it('should format error messages correctly when errors are present', () => {
    const baseError = new ZodError([
      {
        path: ['field1'],
        code: 'invalid_type',
        message: 'Field 1 is required',
        expected: 'string',
        received: 'undefined',
      },
      {
        path: [],
        code: 'invalid_type',
        message: 'Field 2 is invalid',
        expected: 'string',
        received: 'undefined',
      },
    ]);
    const error = new ZANInvalidInputParams(baseError);
    expect(error.message).toBe(
      'Invalid input parameters, field1: Field 1 is required, Field 2 is invalid',
    );
  });

  it('should handle empty errors array', () => {
    const baseError = new ZodError([]);
    const error = new ZANInvalidInputParams(baseError);
    expect(error.message).toBe('Invalid input parameters, ');
  });
  it('should handle single error with empty path', () => {
    const baseError = new ZodError([
      {
        path: [],
        code: 'invalid_type',
        message: 'Field is invalid',
        expected: 'string',
        received: 'undefined',
      },
    ]);
    const error = new ZANInvalidInputParams(baseError);
    expect(error.message).toBe('Invalid input parameters, Field is invalid');
  });
});
