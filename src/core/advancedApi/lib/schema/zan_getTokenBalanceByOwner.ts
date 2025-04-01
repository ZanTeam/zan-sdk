import { z } from "zod";
import { isAddress } from "viem";

export const ZanGetTokenBalanceByOwnerRequestSchema = z.object({
  tokenAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid token address",
  }),
  accountAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid account address",
  }),
});

export type ZanGetTokenBalanceByOwnerRequest = z.infer<typeof ZanGetTokenBalanceByOwnerRequestSchema>;

export type ZanGetTokenBalanceByOwnerResponse = string

export type ZanGetTokenBalanceByOwnerMethod = {
  Method: "zan_getTokenBalanceByOwner";
  Parameters: [string, string]; // tokenAddress, accountAddress
  ReturnType: ZanGetTokenBalanceByOwnerResponse;
}; 
