import { ZANInvalidEndpointUrl } from '@/lib/errors/ZANInvalidEndpointUrl';
import { CoreWssArguments } from './types';
import { getChainFromEndpoint } from './chains';
import { createPublicClient, PublicClient, webSocket } from 'viem';

export class CoreWss {
  readonly endpoint: string;
  readonly client: PublicClient;

  constructor({ endpoint, chain, config }: CoreWssArguments) {
    if (!endpoint.includes('ws')) {
      throw new ZANInvalidEndpointUrl(endpoint);
    }

    this.endpoint = endpoint;
    const chainSystem =
      chain ||
      getChainFromEndpoint(endpoint, {
        wss: true,
      });

    const baseClient = createPublicClient({
      chain: chainSystem,
      transport: webSocket(this.endpoint, config),
    });

    this.client = baseClient;
  }
}
