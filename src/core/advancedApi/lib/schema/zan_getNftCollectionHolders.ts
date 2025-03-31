import { z } from "zod";
import { isAddress } from "viem";

export const ZanGetNftCollectionHoldersRequestSchema = z.object({
  contractAddress: z.string().refine((val) => isAddress(val), {
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

export type ZanGetNftCollectionHoldersRequest = z.infer<typeof ZanGetNftCollectionHoldersRequestSchema>;

export type ZanGetNftCollectionHoldersResponse = {
  pageSize: number;
  pageKey: number;
  holderAddressesWithBalances: Array<{
    tokenId: string;
    addressBalance: string;
  }>;
};

export type ZanGetNftCollectionHoldersMethod = {
  Method: "zan_getNftCollectionHolders";
  Parameters: [string, string, number, number]; // contractAddress, tokenType, pageSize, pageKey
  ReturnType: ZanGetNftCollectionHoldersResponse;
}; 
