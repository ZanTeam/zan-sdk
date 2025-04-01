import { Client } from 'viem';

import { ZanNftSchema } from './lib/type';

import {
  ZanGetTokenMetadataRequest,
  ZanGetTokenMetadataRequestSchema,
  ZanGetTokenMetadataResponse,
} from './lib/schema/zan_getTokenMetadata';
import {
  ZanGetTokenBalanceByOwnerRequest,
  ZanGetTokenBalanceByOwnerRequestSchema,
  ZanGetTokenBalanceByOwnerResponse,
} from './lib/schema/zan_getTokenBalanceByOwner';
import {
  ZanGetTokensByOwnerRequest,
  ZanGetTokensByOwnerRequestSchema,
  ZanGetTokensByOwnerResponse,
} from './lib/schema/zan_getTokensByOwner';
import {
  ZanGetTokenHoldersCountRequest,
  ZanGetTokenHoldersCountRequestSchema,
  ZanGetTokenHoldersCountResponse,
} from './lib/schema/zan_getTokenHoldersCount';
import {
  ZanGetTokenHoldersRequest,
  ZanGetTokenHoldersRequestSchema,
  ZanGetTokenHoldersResponse,
} from './lib/schema/zan_getTokenHolders';
import {
  ZanGetApprovalListByAddressRequest,
  ZanGetApprovalListByAddressRequestSchema,
  ZanGetApprovalListByAddressResponse,
} from './lib/schema/zan_getApprovalListByAddress';
import {
  ZanGetApprovalListByTokenRequest,
  ZanGetApprovalListByTokenRequestSchema,
  ZanGetApprovalListByTokenResponse,
} from './lib/schema/zan_getApprovalListByToken';
import { validateConfig } from './lib/utils';

export const tokenEvmActions = (client: Client) => {
  return {
    async zanGetTokenMetadata(args: ZanGetTokenMetadataRequest) {
      validateConfig(args, ZanGetTokenMetadataRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: 'zan_getTokenMetadata';
          params: [string];
        },
        ZanGetTokenMetadataResponse
      >({
        method: 'zan_getTokenMetadata',
        params: [args.contractAddress],
      });
    },

    async zanGetTokenBalanceByOwner(args: ZanGetTokenBalanceByOwnerRequest) {
      validateConfig(args, ZanGetTokenBalanceByOwnerRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: 'zan_getTokenBalanceByOwner';
          params: [string, string];
        },
        ZanGetTokenBalanceByOwnerResponse
      >({
        method: 'zan_getTokenBalanceByOwner',
        params: [args.tokenAddress, args.accountAddress],
      });
    },

    async zanGetTokensByOwner(args: ZanGetTokensByOwnerRequest) {
      validateConfig(args, ZanGetTokensByOwnerRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: 'zan_getTokensByOwner';
          params: [string, number, number];
        },
        ZanGetTokensByOwnerResponse
      >({
        method: 'zan_getTokensByOwner',
        params: [args.accountAddress, args.pageSize, args.pageKey],
      });
    },

    async zanGetTokenHoldersCount(args: ZanGetTokenHoldersCountRequest) {
      validateConfig(args, ZanGetTokenHoldersCountRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: 'zan_getTokenHoldersCount';
          params: [string];
        },
        ZanGetTokenHoldersCountResponse
      >({
        method: 'zan_getTokenHoldersCount',
        params: [args.tokenAddress],
      });
    },

    async zanGetTokenHolders(args: ZanGetTokenHoldersRequest) {
      validateConfig(args, ZanGetTokenHoldersRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: 'zan_getTokenHolders';
          params: [string, number, number];
        },
        ZanGetTokenHoldersResponse
      >({
        method: 'zan_getTokenHolders',
        params: [args.tokenAddress, args.pageSize, args.pageKey],
      });
    },

    async zanGetApprovalListByAddress(
      args: ZanGetApprovalListByAddressRequest,
    ) {
      validateConfig(args, ZanGetApprovalListByAddressRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: 'zan_getApprovalListByAddress';
          params: [string, string, number, number];
        },
        ZanGetApprovalListByAddressResponse
      >({
        method: 'zan_getApprovalListByAddress',
        params: [
          args.accountAddress,
          args.tokenType,
          args.pageSize,
          args.pageKey,
        ],
      });
    },

    async zanGetApprovalListByToken(args: ZanGetApprovalListByTokenRequest) {
      validateConfig(args, ZanGetApprovalListByTokenRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: 'zan_getApprovalListByToken';
          params: [string, number, number];
        },
        ZanGetApprovalListByTokenResponse
      >({
        method: 'zan_getApprovalListByToken',
        params: [args.tokenAddress, args.pageSize, args.pageKey],
      });
    },

    //  "method": "zan_getApprovalListByToken",
    // "params": [
    //   "0xdAC17F958D2ee523a2206206994597C13D831ec7", //Wallet Address
    //   10, //PageSize
    //   1//PageKey
    // ]

    // output: {
    //   pageSize: number,
    //   pageKey: number,
    //   items: Arrya<{
    //     approvedAddress: string,
    //     approvedAmount: string,
    //     blockNumber: number,
    //     blockTimestamp: number,
    //     owner:string,
    //     tokenStandard: string,
    //     transactionHash: string,
    //     type: string
    //   }>
    // }
  };
};
