import request from "supertest";
import { Express } from "express-serve-static-core";
import app from "../src/app";
let server: Express;
describe(`Dashboard  tests`, () => {
  beforeAll(() => {
    server = app;
  });
  it("should login OK 200", (done) => {
    request(app)
      .post("/dashboard/login")
      .set({
        near_wallet: "passenger3.thecarbongames.testnet",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
