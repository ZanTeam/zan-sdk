import { z } from "zod";
import { isAddress } from "viem";

export const ZanVerifyNFTHolderRequestSchema = z.object({
  accountAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid account address",
  }),
  tokenType: z.string(),
  contracts: z.array(z.string()).min(1,{
    message: "Contracts array cannot be empty",
  }),
});

export type ZanVerifyNFTHolderRequest = z.infer<typeof ZanVerifyNFTHolderRequestSchema>;

export type ZanVerifyNFTHolderResponse = {
  accountAddress: string;
  contractsIndex: number[];
};

export type ZanVerifyNFTHolderMethod = {
  Method: "zan_verifyNFTHolder";
  Parameters: [string, string, string[]]; // accountAddress, tokenType, contracts
  ReturnType: ZanVerifyNFTHolderResponse;
}; 
