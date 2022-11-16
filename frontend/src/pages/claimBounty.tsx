import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { BaseWebAppURL } from "config/config";
import {NEARLogin} from "utils"

const ClaimBounty = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const latitude = params.get("latitude");
  const longitude = params.get("longitude");
  const event_id = params.get("event_id");
  const end_date = params.get("end_date");
  
  useEffect(() => {
    if (latitude == null || longitude == null || event_id == null || end_date == null ) {
    } else {
      Process();
    }
  }, [1]);
  const Process = async () => {
    let redirecturl =  `${BaseWebAppURL}/claim-bounty-success?latitude=${latitude}&longitude=${longitude}&event_id=${event_id}&end_date=${end_date}`;
    NEARLogin("The Carbongames Account Upgrade",redirecturl);
  };
  return (
    <div className="text-center">
      <ClipLoader color={"green"} loading={true} size={150} />
    </div>
  );
};
export default ClaimBounty;
