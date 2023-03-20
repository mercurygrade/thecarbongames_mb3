const { exec } = require("child_process");


const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const { connect, KeyPair, utils, providers, Contract ,keyStores} = require("near-api-js");
import {
  keyStore,
  config,
  creatorAccountId,
  creatorAccountIdEvents,
} from "../config";
const admin = require("firebase-admin");
const db = getFirestore();
require("dotenv").config();

// creates a keyStore that searches for keys in .near-credentials
// requires credentials stored locally by using a NEAR-CLI command: `near login` 
// https://docs.near.org/tools/cli#near-login

const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
const myKeyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

export const loginCustomToken = async (req, res) => {
  try {
    let near_wallet = req.body.near_wallet;
    const results: any = [];
    await db
      .collection("users")
      .where("near_wallet.account_id", "==", near_wallet)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });
      });
    if (results.length == 0) {
      //not found
      res.send({
        status: "failed",
        data: null,
        error: `Wallet not found.`,
      });
    } else {
      //create custom token
      const firebaseToken = await admin.auth().createCustomToken(results[0].id);
      res.send({
        status: "success",
        data: {
          token: firebaseToken,
          user: results,
        },
        error: null,
      });
    }
  } catch (e) {
    res.send({
      status: "failed",
      data: null,
      error: `${e}`,
    });
  }
};
export const validateQRCode = (req, res) => {
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  res.send({
    data: `validate qr code ${latitude} ${longitude}`,
  });
};

//@abadoned
export const userAccountUpgrade = async (req, res) => {
  let walletname = req.body.walletname;
  let plan = req.body.plan;
  const near = await connect({ ...config, keyStore });
  const creatorAccount = await near.account(creatorAccountId);
  const keyPair = KeyPair.fromRandom("ed25519");
  const publicKey = keyPair.publicKey.toString();
  await keyStore.setKey(config.networkId, walletname, keyPair);
  // sends NEAR tokens
  const account = await near.account(walletname);
  await account.sendMoney(
    creatorAccountId, // receiver account
    "5000000000000000000000000" // amount in yoctoNEAR
  );
  res.send({ message: `Make payment in $NEAR ${walletname} and ${plan}` });
};

export const addEvent = async (req, res) => {
  let event_id = req.body.event_id;
  let title = req.body.title;
  let description = req.body.description;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;

  exec(
    `near call ${creatorAccountIdEvents} add_event '{"event_id": "${event_id}", "title":"${title}", "description":"${description}", "latitude":"${latitude}", "longitude":"${longitude}"}' --accountId ${creatorAccountIdEvents}`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!stderr) {
        let cleanResponse = stdout;
        res.json({
          status: "success",
          data: cleanResponse,
          error: null,
        });
      } else {
        res.send({
          status: "failed",
          data: null,
          error: stderr,
        });
      }
    }
  );
};

export const disburseFunds = async (req, res) => {
  
  const connectionConfig = {
    networkId: "testnet",
    keyStore: myKeyStore, // first create a key store 
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  const nearConnection = await connect(connectionConfig);
  const account = await nearConnection.account(process.env.BOUNTRY_CONTRACT_NAME);
 
  const contract = new Contract(
    account, // the account object that is connecting
    process.env.BOUNTRY_CONTRACT_NAME,
    {
      // name of contract you're connecting to
      viewMethods: ["list_all_bounties","list_all_added_bounty_claim"], // view methods do not change state but usually return a value
      changeMethods: ["add_bounty"], // change methods modify state
    }
  );
  //const responseAllBounties = await contract.list_all_bounties(); --Testnet throwing much error.
  //get amount from the events 
  const responseAllClaims = await contract.list_all_added_bounty_claim();
  
  let wallets = [];
  let event_ids =[];
  //split among wallet N1 for now. 
  responseAllClaims.map((item, index)=>{
      wallets.push(item.claimant) //wallets to recieve funds
      event_ids.push(item.event_id)// 
      //send 1N to the wallet -- this should change to bounties list later
       account.sendMoney(
        item.claimant, // receiver account
        "1000000000000000000000000" // amount in yoctoNEAR
      );
  })
  res.json({
    status: "success",
    message:"disbursement has been sent to the qualified wallet addresses",
    data: responseAllClaims,
    error: null,
  });
 

  //update event disbursed status 
  //TODO:: Mike add disbursed column to firebase

}
