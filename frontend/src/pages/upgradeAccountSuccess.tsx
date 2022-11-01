import * as nearAPI from "near-api-js";
import { useEffect, useState } from "react";
import { connectionConfig, paymentContractName } from "config/config";
import ClipLoader from "react-spinners/ClipLoader";
const UpgradeAccountSuccess = (props: any) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const plan_type = params.get("plan_type");
  const priceUSD: any = params.get("priceUSD");
  const redirect = params.get("redirect");
  useEffect(() => {
    processPayment();
  }, [1]);
  const processPayment = async () => {
    try {
      const { connect, WalletConnection, Contract, utils } = nearAPI;
      const nearConnection: any = await connect(connectionConfig);
      let walletConnection = new WalletConnection(nearConnection, null);
      const account = await nearConnection.account(
        walletConnection.getAccountId()
      );
      const contract = new Contract(
        walletConnection.account(),
        paymentContractName,
        {
          viewMethods: ["get_payments"],
          changeMethods: ["payment"],
        }
      );
      //get current rate
      let data = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd"
      ).then((response) => response.json());
      const near2usd = data["near"]["usd"];
      const amount_in_near = priceUSD / near2usd;
      const rounded_two_decimals = Math.round(amount_in_near);
      //@ts-ignore
      await contract.payment({
        callbackUrl: "https://thecarbongames.web.app/upgrade-completed", // callbackUrl after the transaction approved (optional)
        meta: `userWallet=${walletConnection.getAccountId()}|${plan_type}|${rounded_two_decimals}|${redirect}`, // meta information NEAR Wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url param
        args: {},
        gas: 300000000000000, // attached GAS (optional)
        //@ts-ignore
        amount: `${rounded_two_decimals}000000000000000000000000`, // attached deposit in yoctoNEAR (optional)
      });
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="text-center">
      <ClipLoader color={"green"} loading={true} size={150} />
    </div>
  );
};
export default UpgradeAccountSuccess;
