import { ZANInvalidEndpointUrl } from '@/lib/errors/ZANInvalidEndpointUrl';
import { CoreWssArguments } from './types';
import { getChainFromEndpoint } from './chains';
import { Client, createPublicClient, webSocket } from 'viem';
// wss://api.zan.top/node/ws/v1/eth/mainnet/d4cf825de2084a60a591da3c2cb641e1
export class CoreWss {
  readonly endpoint: string;
  readonly client: Client;

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
