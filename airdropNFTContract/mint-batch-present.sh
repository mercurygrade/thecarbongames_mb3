#!/bin/bash
for i in {1..100}
  do
     near call $ID nft_mint '{"token_id": "nft-present-'$i'", "receiver_id": "'$ID'", "token_metadata": { "title": "The Present", "description": "Can carpooling slow down climate change? Yes!", "media": "https://bafybeigke2qqvxgc3yszduc2od3gp7soy2v7gw6i3iz53hehasg6n3abpq.ipfs.nftstorage.link/", "copies": 1000}}' --accountId $ID --deposit 0.1   
     echo "Deployed $i "
done