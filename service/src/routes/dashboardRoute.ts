import express from "express";
import {
  loginCustomToken,
  validateQRCode,
  userAccountUpgrade,
  addEvent,
} from "../controller/dashboardController";
const dashboardRoute = express();
dashboardRoute.post("/login", loginCustomToken);
dashboardRoute.post("/qr-validate", validateQRCode);
dashboardRoute.post("/upgrade-account", userAccountUpgrade);
dashboardRoute.post("/submit-event-to-blockchain", addEvent);

module.exports = dashboardRoute;
