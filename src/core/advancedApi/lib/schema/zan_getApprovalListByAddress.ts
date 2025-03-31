import { z } from "zod";
import { isAddress } from "viem";

export const ZanGetApprovalListByAddressRequestSchema = z.object({
  accountAddress: z.string().refine((val) => isAddress(val), {
    message: "Invalid account address",
  }),
  tokenType: z.string(), // 代币类型，例如 "ERC20"
  pageSize: z.number().gt(0, {
    message: "pageSize must be greater than 0",
  }),
  pageKey: z.number().gt(0, {
    message: "pageKey must be greater than 0",
  }),
});

export type ZanGetApprovalListByAddressRequest = z.infer<typeof ZanGetApprovalListByAddressRequestSchema>;

export type ZanGetApprovalListByAddressResponse = {
  pageSize: number;
  pageKey: number;
  items: Array<{
    approvedAddress: string;
    approvedAmount: string;
    blockNumber: number;
    blockTimestamp: number;
    tokenAddress: string;
    tokenStandard: string;
    transactionHash: string;
    type: string;
  }>;
};

export type ZanGetApprovalListByAddressMethod = {
  Method: "zan_getApprovalListByAddress";
  Parameters: [string, string, number, number]; // accountAddress, tokenType, pageSize, pageKey
  ReturnType: ZanGetApprovalListByAddressResponse;
}; 
