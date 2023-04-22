#!/bin/bash
for i in {1..100}
  do
     near call $ID nft_mint '{"token_id": "nft-check-in-'$i'", "receiver_id": "'$ID'", "token_metadata": { "title": "Event Check In", "description": "", "media": "https://gateway.pinata.cloud/ipfs/QmXEHUt7Pcee6grZo1NYEMRoELKpK1vL5NEW1Xxm58DXwz?_gl=1*19q8n3w*rs_ga*MmM4MmIwYzUtYjYxMy00ZDI3LWIzZjAtZTk5Yzc5MWVhOWFm*rs_ga_5RMPXG14TE*MTY4MTg2Mzk3MC4xLjEuMTY4MTg2Mzk4My40Ny4wLjA.", "copies": 1000}}' --accountId $ID --deposit 0.1   
     echo "Deployed $i "
done