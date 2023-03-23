import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Row, Alert } from "react-bootstrap";
import { keys } from "regenerator-runtime";
import { login, logout } from "../utils";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";


const BN = require("bn.js");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN_NAME,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const MintingTool = (props) => {
   const [successMessage, setSuccessMessage] = useState("");
   const search = window.location.search;
   const params = new URLSearchParams(search);
   const mint_id = params.get("mint_id");

  useEffect(()=>{
    //login in user if not logged in.
     //logout();
    let hasTransactionHashes = document.URL.indexOf("transactionHashes") !== -1;
    if(hasTransactionHashes){
        //window.location="/success-page";
        setSuccessMessage("Congratulations! Your NFT has Minted successfully. You can close this page.")

    }else{
       
 
 
          if(  window.walletConnection.isSignedIn() ){
            //move to mint. 
            mintNFT();
          }
          else{
            //allow user select account 
            login();
          }
          
    }
    
    },[1])

  const mintNFT = async () => {

    //fetech data from firebase
         
    let docID = "";
    let metadata_description = null;
    let minted_status = null;
    let pool_id = null;
    let title = null;
    let IpfsHash = null; 

    try {

      const nftDetails = query(
        collection(db, "mints"),
        //where("mints.id", "==", mint_id)
      );
      const querySnapshot = await getDocs(nftDetails);
  

      querySnapshot.forEach((doc) => {
          docID = doc.id;
        if(docID == mint_id){
          //@ts-ignore
          let nftDetailsObj = doc.data();
           metadata_description = nftDetailsObj.metadata_description;
           minted_status = nftDetailsObj.minted_status;
           pool_id = nftDetailsObj.pool_id;
           IpfsHash = nftDetailsObj.IpfsHash;
           title = nftDetailsObj.title;

        }
      
      });      
      //@ts-ignore
      //update minted_status
      const mints_db = doc(db, "mints", mint_id);
      await updateDoc(mints_db, {
        minted_status: 'completed',
      });


    } catch (err) {
      console.log(err);
    }


     //await window.contract.new_default_meta({owner_id: window.accountId})
    
     //update this details from firebase
    await window.contract.nft_mint(
      {
        token_id: `${window.accountId}-${mint_id}go-team-token`,
        metadata: {
          title: title,
          description: metadata_description,
          media: `https://gateway.pinata.cloud/ipfs/${IpfsHash}`,
        },
        receiver_id: window.accountId,
      },
      300000000000000, // attached GAS (optional)
      new BN("1000000000000000000000000")
    );

    //window.location="https://wallet.testnet.near.org/?tab=collectibles";  //redirect to collectibles page
  };

  return (
    <Card style={{ padding: "2vh" }}>
      <Container>
        
        <p>{successMessage}</p>
      
      
      </Container>
    </Card>
  );
};

MintingTool.propTypes = {};

export default MintingTool;
