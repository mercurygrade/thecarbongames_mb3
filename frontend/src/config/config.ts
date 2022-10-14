import * as nearAPI from "near-api-js"

const { connect, keyStores,WalletConnection } = nearAPI

export  const connectionConfig:any = {  
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(), 
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

export const paymentContractName = "thecarbongames2.testnet"