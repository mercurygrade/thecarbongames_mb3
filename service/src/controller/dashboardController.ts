const { getFirestore, Timestamp, FieldValue, } = require('firebase-admin/firestore');
const { connect, KeyPair, utils ,providers,Contract} = require("near-api-js");
import {keyStore,config, creatorAccountId,creatorAccountIdEvents } from "../config";
const admin = require("firebase-admin");
const db = getFirestore();
require("dotenv").config();
export const loginCustomToken = async (req, res) =>{
        let near_wallet = req.body.near_wallet;
        const results :any = [];
        await db
            .collection("users")
            .where("near_wallet.account_id", "==", near_wallet)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  results.push(doc.data());
                });
            });
            if(results.length == 0){
                    //not found 
                    res.send({
                        status:'failed',
                        data:null,
                        error:`Wallet not found.`,
                        })
            }
            else{
                  //create custom token
                   const firebaseToken = await admin.auth().createCustomToken(results[0].id);
                  res.send({
                        status:'success',
                        data:{
                              token:firebaseToken,
                              user: results
                        },
                        error:null,
                        })
            }         
}
export const validateQRCode = (req, res) =>{
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  res.send({
    data:`validate qr code ${latitude} ${longitude}`
  });
}

//@abadoned
export const userAccountUpgrade = async (req, res) =>{
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
  res.send({message:`Make payment in $NEAR ${walletname} and ${plan}`})
}

export const addEvent = async (req,res) =>{

  let event_id = req.body.event_id;
  let title = req.body.title;
  let description = req.body.description;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;

  const near = await connect({ ...config, keyStore });
  const creatorAccount = await near.account(creatorAccountIdEvents);
  const keyPair = KeyPair.fromRandom("ed25519");
  const publicKey = keyPair.publicKey.toString();
  await keyStore.setKey(config.networkId, creatorAccountIdEvents, keyPair);
  const contract = new Contract(
    creatorAccountIdEvents,
    creatorAccountIdEvents,
    {
        viewMethods: ["get_events"],
        changeMethods: ["add_event"],
    }
    );
     //@ts-ignore
     await contract.add_event({
      callbackUrl: '', // callbackUrl after the transaction approved (optional)
      meta: `meta=`, // meta information NEAR Wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url param
      args: {
        event_id:event_id,
        title:title,
        description:description,
        latitude:latitude,
        longitude:longitude
      },
      gas: 300000000000000, // attached GAS (optional)
      //@ts-ignore
      amount: `1000000000000000000000000` // attached deposit in yoctoNEAR (optional)
    }
    );
  res.send({
    message:"add-event"
  })
}