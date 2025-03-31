import { z } from "zod";
import { isAddress } from "viem";

export const ZanNftByOwnerRequestSchema = z.object({
  walletAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid contract address",
  }),
  tokenType: z.string(),
  pageSize: z.number().gt(0, {
    message: "pageSize must be greater than 0",
  }),
  pageKey: z.number().gt(0, {
    message: "pageKey must be greater than 0",
  }),
});
export type ZanNftByOwnerRequest = z.infer<typeof ZanNftByOwnerRequestSchema>;

export type ZanNftByOwnerResponse = {
  pageSize?: number;
  pageKey?: number;
  items?: Array<{
    tokenAddress?: string,
    tokenId?: string;
    holderAddress?: string;
    addressBalance?: string
  }>
};

export type ZanNftByOwnerMethod = {
  Method: "zan_getNFTsByOwner";
  Parameters: [string, string, number, number]; 
  ReturnType: ZanNftByOwnerResponse;
};
