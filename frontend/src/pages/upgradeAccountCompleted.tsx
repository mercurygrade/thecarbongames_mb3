import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { useEffect } from 'react';
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
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const UpgradeAccountCompleted = (props:any) => {  
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const signMeta = params.get('signMeta');
  useEffect(()=>{
    UpdateUserInfo();
  },[1]);
  const UpdateUserInfo = async ()=> {
    let parsequery = signMeta?.split("userWallet=")[1];
    let getWallet = parsequery?.split("|")[0];
    let getPlanType = parsequery?.split("|")[1];

    try{
      const q = query(collection(db, "users"), where("near_wallet.account_id", "==", `${getWallet}`));
      const querySnapshot = await getDocs(q);
      let docID = '';
      querySnapshot.forEach((doc) => {
        docID = doc.id;
      });
      const user = doc(db, "users", docID);
      await updateDoc(user, {
          plan_type: [`${getPlanType}`],
      });
    }catch(err){
    }
}
return (
    <div className="text-center">
    <p>Account Upgraded Successfully</p>
    </div>
  )
}
export default UpgradeAccountCompleted;