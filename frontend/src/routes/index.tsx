import { Routes, Route } from "react-router-dom";
import NearWalletConnect from "pages/nearWalletConnect";
import SuccessPage from "pages/successPage";
import FailurePage from "pages/failurePage";
import UpgradeAccountSuccess from "pages/upgradeAccountSuccess";
import UpgradeAccount from "pages/upgradeAccount";
import UpgradeAccountCompleted from "pages/upgradeAccountCompleted";
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
    </Routes>
  );
};
export default Router;
