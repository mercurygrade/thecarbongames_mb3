import * as nearAPI from "near-api-js";
import { useEffect, useState } from "react";
import { connectionConfig, ContractName,BaseWebAppURL } from "config/config";
import ClipLoader from "react-spinners/ClipLoader";
const ClaimBountySuccess = (props: any) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const latitude = params.get("latitude");
  const longitude = params.get("longitude");
  const event_id = params.get("event_id");
  const end_date = params.get("end_date");


  useEffect(() => {
    process();
  }, [1]);
  const process = async () => {
    try {
      const { connect, WalletConnection, Contract, utils } = nearAPI;
      const nearConnection: any = await connect(connectionConfig);
      let walletConnection = new WalletConnection(nearConnection, null);
      const account = await nearConnection.account(
        walletConnection.getAccountId()
      );
      const contract = new Contract(
        account,
        ContractName,
        {
          viewMethods: ["get_payments"],
          changeMethods: ["add_bounty_claim"],
        }
      );

       
       
      //@ts-ignore
      await contract.add_bounty_claim({
        callbackUrl: `${BaseWebAppURL}/claim-bounty-completed`, // callbackUrl after the transaction approved (optional)
        meta: ``, // meta information NEAR Wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url param
        args: {
            event_id: event_id,
            latitude: latitude,
            longitude: longitude,
            end_date:end_date
          },
        gas: 300000000000000 // attached GAS (optional)
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
export default ClaimBountySuccess;
