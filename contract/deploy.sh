#!/bin/sh

./build.sh

echo ">> Deploying contract"

near deploy --accountId carbongames-events1.testnet --wasmFile ./target/wasm32-unknown-unknown/release/contract.wasm
