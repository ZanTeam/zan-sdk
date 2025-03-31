import { Client } from "viem";
import {
  ZanNftMetaDataRequest,
  ZanNftMetaDataRequestSchema,
  ZanNftMetaDataResponse,
} from "./lib/schema/zan_getNftMetaData";
import { ZanNftSchema } from "./lib/type";
import { ZanNftByOwnerRequest, ZanNftByOwnerRequestSchema, ZanNftByOwnerResponse } from "./lib/schema/zan_getNftsByOwner";
import { ZanNftIDsRequest, ZanNftIDsRequestSchema, ZanNftIDsResponse } from "./lib/schema/zan_getNftIDs";
import { ZanVerifyNFTHolderRequest, ZanVerifyNFTHolderRequestSchema, ZanVerifyNFTHolderResponse } from "./lib/schema/zan_verifyNFTHolder";
import { ZanGetNFTHoldersRequest, ZanGetNFTHoldersRequestSchema, ZanGetNFTHoldersResponse } from "./lib/schema/zan_getNFTHolders";
import { ZanGetNftIDHoldersRequest, ZanGetNftIDHoldersRequestSchema, ZanGetNftIDHoldersResponse } from "./lib/schema/zan_getNftIDHolders";
import { ZanGetNftCollectionHoldersRequest, ZanGetNftCollectionHoldersRequestSchema, ZanGetNftCollectionHoldersResponse } from "./lib/schema/zan_getNftCollectionHolders";
import { ZanGetNftTransfersRequest, ZanGetNftTransfersRequestSchema, ZanGetNftTransfersResponse } from "./lib/schema/zan_getNftTransfers";
import { validateConfig } from "./lib/utils";

export const ntfEvmActions = (client: Client) => {
  return {
    async zanGetNftMetadata(args: ZanNftMetaDataRequest) {
      validateConfig(args, ZanNftMetaDataRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: "zan_getNFTMetadata";
          params: [string];
        },
        ZanNftMetaDataResponse
      >({
        method: "zan_getNFTMetadata",
        params: [args.contractAddress],
      });
    },

    
    async zanGetNftsByOwner(args: ZanNftByOwnerRequest) {
      validateConfig(args, ZanNftByOwnerRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: "zan_getNFTsByOwner";
          params: [string, string, number, number];
        },
        ZanNftByOwnerResponse
      >({
        method: "zan_getNFTsByOwner",
        params: [args.walletAddress, args.tokenType, args.pageSize, args.pageKey],
      });
    },

    async zanGetNftIDs(args: ZanNftIDsRequest) {
      validateConfig(args, ZanNftIDsRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: "zan_getNftIDs";
          params: [string, number];
        },
        ZanNftIDsResponse
      >({
        method: "zan_getNftIDs",
        params: [args.contractAddress, args.topN],
      });
    },

    async zanVerifyNFTHolder(args: ZanVerifyNFTHolderRequest) {
      validateConfig(args, ZanVerifyNFTHolderRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: "zan_verifyNFTHolder";
          params: [string, string, string[]];
        },
        ZanVerifyNFTHolderResponse
      >({
        method: "zan_verifyNFTHolder",
        params: [args.accountAddress, args.tokenType, args.contracts],
      });
    },

    async zanGetNFTHolders(args: ZanGetNFTHoldersRequest) {
      validateConfig(args, ZanGetNFTHoldersRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: "zan_getNFTHolders";
          params: [string, number];
        },
        ZanGetNFTHoldersResponse
      >({
        method: "zan_getNFTHolders",
        params: [args.contractAddress, args.topN],
      });
    },

    async zanGetNftIDHolders(args: ZanGetNftIDHoldersRequest) {
      validateConfig(args, ZanGetNftIDHoldersRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: "zan_getNftIDHolders";
          params: [string, string, string];
        },
        ZanGetNftIDHoldersResponse
      >({
        method: "zan_getNftIDHolders",
        params: [args.contractAddress, args.tokenId, args.tokenType],
      });
    },

    async zanGetNftCollectionHolders(args: ZanGetNftCollectionHoldersRequest) {
      validateConfig(args, ZanGetNftCollectionHoldersRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: "zan_getNftCollectionHolders";
          params: [string, string, number, number];
        },
        ZanGetNftCollectionHoldersResponse
      >({
        method: "zan_getNftCollectionHolders",
        params: [args.contractAddress, args.tokenType, args.pageSize, args.pageKey],
      });
    },

    async zanGetNftTransfers(args: ZanGetNftTransfersRequest) {
      validateConfig(args, ZanGetNftTransfersRequestSchema);
      return await client.request<
        ZanNftSchema,
        {
          method: "zan_getNftTransfers";
          params: [string, number, number, string?, string?];
        },
        ZanGetNftTransfersResponse
      >({
        method: "zan_getNftTransfers",
        params: [args.contractAddress, args.pageSize, args.pageKey, args.fromBlock, args.toBlock],
      });
    }
  };

};
