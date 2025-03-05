# Zan SDK

## 项目简介

Zan SDK 是一个用于简化 Web3 开发的工具包。它提供了一系列功能，帮助开发者更轻松地与区块链进行交互。无论是与区块链节点的通信，还是与去中心化应用（DApp）进行交互，Zan SDK 都能提供强大的支持。

## 功能特性

- **区块链交互**: 简化与区块链节点的通信。
- **DApp 支持**: 提供与去中心化应用的无缝集成。

## 安装

使用 npm 安装 ZAN SDK：

```bash
npm install zan-sdk
```

或使用 yarn 安装：

```bash
yarn add zan-sdk
```

## 快速开始

以下是一个简单的示例，展示了如何使用 Zan SDK 和 Solana 交互：

首先到 ZAN 的官网获取到对应的 API Key.

```typescript
import { Solana } from "zan-sdk";

const solana = new Solana({
  endpoint: "https://api.zan.top/node/v1/solana/mainnet/{YOUR API KEY}",
});

solana.connection.getBlockHeight().then((res) => console.log(res));
```

## 文档

详细的文档和使用指南请访问 [Zan SDK 文档](https://example.com/docs)。

## 贡献

欢迎贡献代码！请阅读我们的 [贡献指南](https://example.com/contributing) 以了解更多信息。

## 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](./LICENSE) 文件。
