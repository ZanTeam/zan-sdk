import { RpcSchemaOverride } from "viem";
import {
  ZanNftMetaDataMethod,
  ZanNftMetaDataRequest,
  ZanNftMetaDataResponse,
} from "./schema/zan_getNftMetaData";
import { ZanNftByOwnerMethod, ZanNftByOwnerResponse } from "./schema/zan_getNftsByOwner";

type ZanNftMethods = [ZanNftMetaDataMethod];
type ZanNftByOwnerMethods = [ZanNftByOwnerMethod];
export type ZanNftSchema = RpcSchemaOverride & ZanNftMethods & ZanNftByOwnerMethods;

export type ZanNftAndTokenActions = {
  zanGetNftMetadata: (
    args: ZanNftMetaDataRequest
  ) => Promise<ZanNftMetaDataResponse>;
  zanGetNftsByOwner: (
    args: {
      ownerAddress: string;
      tokenType: string;
      pageSize: number;
      pageKey: number;
    }
  ) => Promise<ZanNftByOwnerResponse>;
};
