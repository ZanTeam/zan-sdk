import { Client } from "viem";
import {
  ZanNftMetaDataRequest,
  ZanNftMetaDataRequestSchema,
  ZanNftMetaDataResponse,
} from "./lib/schema/zan_getNftMetaData";
import { ZodType } from "zod";
import { ZANInvalidInputParams } from "@/lib/errors/ZANInvalidInputParams";
import { ZanNftSchema } from "./lib/type";
import { ZanNftByOwnerRequest, ZanNftByOwnerResponse } from "./lib/schema/zan_getNftsByOwner";

const validateConfig = (args: unknown, schema: ZodType<unknown>) => {
  const validation = schema.safeParse(args);
  if (!validation.success) {
    throw new ZANInvalidInputParams(validation.error);
  }
};

export const ntfEvmActions = (client: Client) => {
  return {

    async zanGetNftMetadata(args: ZanNftMetaDataRequest) {
      validateConfig(args, ZanNftMetaDataRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: "zan_getNFTMetadata";
          params: [string];
        },
        ZanNftMetaDataResponse
      >({
        method: "zan_getNFTMetadata",
        params: [args.contractAddress],
      });
    },
    
    async zanGetNftsByOwner(args: ZanNftByOwnerRequest) {
      return await client.request<
        ZanNftSchema,
        {
          method: "zan_getNFTsByOwner";
          params: [string, string, number, number];
        },
        ZanNftByOwnerResponse
      >({
        method: "zan_getNFTsByOwner",
        params: [args.walletAddress, args.tokenType, args.pageSize, args.pageKey],
      });
    }
  };

};
