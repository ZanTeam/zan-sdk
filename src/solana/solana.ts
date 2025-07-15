import { transformEndpointToWss } from '@/utils';
import { ZanSolanaClientOptions } from './types';
import { Connection } from '@solana/web3.js';

export class Solana {
  readonly endpoint: string;
  readonly connection: Connection;

  constructor({ endpoint, commitmentOrConfig }: ZanSolanaClientOptions) {
    this.endpoint = endpoint;
    const wssEndpoint = transformEndpointToWss(endpoint);
    const solanaConnectionConfig = {
      wsEndpoint: wssEndpoint,
      commitment:
        typeof commitmentOrConfig === 'string'
          ? commitmentOrConfig
          : commitmentOrConfig?.commitment,
      ...(typeof commitmentOrConfig === 'object' ? commitmentOrConfig : {}),
    };
    this.connection = new Connection(endpoint, solanaConnectionConfig);
  }
}
