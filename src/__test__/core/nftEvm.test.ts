import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { ntfEvmActions } from '@/core/advancedApi/nft_evm';
import { ZanNftAndTokenActions } from '@/core/advancedApi/lib/type';
import { tokenEvmActions } from '@/core/advancedApi/token_evm';

const advancedClient = createPublicClient({
  chain: mainnet,
  transport: http('https://api.zan.top/node/v1/eth/mainnet/API_KEY'),
});
const actions: ZanNftAndTokenActions = {
  ...ntfEvmActions(advancedClient),
  ...tokenEvmActions(advancedClient),
};

describe('NFT EVM API methods', () => {
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

  it('zanGetNftMetadata', async () => {
    const data = await actions.zanGetNftMetadata({
      contractAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
    });
    expect(data).toBeDefined();
  });

  it('zanVerifyNFTHolder', async () => {
    const data = await actions.zanVerifyNFTHolder({
      accountAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      tokenType: 'ERC721',
      contracts: ['0xE25583099BA105D9ec0A67f5Ae86D90e50036425'],
    });
    expect(data).toBeDefined();
  });

  it('zanGetNftTransfers', async () => {
    const data = await actions.zanGetNftTransfers({
      contractAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      pageSize: 10,
      pageKey: 1,
    });
    expect(data).toBeDefined();
  });

  it('zanGetNftsByOwner', async () => {
    const data = await actions.zanGetNftsByOwner({
      walletAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      tokenType: 'ERC721',
      pageSize: 10,
      pageKey: 1,
    });
    expect(data).toBeDefined();
  });

  it('zanGetNftIDs', async () => {
    const data = await actions.zanGetNftIDs({
      contractAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      topN: 5,
    });
    expect(data).toBeDefined();
  });

  it('zanGetNFTHolders', async () => {
    const data = await actions.zanGetNFTHolders({
      contractAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      topN: 5,
    });
    expect(data).toBeDefined();
  });

  it('zanGetNftIDHolders', async () => {
    const data = await actions.zanGetNftIDHolders({
      contractAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      tokenId: '1',
      tokenType: 'ERC721',
    });
    expect(data).toBeDefined();
  });

  it('zanGetNftCollectionHolders', async () => {
    const data = await actions.zanGetNftCollectionHolders({
      contractAddress: '0xE25583099BA105D9ec0A67f5Ae86D90e50036425',
      tokenType: 'ERC721',
      pageSize: 10,
      pageKey: 1,
    });
    expect(data).toBeDefined();
  });
});
