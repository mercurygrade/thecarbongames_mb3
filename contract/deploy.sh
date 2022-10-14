#!/bin/sh

./build.sh

echo ">> Deploying contract"

near deploy --accountId thecarbongames2.testnet --wasmFile ./target/wasm32-unknown-unknown/release/contract.wasm
