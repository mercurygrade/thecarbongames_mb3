import { useEffect, useState } from "react";
import axios from "axios";

import ClipLoader from "react-spinners/ClipLoader";

const SuccessPage = (props: any) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const account_id = params.get("account_id");
  const public_key = params.get("public_key"); //extract public_key
  const all_keys = params.get("all_keys"); //extract all_keys
  const [isAirdropped, setIsAirdropped] = useState(false);

  const airdropNft = () => {
    const data = {
      event_type: "wallet-connected",
      user_wallet: account_id,
    };
    axios.post("", data).then((response) => {
      console.log(response);
      setIsAirdropped(true);
    });
  };
  useEffect(() => {
    // airdropNft();
  }, [1]);
  return (
    <div className="text-center">
      {!isAirdropped ? (
        <>
          <p>
            Connected Successfully... You will be routed back to app in few
            seconds ...
          </p>
          <ClipLoader color={"green"} loading={true} size={150} />
        </>
      ) : (
        <p>Linking completed.</p>
      )}
    </div>
  );
};
export default SuccessPage;
