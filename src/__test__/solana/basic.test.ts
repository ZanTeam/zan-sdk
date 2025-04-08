import { Solana } from '@/index';
import { describe, expect, it, vi } from 'vitest';

describe('init method', () => {
  it('init core by default', async () => {
    const core = new Solana({
      endpoint: `https://api.zan.top/node/v1/eth/mainnet/API_KEY`,
    });

    vi.spyOn(core.connection, 'getBlockHeight').mockResolvedValue(1);

    const data = core.connection.getBlockHeight();
    expect(data).not.toBeNull();
  });
});
