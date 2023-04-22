#!/bin/bash
for i in {1..100}
  do
     near call $ID nft_mint '{"token_id": "nft-'$i'", "receiver_id": "'$ID'", "token_metadata": { "title": "The Past", "description": "You know what we dont need more of? Yes, wheels. They are everywhere", "media": "https://bafybeigmvwtjrtfgztn7t6ybe6jsqsnaqkb3weda5tfyddjahwtw2ezcma.ipfs.nftstorage.link/", "copies": 1000}}' --accountId $ID --deposit 0.1
     echo "Deployed $i "
done