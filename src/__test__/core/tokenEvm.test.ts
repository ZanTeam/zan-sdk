import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { tokenEvmActions } from '@/core/advancedApi/token_evm';

const advancedClient = createPublicClient({
  chain: mainnet,
  transport: http('https://api.zan.top/node/v1/eth/mainnet/API_KEY'),
});
const actions = tokenEvmActions(advancedClient);

describe('Token EVM API methods', () => {
  beforeEach(() => {
    vi.spyOn(advancedClient, 'request').mockResolvedValue({
      data: {
        result: {},
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('zanGetTokenMetadata', async () => {
    const data = await actions.zanGetTokenMetadata({
      contractAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
    });
    expect(data).toBeDefined();
  });

  it('zanGetTokenBalanceByOwner', async () => {
    const data = await actions.zanGetTokenBalanceByOwner({
      tokenAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      accountAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
    });
    expect(data).toBeDefined();
  });

  it('zanGetTokensByOwner', async () => {
    const data = await actions.zanGetTokensByOwner({
      accountAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      pageSize: 10,
      pageKey: 1,
    });
    expect(data).toBeDefined();
  });

  it('zanGetTokenHoldersCount', async () => {
    const data = await actions.zanGetTokenHoldersCount({
      tokenAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
    });
    expect(data).toBeDefined();
  });

  it('zanGetTokenHolders', async () => {
    const data = await actions.zanGetTokenHolders({
      tokenAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      pageSize: 10,
      pageKey: 1,
    });
    expect(data).toBeDefined();
  });

  it('zanGetApprovalListByAddress', async () => {
    const data = await actions.zanGetApprovalListByAddress({
      accountAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      tokenType: 'ERC20',
      pageSize: 10,
      pageKey: 1,
    });
    expect(data).toBeDefined();
  });

  it('zanGetApprovalListByToken', async () => {
    const data = await actions.zanGetApprovalListByToken({
      tokenAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      pageSize: 10,
      pageKey: 1,
    });
    expect(data).toBeDefined();
  });
});
