import { describe, expect, it, vi } from 'vitest';
import { mainnet } from 'viem/chains';
import { ZANInvalidEndpointUrl } from '@/lib/errors/ZANInvalidEndpointUrl';
import { getChainFromEndpoint } from '../../core/chains';
import { CoreWss } from '@/core';

describe('getChainFromEndpoint', () => {
  it('should return the correct chain for a valid endpoint', () => {
    const endpoint = 'wss://api.zan.top/node/ws/v1/eth/mainnet/API_KEY';
    const chain = getChainFromEndpoint(endpoint, { wss: true });
    expect(chain).toBeDefined();
    expect(chain).toEqual(expect.objectContaining({ name: 'Ethereum' })); // 根据实际返回的链对象调整
  });
});

describe('wss method', () => {
  it('init', () => {
    const core = new CoreWss({
      endpoint: `wss://api.zan.top/node/ws/v1/eth/mainnet/{API_KEY}`,
      chain: mainnet,
    });
    vi.spyOn(core.client, 'watchPendingTransactions').mockResolvedValue(
      () => {},
    );
    const data = core.client.watchPendingTransactions({
      onTransactions: () => {},
    });
    expect(data).not.toBeNull();
  });

  it('init with no chain', () => {
    const core = new CoreWss({
      endpoint: `wss://api.zan.top/node/ws/v1/eth/mainnet/{API_KEY}`,
    });
    expect(core.client.chain?.id).toBe(1);
  });
  it('wrong ws', () => {
    const endpoint = 'https://api.zan.top/node/v1/eth/mainnet/{API_KEY}';
    expect(
      () =>
        new CoreWss({
          endpoint: endpoint,
          chain: mainnet,
        }),
    ).toThrow(new ZANInvalidEndpointUrl(endpoint));
  });
});
