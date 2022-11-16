#!/bin/sh

./build.sh

echo ">> Deploying contract"

near deploy --accountId v7.tcgevent.testnet  --wasmFile ./target/wasm32-unknown-unknown/release/contract.wasm