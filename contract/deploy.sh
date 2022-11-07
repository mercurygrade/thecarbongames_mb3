#!/bin/sh

./build.sh

echo ">> Deploying contract"

near deploy --accountId v14.thecarbongames-events-14.testnet --wasmFile ./target/wasm32-unknown-unknown/release/contract.wasm