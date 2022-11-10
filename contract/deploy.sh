#!/bin/sh

./build.sh

echo ">> Deploying contract"

near deploy --accountId v4.thecarbongames-events-10.testnet --wasmFile ./target/wasm32-unknown-unknown/release/contract.wasm