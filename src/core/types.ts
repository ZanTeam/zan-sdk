import { Chain, PublicClient } from "viem";
import { ZanNftAndTokenActions } from "./advancedApi/lib/type";

export interface CoreArguments {
  endpoint: string;
  chain?: Chain;
  isAdvanced?: boolean;
}

export type ZanClient = PublicClient & ZanNftAndTokenActions;
