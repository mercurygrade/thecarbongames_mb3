const { getFirestore, Timestamp, FieldValue, } = require('firebase-admin/firestore');
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