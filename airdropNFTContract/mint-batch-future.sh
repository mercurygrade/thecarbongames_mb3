#!/bin/bash
for i in {1..200}
  do
    near call $ID nft_mint '{"token_id": "nft-future-'$i'", "receiver_id": "'$ID'", "token_metadata": { "title": "The Future", "description": "The Future: isnt this what we all want? A beautiful green planet!", "media": "https://bafybeiampec6bugmbsvdvudfkay7cr3e3h3fbshckajgipzvssjzasfgay.ipfs.nftstorage.link/", "copies": 1000}}' --accountId $ID --deposit 0.1
     echo "Deployed $i "
done