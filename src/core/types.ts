import { Chain, PublicClient } from "viem";
import { ZanNftAndTokenActions } from "./advancedApi/lib/type";

export interface CoreArguments {
  endpoint: string;
  chain?: Chain;
  advanced?: boolean;
}

export type ZanClient = PublicClient & ZanNftAndTokenActions;
