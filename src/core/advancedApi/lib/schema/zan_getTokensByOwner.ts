import { z } from "zod";
import { isAddress } from "viem";

export const ZanGetTokensByOwnerRequestSchema = z.object({
  accountAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid account address",
  }),
  pageSize: z.number().gt(0, {
    message: "pageSize must be greater than 0",
  }),
  pageKey: z.number().gt(0, {
    message: "pageKey must be greater than 0",
  }),
});

export type ZanGetTokensByOwnerRequest = z.infer<typeof ZanGetTokensByOwnerRequestSchema>;

export type ZanGetTokensByOwnerResponse = {
  pageSize: number;
  pageKey: number;
  tokens: Array<{
    tokenAddress: string;
    tokenId: string;
  }>;
};

export type ZanGetTokensByOwnerMethod = {
  Method: "zan_getTokensByOwner";
  Parameters: [string, number, number]; // accountAddress, pageSize, pageKey
  ReturnType: ZanGetTokensByOwnerResponse;
}; 
