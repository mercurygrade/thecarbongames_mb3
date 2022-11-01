import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect } from "react";
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
const UpgradeAccountCompleted = (props: any) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const signMeta = params.get("signMeta");
  useEffect(() => {
    UpdateUserInfo();
  }, [1]);
  const UpdateUserInfo = async () => {
    let parsequery = signMeta?.split("userWallet=")[1];
    let getWallet = parsequery?.split("|")[0];
    let getPlanType = parsequery?.split("|")[1];
    let redirect = parsequery?.split("|")[3];
    try {
      const q = query(
        collection(db, "users"),
        where("near_wallet.account_id", "==", `${getWallet}`)
      );
      const querySnapshot = await getDocs(q);
      let docID = "";
      querySnapshot.forEach((doc) => {
        docID = doc.id;
      });
      const user = doc(db, "users", docID);
      await updateDoc(user, {
        plan_type: [`${getPlanType}`],
        selected_plan_type: `${getPlanType}`,
      });
    } catch (err) {}
  };
  return (
    <>
      <div className="text-center">
        <div className="checkmark">
          <svg
            className="star"
            height="19"
            viewBox="0 0 19 19"
            width="19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"></path>
          </svg>
          <svg
            className="star"
            height="19"
            viewBox="0 0 19 19"
            width="19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"></path>
          </svg>
          <svg
            className="star"
            height="19"
            viewBox="0 0 19 19"
            width="19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"></path>
          </svg>
          <svg
            className="star"
            height="19"
            viewBox="0 0 19 19"
            width="19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"></path>
          </svg>
          <svg
            className="star"
            height="19"
            viewBox="0 0 19 19"
            width="19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"></path>
          </svg>
          <svg
            className="star"
            height="19"
            viewBox="0 0 19 19"
            width="19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"></path>
          </svg>
          <svg
            className="checkmark__check"
            height="36"
            viewBox="0 0 48 36"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M47.248 3.9L43.906.667a2.428 2.428 0 0 0-3.344 0l-23.63 23.09-9.554-9.338a2.432 2.432 0 0 0-3.345 0L.692 17.654a2.236 2.236 0 0 0 .002 3.233l14.567 14.175c.926.894 2.42.894 3.342.01L47.248 7.128c.922-.89.922-2.34 0-3.23"></path>
          </svg>
          <svg
            className="checkmark__background"
            height="115"
            viewBox="0 0 120 115"
            width="120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M107.332 72.938c-1.798 5.557 4.564 15.334 1.21 19.96-3.387 4.674-14.646 1.605-19.298 5.003-4.61 3.368-5.163 15.074-10.695 16.878-5.344 1.743-12.628-7.35-18.545-7.35-5.922 0-13.206 9.088-18.543 7.345-5.538-1.804-6.09-13.515-10.696-16.877-4.657-3.398-15.91-.334-19.297-5.002-3.356-4.627 3.006-14.404 1.208-19.962C10.93 67.576 0 63.442 0 57.5c0-5.943 10.93-10.076 12.668-15.438 1.798-5.557-4.564-15.334-1.21-19.96 3.387-4.674 14.646-1.605 19.298-5.003C35.366 13.73 35.92 2.025 41.45.22c5.344-1.743 12.628 7.35 18.545 7.35 5.922 0 13.206-9.088 18.543-7.345 5.538 1.804 6.09 13.515 10.696 16.877 4.657 3.398 15.91.334 19.297 5.002 3.356 4.627-3.006 14.404-1.208 19.962C109.07 47.424 120 51.562 120 57.5c0 5.943-10.93 10.076-12.668 15.438z"></path>
          </svg>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={() => {
            window.close();
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-10"
        >
          Close
        </button>
      </div>
    </>
  );
};
export default UpgradeAccountCompleted;
