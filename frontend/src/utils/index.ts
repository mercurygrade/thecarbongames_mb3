import * as nearAPI from "near-api-js";
import { ContractName } from "config/config";

export const NEARLogin = async (title: string, redirecturl: string) => {
  const { connect, keyStores, WalletConnection } = nearAPI;
  const connectionConfig: any = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  // connect to NEAR
  const nearConnection: any = await connect(connectionConfig);
  const walletConnection = new WalletConnection(nearConnection, null);
  walletConnection.requestSignIn(
    ContractName, // contract requesting access
    title, // optional title
    redirecturl, // optional redirect URL on success
    "" // optional redirect URL on failure
  );
};
