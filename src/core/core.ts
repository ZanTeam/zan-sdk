import { Client, createPublicClient, http, publicActions } from 'viem';
import { CoreArguments, ZanClient } from './types';
import { getChainFromEndpoint, transformEndpoint } from './chains';
import { ntfEvmActions } from './advancedApi/nft_evm';
import { ZanNftAndTokenActions } from './advancedApi/lib/type';
import { ZANInvalidEndpointUrl } from '@/lib/errors/ZANInvalidEndpointUrl';
import { tokenEvmActions } from './advancedApi/token_evm';

// WIP: 后续添加 advanced Api
export const buildZANActions = (advancedClient: Client) => {
  return (): ZanNftAndTokenActions => ({
    ...ntfEvmActions(advancedClient),
    ...tokenEvmActions(advancedClient),
  });
};
export class Core {
  readonly endpoint: string;
  readonly client: ZanClient;

  constructor({ endpoint, chain }: CoreArguments) {
    if (!endpoint.includes('node')) {
      throw new ZANInvalidEndpointUrl(endpoint);
    }

    this.endpoint = endpoint;
    const chainSystem = chain || getChainFromEndpoint(endpoint);

    const baseClient = createPublicClient({
      chain: chainSystem,
      transport: http(this.endpoint),
    }).extend(publicActions);

    const advancedClient = createPublicClient({
      chain: chainSystem,
      transport: http(transformEndpoint(this.endpoint)),
    });

    const zanClient = baseClient.extend(buildZANActions(advancedClient));
    this.client = zanClient;
  }
}
