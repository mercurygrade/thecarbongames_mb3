#!/bin/sh

./build.sh

echo ">> Deploying contract"

near deploy --accountId tcg-contracts.testnet  --wasmFile ./target/wasm32-unknown-unknown/release/contract.wasm