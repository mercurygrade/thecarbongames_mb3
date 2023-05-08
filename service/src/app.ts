import express from "express";
const cron = require("node-cron");
const request = require('request');

const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const carbonTokenRoute = require("./routes/carbonTokenRoute");
const nearWalletRoute = require("./routes/nearWalletRoute");
const nftAirdropRoute = require("./routes/nftAirdropRoute");
const dashboardRoute = require("./routes/dashboardRoute");
//const liveStreamRoute = require("./routes/liveStreamRoute"); 

const jsonParser = bodyParser.json();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/carbon", jsonParser, carbonTokenRoute);
app.use("/near", jsonParser, nearWalletRoute);
app.use("/airdrop", jsonParser, nftAirdropRoute);
app.use("/dashboard", jsonParser, dashboardRoute);
//app.use("/livestream", jsonParser, liveStreamRoute); 

/*
//run once daily
cron.schedule("0 0 0 * * *", async function () {
 
  request('http://159.89.100.186:9067/dashboard/disburse-funds', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
 });

});
*/



app.listen(9067, () => {
  console.log("carbon app is listening");
});
export default app;
