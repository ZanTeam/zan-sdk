import { Client, createPublicClient, http, publicActions } from "viem";
import { CoreArguments, ZanClient } from "./types";
import { getChainFromEndpoint, transformEndpoint } from "./chains";
import { ntfEvmActions } from "./advancedApi/nft_evm";
import { ZanNftAndTokenActions } from "./advancedApi/lib/type";

// WIP: 后续添加 advanced Api
export const buildZANActions = () => {
  return (client: Client): ZanNftAndTokenActions => ({
    ...ntfEvmActions(client),
  });
};
export class Core {
  readonly endpoint: string;
  readonly client: ZanClient;

  constructor({ endpoint, chain, advanced }: CoreArguments) {
    this.endpoint = endpoint;
    const baseClient = createPublicClient({
      chain: chain || getChainFromEndpoint(endpoint),
      transport: http(
        advanced ? transformEndpoint(this.endpoint) : this.endpoint,
      ),
    }).extend(publicActions);

    const zanClient = baseClient.extend(buildZANActions());
    this.client = zanClient;
  }
}
