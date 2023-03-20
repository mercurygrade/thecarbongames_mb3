import express from "express";
import {
  loginCustomToken,
  validateQRCode,
  userAccountUpgrade,
  addEvent,
  disburseFunds
} from "../controller/dashboardController";
const dashboardRoute = express();
dashboardRoute.post("/login", loginCustomToken);
dashboardRoute.post("/qr-validate", validateQRCode);
dashboardRoute.post("/upgrade-account", userAccountUpgrade);
dashboardRoute.post("/submit-event-to-blockchain", addEvent);
dashboardRoute.get("/disburse-funds", disburseFunds);

module.exports = dashboardRoute;
