use crate::Contract;
use crate::ContractExt;

use near_sdk::serde::Serialize;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, log, near_bindgen, AccountId, Promise, Balance};
use near_sdk::json_types::U128;

pub const STORAGE_COST: u128 = 1_000_000_000_000_000_000_000;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Payment {
  pub account_id: AccountId, 
  pub total_amount: U128,
}

#[near_bindgen]
impl Contract {
  #[payable] // Public - People can attach money
  pub fn payment(&mut self) -> U128 {
    // Get who is calling the method and how much $NEAR they attached
    let donor: AccountId = env::predecessor_account_id();
    let payment_amount: Balance = env::attached_deposit();
    
    let mut paymentd_so_far = self.payments.get(&donor).unwrap_or(0);
    
    let to_transfer: Balance = if paymentd_so_far == 0 {
      // This is the user's first payment, lets register it, which increases storage
      assert!(payment_amount > STORAGE_COST, "Attach at least {} yoctoNEAR", STORAGE_COST);
     
      // Subtract the storage cost to the amount to transfer
      payment_amount - STORAGE_COST
    }else{
      payment_amount
    };
    
    // Persist in storage the amount paymentd so far
    paymentd_so_far += payment_amount;
    self.payments.insert(&donor, &paymentd_so_far);
    
    log!("Thank you {} for paying {}! You paymentd a total of {}", donor.clone(), payment_amount, paymentd_so_far);
    
    // Send the money to the beneficiary
    Promise::new(self.beneficiary.clone()).transfer(to_transfer);
    // Return the total amount paymentd so far
    U128(paymentd_so_far)
  }
  
  // Public - get payment by account ID
  pub fn get_payment_for_account(&self, account_id: AccountId) -> Payment {
    Payment {
      account_id: account_id.clone(),
      total_amount: U128(self.payments.get(&account_id).unwrap_or(0))
    }
  }

  // Public - get total number of donors
  pub fn number_of_donors(&self) -> u64 {
    self.payments.len()
  }

  // Public - paginate through all payments on the contract
  pub fn get_payments(&self, from_index: Option<U128>, limit: Option<u64>) -> Vec<Payment> {
    //where to start pagination - if we have a from_index, we'll use that - otherwise start from 0 index
    let start = u128::from(from_index.unwrap_or(U128(0)));

    //iterate through payment
    self.payments.keys()
      //skip to the index we specified in the start variable
      .skip(start as usize) 
      //take the first "limit" elements in the vector. If we didn't specify a limit, use 50
      .take(limit.unwrap_or(50) as usize) 
      .map(|account| self.get_payment_for_account(account))
      //since we turned map into an iterator, we need to turn it back into a vector to return
      .collect()
  }
  
}