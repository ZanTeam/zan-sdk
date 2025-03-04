import { ZanSolanaClientOptions } from "./types";
import { Connection } from "@solana/web3.js";

export class Solana {
  readonly endpoint: string;
  readonly connection: Connection;

  constructor({ endpoint }: ZanSolanaClientOptions) {
    this.endpoint = endpoint;
    this.connection = new Connection(endpoint);
  }
}
