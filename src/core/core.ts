import { createPublicClient, http, publicActions, PublicClient } from "viem";
import { CoreArguments } from "./types";
import { getChainFromEndpoint } from "./chains";

// WIP: 后续添加 advanced Api
export const buildZANActions = () => {
  return () => ({});
};
export class Core {
  readonly endpoint: string;
  readonly client: PublicClient;

  constructor({ endpoint, chain }: CoreArguments) {
    this.endpoint = endpoint;
    const baseClient = createPublicClient({
      chain: chain || getChainFromEndpoint(endpoint),
      transport: http(this.endpoint),
    }).extend(publicActions);

    const zanClient = baseClient.extend(buildZANActions());
    this.client = zanClient;
  }
}
