import React, { useEffect } from "react"
import * as nearAPI from "near-api-js"
 
import { connectionConfig, paymentContractName } from "config/config";
import ClipLoader from "react-spinners/ClipLoader";  
const UpgradeAccount = () => {  

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const plan_type = params.get('plan_type');
  const priceUSD = params.get('priceUSD');

  useEffect(()=>{
    if(plan_type == null || priceUSD == null){

    }
    else{
      NEARLogin()
    }
 
  },[1])
  const NEARLogin = async ()=>{
 
    
        const { connect,WalletConnection } = nearAPI
        // connect to NEAR
        const nearConnection:any = await connect(connectionConfig);
        const walletConnection = new WalletConnection(nearConnection,null);
        walletConnection.requestSignIn(
          paymentContractName, // contract requesting access
          "The Carbongames Account Upgrade", // optional title
          `https://thecarbongames.web.app/upgrade-account-success?plan_type=${plan_type}&priceUSD=${priceUSD}`, // optional redirect URL on success
          "" // optional redirect URL on failure
        )
      }
  return(
    <div className="text-center">
      
     <ClipLoader color={"green"} loading={true} size={150} />
    </div>
  )
}
export default UpgradeAccount;