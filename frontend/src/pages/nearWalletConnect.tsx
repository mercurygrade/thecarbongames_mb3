import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { BaseWebAppURL} from "config/config";
import {NEARLogin} from "utils"
const NearWalletConnect = () => {
  useEffect(() => {
    let redirect =  `${BaseWebAppURL}/near-wallet-success`;
    NEARLogin("Connect Wallet to The Carbon Games", redirect);
  }, [1]);
  return (
    <div className="text-center">
      <ClipLoader color={"green"} loading={true} size={150} />
    </div>
  );
};
export default NearWalletConnect;
