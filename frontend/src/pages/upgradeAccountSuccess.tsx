import * as nearAPI from "near-api-js"
import {useEffect, useState} from 'react';
import { connectionConfig, paymentContractName} from "config/config";
import ClipLoader from "react-spinners/ClipLoader";  
const UpgradeAccountSuccess = (props:any) =>{  
  useEffect(()=>{
    processPayment()
  },[1]);
  const processPayment = async ()=>{
    try {
    const { connect,WalletConnection,Contract } = nearAPI
    const nearConnection:any = await connect(connectionConfig);
    let walletConnection = new WalletConnection(nearConnection,null);
    const account = await nearConnection.account(walletConnection.getAccountId())
    const contract = new Contract(
    walletConnection.account(),
    paymentContractName,
    {
        viewMethods: ["get_payments"],
        changeMethods: ["payment"],
      }
    );
    //@ts-ignore
    await contract.payment(
      {
        callbackUrl: 'https://thecarbongames.web.app/upgrade-completed', // callbackUrl after the transaction approved (optional)
        meta: `userWallet=${walletConnection.getAccountId()}|event_manager|`, // meta information NEAR Wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url param
        args: {},
        gas: 300000000000000, // attached GAS (optional)
        amount: "1000000000000000000000000" // attached deposit in yoctoNEAR (optional)
      }
    );
  }
    catch (err) {
      throw err;
    }
  }
  //{ args, methodName, gas, amount, meta, callbackUrl })
  return (
    <div className="text-center">
    <ClipLoader color={"green"} loading={true} size={150} />
    </div>
  )
}
export default UpgradeAccountSuccess;