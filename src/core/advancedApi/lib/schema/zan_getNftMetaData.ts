import { z } from "zod";
import { isAddress } from "viem";

export const ZanNftMetaDataRequestSchema = z.object({
  contractAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid contract address",
  }),
});

export type ZanNftMetaDataRequest = z.infer<typeof ZanNftMetaDataRequestSchema>;
export type ZanNftMetaDataResponse = {
  address?: string;
  authentic?: boolean;
  decimal?: number;
  ecosystem?: string;
  name?: string;
  standard?: string;
  symbol?: string;
};
export type ZanNftMetaDataMethod = {
  Method: "zan_getNFTMetadata";
  Parameters: [string];
  ReturnType: ZanNftMetaDataResponse;
};
