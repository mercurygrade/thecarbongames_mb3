import React, { useEffect, useState } from "react";
import MintingTool from "./Components/MintingTool";
import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

const Mint = () => {
  const [userHasNFT, setuserHasNFT] = useState(false);
  return (
    <React.Fragment>
       <MintingTool userNFTStatus={userHasNFT} />
    </React.Fragment>
  );
}

export default Mint;