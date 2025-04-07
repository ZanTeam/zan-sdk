import { Core } from '@/index';
import { describe, expect, it, vi } from 'vitest';
import { mainnet } from 'viem/chains';
import { ZANInvalidEndpointUrl } from '@/lib/errors/ZANInvalidEndpointUrl';
import { getChainFromEndpoint } from '../../core/chains';
import { ZANNotSupported } from '../../lib/errors/ZANNotSupported';

describe('init method', () => {
  it('init core by default', async () => {
    const core = new Core({
      endpoint: `https://api.zan.top/node/v1/eth/mainnet/API_KEY`,
    });

    vi.spyOn(core.client, 'getBlockNumber').mockResolvedValue(1n);

    const data = core.client.getBlockNumber();
    expect(data).not.toBeNull();
  });

  it('init core in error endpoint', async () => {
    const endpoint = `xxx://api.zan.top/node/v1/eth/mainnet/API_KEY`;
    expect(() => {
      new Core({
        endpoint,
      });
    }).toThrow(new ZANInvalidEndpointUrl(endpoint));
  });

  it('init core by addition chain', async () => {
    const core = new Core({
      endpoint: `https://api.zan.top/node/v1/eth/mainnet/API_KEY`,
      chain: mainnet,
    });
    vi.spyOn(core.client, 'getBlockNumber').mockResolvedValue(1n);
    const data = core.client.getBlockNumber();
    expect(data).not.toBeNull();
  });
});

describe('getChainFromEndpoint', () => {
  it('should return the correct chain for a valid endpoint', () => {
    const endpoint = 'https://api.zan.top/node/v1/eth/mainnet/API_KEY';
    const chain = getChainFromEndpoint(endpoint);
    expect(chain).toBeDefined();
    expect(chain).toEqual(expect.objectContaining({ name: 'Ethereum' })); // 根据实际返回的链对象调整
  });

  it('should throw ZANInvalidEndpointUrl for an invalid URL', () => {
    const unsupportedEndpoint =
      'xxx//api.zan.top/node/chain/unsupported-network/data';
    expect(() => getChainFromEndpoint(unsupportedEndpoint)).toThrow(
      ZANInvalidEndpointUrl,
    );
  });

  it('should throw ZANNotSupported for unsupported chains', () => {
    const invalidEndpoint = 'https://api.zan.top/node/v1/eth2/mainnet/API_KEY';
    expect(() => getChainFromEndpoint(invalidEndpoint)).toThrow(
      new ZANNotSupported(invalidEndpoint),
    );
  });

  it('core init with invalid endpoint', () => {
    const invalidEndpoint = 'https://api.zan.top/v1/eth2/mainnet/API_KEY';
    expect(() => new Core({ endpoint: invalidEndpoint })).toThrow(
      new ZANInvalidEndpointUrl(invalidEndpoint),
    );
  });
});
