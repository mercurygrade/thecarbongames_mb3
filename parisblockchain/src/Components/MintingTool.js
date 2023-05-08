import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Row, Alert } from "react-bootstrap";
import { keys } from "regenerator-runtime";
import { login, logout } from "../utils";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Contract
} from "near-api-js";
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
   const [country_code, setCountryCode] = useState("");
   const [number, setNumber] = useState("");
   const [counter, setCounter] = useState(0);

  useEffect(()=>{
    //login in user if not logged in.
     //logout();

     localStorage.removeItem('counter');
     setTimeout(()=>{
      let hasTransactionHashes = document.URL.indexOf("transactionHashes") !== -1;
      const counter_value =  localStorage.getItem('counter');
  
      if(counter_value == 1){
        //window.location="/success-page";
      setSuccessMessage("You will be redirected for pre-approval of your minted nft in few seconds....");
      setNFTApproval();
      }
      else if(counter_value == 0 || counter_value == null ){
            if(  window.walletConnection.isSignedIn() ){
              //move to mint. 
              mintNFT();
            }
            else{
              //allow user select account 
              login();
            }
      }
      else{
  
      }

     }, 3000)
    
    },[1])


  const setNFTApproval = async () => {
    await localStorage.setItem("counter",2);

       const getToken_id_value = await localStorage.getItem('token_id_value');
    
        //set Approval 
        const contract = new Contract(
          window.walletConnection.account(), // the account object that is connecting
          process.env.NFT1_OWNER_ID,
          {
            changeMethods: ["nft_approve"]
          });
    
       let minimum_balance = await  window.walletConnection.account()
          .viewFunction( process.env.NFT1_OWNER_ID_MARKETPLACE, "storage_minimum_balance")
        let minimum = minimum_balance;
        await  window.walletConnection.account().functionCall({
        contractId: process.env.NFT1_OWNER_ID_MARKETPLACE,
        methodName: "storage_deposit",
        args: {},
        attachedDeposit: minimum,
        });
      
      let sale_conditions = {
        sale_conditions: '1',
      };
      await contract.nft_approve(
        {
          callbackUrl: `https://www.thecarbongames.com/completed`,
          contractId: process.env.NFT1_OWNER_ID,
          args: {
            token_id: `${getToken_id_value}`,
            account_id: process.env.NFT1_OWNER_ID_MARKETPLACE,
            msg: JSON.stringify(sale_conditions),
          },
          gas: 300000000000000, // attached GAS (optional)
          amount: utils.format.parseNearAmount("1") //utils.format.parseNearAmount("10")
        }
      );
    
    window.location="/completed";

  }
  const mintNFT = async () => {
     //fetech data from firebase
     await localStorage.setItem("counter",1);
         
    let docID = "";
    let metadata_description = null;
    let minted_status = null;
    let pool_id = null;
    let title = null;
    let IpfsHash = null; 

    let country_code = null;
    let number = null;

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
          console.log(nftDetailsObj);
           metadata_description = nftDetailsObj.metadata_description;
           minted_status = nftDetailsObj.minted_status;
           pool_id = nftDetailsObj.pool_id;
           IpfsHash = nftDetailsObj.IpfsHash;
           country_code = nftDetailsObj.country_code;
           number = nftDetailsObj.number;
           title = nftDetailsObj.title;


          //  setCountryCode(nftDetailsObj.country_code);
          //  setNumber(nftDetailsObj.number);

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

    let token_id_value = `GH6900`;//`${country_code}${number}_16`;    

     await localStorage.setItem("token_id_value",token_id_value);
 
 
 
    //update this details from firebase
    await window.contract.nft_mint(
      {
        token_id: token_id_value,   //`${window.accountId}-${mint_id}go-team-token`,
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
