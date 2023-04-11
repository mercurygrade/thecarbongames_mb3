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

let walletConnection = new WalletConnection(nearConnection, null);
const account = await nearConnection.account(walletConnection.getAccountId());
const contract = new Contract(walletConnection.account(), paymentContractName, {
viewMethods: ["nft_tokens"]
});

//interact with the event smart contract
await contract.nft_tokens(from_index, limit);

//the above will list all minted nfts to the marketplace.

# Contract Interaction snippet : Purchase NFT
