import { isAddress } from "viem";
import { z } from "zod";

export const ZanNftIDsRequestSchema = z.object({
  contractAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid contract address",
  }),
  topN: z.number().gt(0, {
    message: "topN must be greater than 0",
  }),
});

export type ZanNftIDsRequest = z.infer<typeof ZanNftIDsRequestSchema>;

export type ZanNftIDsResponse = string[];

export type ZanNftIDsMethod = {
  Method: "zan_getNftIDs";
  Parameters: [string, number]; // contractAddress, topN
  ReturnType: ZanNftIDsResponse;
}; 
