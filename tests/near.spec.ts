import request from "supertest";
import {Express} from 'express-serve-static-core';
import app from "../src/app"
let server: Express
describe(`Near wallet tests`, () => {
  beforeAll(() => {
    server = app;
  });
  it("should return wallet-balance", (done) => {
    request(app)
    .get('/near/wallet-balance')
    .set({walletname:'davidoluyale.testnet'})
    .then((response)=>{
      expect(response.statusCode).toBe(200);
      expect({
        "status": "success",
        "data": {
            "total": "127979597298744632100000005",
            "stateStaked": "2185650000000000000000000",
            "staked": "0",
            "available": "125793947298744632100000005"
        }
    })
    done();
    })
  })
  it("should return wallet-details", (done) => {
    request(app)
    .get('/near/wallet-details')
    .set({walletname:'testingwallet.thecarbongames.testnet'})
    .then((response)=>{
      expect(response.statusCode).toBe(200);
      expect({
        "status": "success",
        "data": {
            "authorizedApps": []
        }
    })
    done();
    })
  })
  it("should return transaction-status", (done) => {
    request(app)
    .get('/near/transaction-status')
    .set({
      "tx_hash":"FJpbWvrLZyd34eyVKEtvibxB5UFF4VyUt3haChaY7UMq",
      "sender_id":"gamesbond23.testnet"
    })
    .then((response)=>{
      expect(response.statusCode).toBe(200);
      done();
    })
  })
});