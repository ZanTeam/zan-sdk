import { Commitment, ConnectionConfig } from '@solana/web3.js';

export interface ZanSolanaClientOptions {
  endpoint: string;
  commitmentOrConfig?: Commitment | ConnectionConfig;
}
