# Carbongames smart Contract

The smart contract exposes multiple methods to handle paying money for account upgrade and for creating events on the blockchain
<br />

# Events or meetups Contract carbon games

Add an event to the SC - user must pay 1N to post an event to the SC.
`near call <contractID> add_event '{"event_id": "snsnsSHiusnuis", "title":"web3 event 2022", "description":"this is a nice event to meet other developers", "latitude":"6.33333", "longitude":"3.44444"}' --accountId <accountID> --amount 1`

# Sample Integration with near sdk

```js
let walletConnection = new WalletConnection(nearConnection, null);
const account = await nearConnection.account(walletConnection.getAccountId());
const contract = new Contract(walletConnection.account(), paymentContractName, {
  viewMethods: ["get_payments"],
  changeMethods: ["payment", "add_event"],
});

//interact with the event smart contract
await contract.add_event({
  callbackUrl: "", // callbackUrl after the transaction approved (optional)
  args: {
    event_id: "snsnsSHiusnuis",
    title: "web3 event 2022",
    description: "this is a nice event to meet other developers",
    latitude: "6.33333",
    longitude: "3.44444",
  },
  gas: 300000000000000, // attached GAS (optional)
  amount: `1000000000000000000000000`, // attached deposit 1N (required)
});
```

# Add pool fund to event

`near call <contractID> pool_funds '{"event_id": "snsns","amount":"1"}' --accountId <userAccountID> --amount 1`

# view total number of donors who have pooled funds

`near view <contractID> total_number_of_pool_donors`

# Get total amount of funds  pooled by donors on an event via the event_id

`
near call <contractID> number_of_pool_by_donor '{"event_id": "9c71LoSyIRJI2AdTVn4u"}' --accountId <userAccountID>
`

# View events on the blockchain:

`near call <contractID> get_events '{"from_index": "0", "limit":10}' --accountId <accountID>`

# Quickstart

1. Make sure you have installed [rust](https://rust.org/).
2. Install the [`NEAR CLI`](https://github.com/near/near-cli#setup)

<br />

To use the contract on the frontend do:

```bash
# Use near-cli to initialize contract (optional)
near call <dev-account> new '{"beneficiary":"<account>"}' --accountId <dev-account>
```

<br />

## 2. Get Beneficiary

`beneficiary` is a read-only method (`view` method) that returns the beneficiary of the payments.

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
near view <dev-account> beneficiary
```

<br />

## 3. Make Payments

`payment` forwards any attached money to the `beneficiary` while keeping track of it.

`payment` is a payable method for which can only be invoked using a NEAR account. The account needs to attach money and pay GAS for the transaction.

```bash
# Use near-cli to payment 1 NEAR
near call <dev-account> payment --amount 1 --accountId <account>
```

**Tip:** If you would like to `payment` using your own account, first login into NEAR using:

```bash
# Use near-cli to login your NEAR account
near login
```

and then use the logged account to sign the transaction: `--accountId <your-account>`.
