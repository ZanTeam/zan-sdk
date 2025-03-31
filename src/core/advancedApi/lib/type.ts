import { RpcSchemaOverride } from "viem";
import {
  ZanNftMetaDataMethod,
  ZanNftMetaDataRequest,
  ZanNftMetaDataResponse,
} from "./schema/zan_getNftMetaData";
import { ZanNftByOwnerMethod, ZanNftByOwnerRequest, ZanNftByOwnerResponse } from "./schema/zan_getNftsByOwner";
import { ZanNftIDsMethod, ZanNftIDsRequest, ZanNftIDsResponse } from "./schema/zan_getNftIDs";
import { ZanVerifyNFTHolderMethod, ZanVerifyNFTHolderRequest, ZanVerifyNFTHolderResponse } from "./schema/zan_verifyNFTHolder";
import { ZanGetNFTHoldersMethod, ZanGetNFTHoldersRequest, ZanGetNFTHoldersResponse } from "./schema/zan_getNFTHolders";
import { ZanGetNftIDHoldersMethod, ZanGetNftIDHoldersRequest, ZanGetNftIDHoldersResponse } from "./schema/zan_getNftIDHolders";
import { ZanGetNftCollectionHoldersMethod, ZanGetNftCollectionHoldersRequest, ZanGetNftCollectionHoldersResponse } from "./schema/zan_getNftCollectionHolders";
import { ZanGetNftTransfersMethod, ZanGetNftTransfersRequest, ZanGetNftTransfersResponse } from "./schema/zan_getNftTransfers";
import { ZanGetTokenMetadataMethod, ZanGetTokenMetadataRequest, ZanGetTokenMetadataResponse } from "./schema/zan_getTokenMetadata";
import { ZanGetTokenBalanceByOwnerMethod, ZanGetTokenBalanceByOwnerRequest, ZanGetTokenBalanceByOwnerResponse } from "./schema/zan_getTokenBalanceByOwner";
import { ZanGetTokensByOwnerMethod, ZanGetTokensByOwnerRequest, ZanGetTokensByOwnerResponse } from "./schema/zan_getTokensByOwner";
import { ZanGetTokenHoldersCountMethod, ZanGetTokenHoldersCountRequest, ZanGetTokenHoldersCountResponse } from "./schema/zan_getTokenHoldersCount";
import { ZanGetTokenHoldersMethod, ZanGetTokenHoldersRequest, ZanGetTokenHoldersResponse } from "./schema/zan_getTokenHolders";
import { ZanGetApprovalListByAddressMethod, ZanGetApprovalListByAddressRequest, ZanGetApprovalListByAddressResponse } from "./schema/zan_getApprovalListByAddress";
import { ZanGetApprovalListByTokenMethod, ZanGetApprovalListByTokenRequest, ZanGetApprovalListByTokenResponse } from "./schema/zan_getApprovalListByToken";

type ZanNftMethods = [ZanNftMetaDataMethod];
type ZanNftByOwnerMethods = [ZanNftByOwnerMethod];
type ZanNftIDsMethods = [ZanNftIDsMethod];
type ZanVerifyNFTHolderMethods = [ZanVerifyNFTHolderMethod];
type ZanGetNFTHoldersMethods = [ZanGetNFTHoldersMethod];
type ZanGetNftIDHoldersMethods = [ZanGetNftIDHoldersMethod];
type ZanGetNftCollectionHoldersMethods = [ZanGetNftCollectionHoldersMethod];
type ZanGetNftTransfersMethods = [ZanGetNftTransfersMethod];
type ZanGetTokenMetadataMethods = [ZanGetTokenMetadataMethod];
type ZanGetTokenBalanceByOwnerMethods = [ZanGetTokenBalanceByOwnerMethod];
type ZanGetTokensByOwnerMethods = [ZanGetTokensByOwnerMethod];
type ZanGetTokenHoldersCountMethods = [ZanGetTokenHoldersCountMethod];
type ZanGetTokenHoldersMethods = [ZanGetTokenHoldersMethod];
type ZanGetApprovalListByAddressMethods = [ZanGetApprovalListByAddressMethod];
type ZanGetApprovalListByTokenMethods = [ZanGetApprovalListByTokenMethod];

export type ZanNftSchema = RpcSchemaOverride & ZanNftMethods & ZanNftByOwnerMethods & ZanNftIDsMethods & ZanVerifyNFTHolderMethods & ZanGetNFTHoldersMethods & ZanGetNftIDHoldersMethods & ZanGetNftCollectionHoldersMethods & ZanGetNftTransfersMethods & ZanGetTokenMetadataMethods & ZanGetTokenBalanceByOwnerMethods & ZanGetTokensByOwnerMethods & ZanGetTokenHoldersCountMethods & ZanGetTokenHoldersMethods & ZanGetApprovalListByAddressMethods & ZanGetApprovalListByTokenMethods;

export type ZanNftAndTokenActions = {
  zanGetNftMetadata: (
    args: ZanNftMetaDataRequest
  ) => Promise<ZanNftMetaDataResponse>;
  zanGetNftsByOwner: (
    args: ZanNftByOwnerRequest
  ) => Promise<ZanNftByOwnerResponse>;
  zanGetNftIDs: (
    args: ZanNftIDsRequest
  ) => Promise<ZanNftIDsResponse>;
  zanVerifyNFTHolder: (
    args: ZanVerifyNFTHolderRequest
  ) => Promise<ZanVerifyNFTHolderResponse>;
  zanGetNFTHolders: (
    args: ZanGetNFTHoldersRequest
  ) => Promise<ZanGetNFTHoldersResponse>;
  zanGetNftIDHolders: (
    args: ZanGetNftIDHoldersRequest
  ) => Promise<ZanGetNftIDHoldersResponse>;
  zanGetNftCollectionHolders: (
    args: ZanGetNftCollectionHoldersRequest
  ) => Promise<ZanGetNftCollectionHoldersResponse>;
  zanGetNftTransfers: (
    args: ZanGetNftTransfersRequest
  ) => Promise<ZanGetNftTransfersResponse>;
  zanGetTokenMetadata: (
    args: ZanGetTokenMetadataRequest
  ) => Promise<ZanGetTokenMetadataResponse>;
  zanGetTokenBalanceByOwner: (
    args: ZanGetTokenBalanceByOwnerRequest
  ) => Promise<ZanGetTokenBalanceByOwnerResponse>;
  zanGetTokensByOwner: (
    args: ZanGetTokensByOwnerRequest
  ) => Promise<ZanGetTokensByOwnerResponse>;
  zanGetTokenHoldersCount: (
    args: ZanGetTokenHoldersCountRequest
  ) => Promise<ZanGetTokenHoldersCountResponse>;
  zanGetTokenHolders: (
    args: ZanGetTokenHoldersRequest
  ) => Promise<ZanGetTokenHoldersResponse>;
  zanGetApprovalListByAddress: (
    args: ZanGetApprovalListByAddressRequest
  ) => Promise<ZanGetApprovalListByAddressResponse>;
  zanGetApprovalListByToken: (
    args: ZanGetApprovalListByTokenRequest
  ) => Promise<ZanGetApprovalListByTokenResponse>;
};
