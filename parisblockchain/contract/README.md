# nft-mint-frontend Smart Contract

A [smart contract] written in [Rust] for an app initialized with [create-near-app]

# Quick Start

Before you compile this code, you will need to install Rust with [correct target]

# Exploring The Code

1. The main smart contract code lives in `src/lib.rs`. You can compile it with
   the `./compile` script.
2. Tests: You can run smart contract tests with the `./test` script. This runs
   standard Rust tests using [cargo] with a `--nocapture` flag so that you
   can see any debug info you print to the console.

# Contract Interaction snippet : List NFT

```js
let walletConnection = new WalletConnection(nearConnection, null);
const account = await nearConnection.account(walletConnection.getAccountId());
const contract = new Contract(walletConnection.account(), ContractName, {
  viewMethods: ["nft_tokens"],
});

//interact with the event smart contract
await contract.nft_tokens({ from_index: 0, limit: 40 });
```

//the above will list all minted nfts to the marketplace.

# Contract Interaction snippet : Purchase NFT

```js
const contract = new Contract(
  account, // the account object that is connecting
  NFT1_CONTRACT_ID,
  {
    changeMethods: ["offer"],
  }
);
const contractApprove = await contract.offer({
  contractId: NFT1_MARKETPLACE_CONTRACT_ID,
  args: {
    token_id: token_id,
    nft_contract_id: NFT1_CONTRACT_ID,
  },
  gas: 300000000000000, // attached GAS (optional)
  amount: utils.format.parseNearAmount(AMOUNT),
});
```
