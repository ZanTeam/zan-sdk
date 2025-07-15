import { Chain, PublicClient, WebSocketTransportConfig } from 'viem';
import { ZanNftAndTokenActions } from './advancedApi/lib/type';

export interface CoreArguments {
  endpoint: string;
  chain?: Chain;
}

export interface CoreWssArguments extends CoreArguments {
  config?: WebSocketTransportConfig;
}

export type ZanClient = PublicClient & ZanNftAndTokenActions;
