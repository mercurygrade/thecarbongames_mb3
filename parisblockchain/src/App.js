import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
// React Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
// Custom Components
import MintingTool from "./Components/MintingTool";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");
export default function App() {
  const [userHasNFT, setuserHasNFT] = useState(false);
  return (
    <React.Fragment>
       <MintingTool userNFTStatus={userHasNFT} />
    </React.Fragment>
  );
}
