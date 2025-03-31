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

type ZanNftMethods = [ZanNftMetaDataMethod];
type ZanNftByOwnerMethods = [ZanNftByOwnerMethod];
type ZanNftIDsMethods = [ZanNftIDsMethod];
type ZanVerifyNFTHolderMethods = [ZanVerifyNFTHolderMethod];
type ZanGetNFTHoldersMethods = [ZanGetNFTHoldersMethod];
type ZanGetNftIDHoldersMethods = [ZanGetNftIDHoldersMethod];
type ZanGetNftCollectionHoldersMethods = [ZanGetNftCollectionHoldersMethod];
type ZanGetNftTransfersMethods = [ZanGetNftTransfersMethod];

export type ZanNftSchema = RpcSchemaOverride & ZanNftMethods & ZanNftByOwnerMethods & ZanNftIDsMethods & ZanVerifyNFTHolderMethods & ZanGetNFTHoldersMethods & ZanGetNftIDHoldersMethods & ZanGetNftCollectionHoldersMethods & ZanGetNftTransfersMethods;

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
};
