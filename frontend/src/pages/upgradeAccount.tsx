import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { BaseWebAppURL } from "config/config";
import { NEARLogin } from "utils";

const UpgradeAccount = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const plan_type = params.get("plan_type");
  const redirect = params.get("redirect");
  useEffect(() => {
    if (plan_type == null || redirect == null) {
    } else {
      Process();
    }
  }, [1]);
  const Process = async () => {
    let priceUSD = 0;
    if (plan_type == "event_manager") {
      priceUSD = 20;
    } else if (plan_type == "corporate_manager") {
      priceUSD = 90;
    } else {
    }
    let redirecturl = `${BaseWebAppURL}/upgrade-account-success?plan_type=${plan_type}&priceUSD=${priceUSD}&redirect=${redirect}`;
    NEARLogin("The Carbongames Account Upgrade", redirecturl);
  };
  return (
    <div className="text-center">
      <ClipLoader color={"green"} loading={true} size={150} />
    </div>
  );
};
export default UpgradeAccount;
