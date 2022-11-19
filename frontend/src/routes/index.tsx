import { Routes, Route } from "react-router-dom";
import NearWalletConnect from "pages/nearWalletConnect";
import SuccessPage from "pages/successPage";
import FailurePage from "pages/failurePage";
import UpgradeAccountSuccess from "pages/upgradeAccountSuccess";
import UpgradeAccount from "pages/upgradeAccount";
import UpgradeAccountCompleted from "pages/upgradeAccountCompleted";

import ClaimBounty from "pages/claimBounty";
import ClaimBountySuccess from "pages/claimBountySuccess";
import ClaimBountyCompleted from "pages/ClaimBountyCompleted";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<NearWalletConnect />} />
      <Route path="/connect-near-wallet" element={<NearWalletConnect />} />
      <Route path="/near-wallet-success" element={<SuccessPage />} />
      <Route path="/near-wallet-failure" element={<FailurePage />} />
      <Route path="/upgrade-account" element={<UpgradeAccount />} />
      <Route
        path="/upgrade-account-success"
        element={<UpgradeAccountSuccess />}
      />
      <Route path="/upgrade-completed" element={<UpgradeAccountCompleted />} />
      <Route path="/claim-bounty" element={<ClaimBounty />} />
      <Route path="/claim-bounty-success" element={<ClaimBountySuccess />} />
      <Route path="/claim-bounty-success" element={<ClaimBountyCompleted />} />
    </Routes>
  );
};
export default Router;
