import { z } from "zod";
import { isAddress } from "viem";

export const ZanGetNftTransfersRequestSchema = z.object({
  contractAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid contract address",
  }),
  pageSize: z.number().gt(0, {
    message: "pageSize must be greater than 0",
  }),
  pageKey: z.number().gt(0, {
    message: "pageKey must be greater than 0",
  }),
  fromBlock: z.string().optional(),
  toBlock: z.string().optional(),
});

export type ZanGetNftTransfersRequest = z.infer<typeof ZanGetNftTransfersRequestSchema>;

export type ZanGetNftTransfersResponse = {
  pageSize: number;
  pageKey: number;
  txs: Array<{
    holderAddress: string;
    tokenBalance: string;
  }>;
};

export type ZanGetNftTransfersMethod = {
  Method: "zan_getNftTransfers";
  Parameters: [string, number, number, string?, string?]; // contractAddress, pageSize, pageKey, fromBlock, toBlock
  ReturnType: ZanGetNftTransfersResponse;
}; 
