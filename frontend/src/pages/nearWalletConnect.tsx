import React, { useEffect } from "react"
import * as nearAPI from "near-api-js"
import ClipLoader from "react-spinners/ClipLoader";  
const NearWalletConnect = () => {  
    useEffect(()=>{NEARLogin()},[1])
    const NEARLogin = async ()=>{
         const { connect, keyStores,WalletConnection } = nearAPI
        const connectionConfig:any = {  
          networkId: "testnet",
          keyStore: new keyStores.BrowserLocalStorageKeyStore(), 
          nodeUrl: "https://rpc.testnet.near.org",
          walletUrl: "https://wallet.testnet.near.org",
          helperUrl: "https://helper.testnet.near.org",
          explorerUrl: "https://explorer.testnet.near.org",
        };
        // connect to NEAR
        const nearConnection:any = await connect(connectionConfig);
        const walletConnection = new WalletConnection(nearConnection,null);
        walletConnection.requestSignIn(
          "thecarbongames.testnet", // contract requesting access
          "", // optional title
          "https://thecarbongames.web.app/near-wallet-success", // optional redirect URL on success
          "" // optional redirect URL on failure
        )
      }
  return(
    <div className="text-center">
    <ClipLoader color={"green"} loading={true} size={150} />
    </div>
  )
}
export default NearWalletConnect;