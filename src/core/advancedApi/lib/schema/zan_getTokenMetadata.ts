import { z } from "zod";
import { isAddress } from "viem";

export const ZanGetTokenMetadataRequestSchema = z.object({
  contractAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid token address",
  }),
});

export type ZanGetTokenMetadataRequest = z.infer<typeof ZanGetTokenMetadataRequestSchema>;

export type ZanGetTokenMetadataResponse = {
  address: string;
  authentic: boolean;
  decimal: number;
  ecosystem: string;
  name: string;
  standard: string;
  symbol: string;
};

export type ZanGetTokenMetadataMethod = {
  Method: "zan_getTokenMetadata";
  Parameters: [string]; // tokenAddress
  ReturnType: ZanGetTokenMetadataResponse;
}; 
