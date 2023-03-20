import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Row, Alert } from "react-bootstrap";
import { keys } from "regenerator-runtime";
import { login, logout } from "../utils";
 
const BN = require("bn.js");

const MintingTool = (props) => {
   const [successMessage, setSuccessMessage] = useState("");

  
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
    // run once for deployment
    //await window.contract.new_default_meta({owner_id: window.accountId})

    //update this details from firebase
    await window.contract.nft_mint(
      {
        token_id: `${window.accountId}-go-team-token`,
        metadata: {
          title: "Mid journey carbongames",
          description: "Mint c02 proof :)",
          media:
            "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
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
