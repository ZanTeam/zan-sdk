import { z } from "zod";
import { isAddress } from "viem";

export const ZanGetNftIDHoldersRequestSchema = z.object({
  contractAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid contract address",
  }),
  tokenId: z.string().nonempty({
    message: "Token ID cannot be empty",
  }),
  tokenType: z.string(),
});

export type ZanGetNftIDHoldersRequest = z.infer<typeof ZanGetNftIDHoldersRequestSchema>;

export type ZanGetNftIDHoldersResponse = string[]; // 返回持有者地址的数组

export type ZanGetNftIDHoldersMethod = {
  Method: "zan_getNftIDHolders";
  Parameters: [string, string, string]; // contractAddress, tokenId, tokenType
  ReturnType: ZanGetNftIDHoldersResponse;
}; 
