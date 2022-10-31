#!/bin/sh

./build.sh

echo ">> Deploying contract"

near deploy --accountId thecarbongames-events-4.testnet --wasmFile ./target/wasm32-unknown-unknown/release/contract.wasm
