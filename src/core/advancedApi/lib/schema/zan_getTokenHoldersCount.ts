import { z } from "zod";
import { isAddress } from "viem";

export const ZanGetTokenHoldersCountRequestSchema = z.object({
  tokenAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid token address",
  }),
});

export type ZanGetTokenHoldersCountRequest = z.infer<typeof ZanGetTokenHoldersCountRequestSchema>;

export type ZanGetTokenHoldersCountResponse = number

export type ZanGetTokenHoldersCountMethod = {
  Method: "zan_getTokenHoldersCount";
  Parameters: [string]; // tokenAddress
  ReturnType: ZanGetTokenHoldersCountResponse;
}; 
