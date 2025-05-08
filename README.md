# ZAN SDK

## Introduction

ZAN SDK is a toolkit designed to simplify Web3 development. It provides a series of functions to help developers interact with blockchains more easily. Whether communicating with blockchain nodes or interacting with decentralized applications (DApps), ZAN SDK offers powerful support.

## Features

- **Blockchain Interaction**: Simplifies communication with blockchain nodes.
- **DApp Support**: Provides seamless integration with decentralized applications.

## Installation

Install ZAN SDK using npm:

```bash
npm install zan-sdk
```

Or using yarn:

```bash
yarn add zan-sdk
```

## Quick Start

Here's a simple example showing how to use ZAN SDK to interact with Solana and Ethereum:

First, obtain the corresponding API Key from [ZAN](https://zan.top/service/apikeys).

### Solana

```typescript
import { Solana } from 'zan-sdk';

const solana = new Solana({
  endpoint: 'https://api.zan.top/node/v1/solana/mainnet/{YOUR API KEY}',
});

solana.connection.getBlockHeight().then((res) => console.log(res));

// WSS
const solanaWss = new Solana({
  endpoint: 'https://api.zan.top/node/v1/solana/mainnet/{YOUR API KEY}',
  commitmentOrConfig: {
    wsEndpoint: 'wss://api.zan.top/node/ws/v1/solana/mainnet/{YOUR API KEY}',
    commitment: 'finalized',
  },
});

sol.connection.onSlotChange((info) => console.log(info));
```

### ETH

```typescript
import { Core } from 'zan-sdk';

const eth = new Core({
  endpoint: 'https://api.zan.top/node/v1/eth/mainnet/{YOUR API KEY}',
});

eth.client.getBlockNumber().then((blockNumber) => {
  console.log(blockNumber);
});

// Wss
import { CoreWss } from '@/core';

const wss = new CoreWss({
  endpoint:
    'wss://api.zan.top/node/ws/v1/eth/mainnet/d4cf825de2084a60a591da3c2cb641e1',
});

const unsubscribe = wss.client.watchBlockNumber({
  onBlockNumber: (block) => console.log(block),
});
```

### ZAN Advanced API

[ZAN Advanced API List](https://docs.zan.top/reference/zan_getnftmetadata-advanced)

```typescript
import { Core } from 'zan-sdk';

const eth = new Core({
  endpoint: 'https://api.zan.top/node/v1/eth/mainnet/{YOUR API KEY}',
});

eth.client
  .zanGetNftMetadata({
    contractAddress: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
  })
  .then((metadata) => {
    console.log(metadata);
  });
```

## Documentation

For detailed documentation and usage guides, visit [ZAN Documentation](https://docs.zan.top/reference/api-instructions).

## Contribution

Code contributions are welcome!
