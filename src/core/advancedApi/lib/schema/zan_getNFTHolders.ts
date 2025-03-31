import { z } from "zod";
import { isAddress } from "viem";

export const ZanGetNFTHoldersRequestSchema = z.object({
  contractAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid contract address",
  }),
  topN: z.number().gt(0, {
    message: "topN must be greater than 0",
  }),
});

export type ZanGetNFTHoldersRequest = z.infer<typeof ZanGetNFTHoldersRequestSchema>;

export type ZanGetNFTHoldersResponse = string[]; // 返回持有者地址的数组

export type ZanGetNFTHoldersMethod = {
  Method: "zan_getNFTHolders";
  Parameters: [string, number]; // contractAddress, topN
  ReturnType: ZanGetNFTHoldersResponse;
}; 
