import { Client } from "viem";
import {
  ZanNftMetaDataRequest,
  ZanNftMetaDataRequestSchema,
  ZanNftMetaDataResponse,
} from "./lib/schema/zan_getNftMetaData";
import { ZodType } from "zod";
import { ZANInvalidInputParams } from "@/lib/errors/ZANInvalidInputParams";
import { ZanNftSchema } from "./lib/type";

const validateConfig = (args: unknown, schema: ZodType<unknown>) => {
  const validation = schema.safeParse(args);
  if (!validation.success) {
    throw new ZANInvalidInputParams(validation.error);
  }
};

export const ntfEvmActions = (client: Client) => {
  return {
    async getNftMetadata(args: ZanNftMetaDataRequest) {
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
  };
};
