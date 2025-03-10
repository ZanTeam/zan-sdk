import { RpcSchemaOverride } from "viem";
import {
  ZanNftMetaDataMethod,
  ZanNftMetaDataRequest,
  ZanNftMetaDataResponse,
} from "./schema/zan_getNftMetaData";

type ZanNftMethods = [ZanNftMetaDataMethod];
export type ZanNftSchema = RpcSchemaOverride & ZanNftMethods;

export type ZanNftAndTokenActions = {
  getNftMetadata: (
    args: ZanNftMetaDataRequest
  ) => Promise<ZanNftMetaDataResponse>;
};
