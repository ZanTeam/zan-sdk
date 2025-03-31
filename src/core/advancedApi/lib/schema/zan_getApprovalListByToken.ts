import { z } from "zod";
import { isAddress } from "viem";

export const ZanGetApprovalListByTokenRequestSchema = z.object({
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

export type ZanGetApprovalListByTokenRequest = z.infer<typeof ZanGetApprovalListByTokenRequestSchema>;

export type ZanGetApprovalListByTokenResponse = {
  pageSize: number;
  pageKey: number;
  items: Array<{
    approvedAddress: string;
    approvedAmount: string;
    blockNumber: number;
    blockTimestamp: number;
    owner: string;
    tokenStandard: string;
    transactionHash: string;
    type: string;
  }>;
};

export type ZanGetApprovalListByTokenMethod = {
  Method: "zan_getApprovalListByToken";
  Parameters: [string, number, number]; // tokenAddress, pageSize, pageKey
  ReturnType: ZanGetApprovalListByTokenResponse;
}; 
