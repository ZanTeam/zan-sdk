import { z } from "zod";
import { isAddress } from "viem";

export const ZanGetTokenHoldersRequestSchema = z.object({
  tokenAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid token address",
  }),
  pageSize: z.number().gt(0, {
    message: "pageSize must be greater than 0",
  }),
  pageKey: z.number().gt(0, {
    message: "pageKey must be greater than 0",
  }),
});

export type ZanGetTokenHoldersRequest = z.infer<typeof ZanGetTokenHoldersRequestSchema>;

export type ZanGetTokenHoldersResponse = {
  pageSize: number;
  pageKey: number;
  holders: Array<{
    holderAddress: string;
    balance: string;
  }>;
};

export type ZanGetTokenHoldersMethod = {
  Method: "zan_getTokenHolders";
  Parameters: [string, number, number]; // tokenAddress, pageSize, pageKey
  ReturnType: ZanGetTokenHoldersResponse;
}; 
