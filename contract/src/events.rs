use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::Serialize;
use near_sdk::{env, AccountId, Balance, near_bindgen,Promise};
use near_sdk::collections::{Vector};
use near_sdk::json_types::{U128};

const POINT_ONE: Balance = 100_000_000_000_000_000_000_000;
pub const STORAGE_COST: u128 = 1_000_000_000_000_000_000_000;

#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct PostedMessage {
  pub sender: AccountId,
  pub event_id: String,
  pub title: String,
  pub description: String,
  pub latitude: String,
  pub longitude: String
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Events {
  pub beneficiary: AccountId,
  messages: Vector<PostedMessage>,
}

impl Default for Events{
  fn default() -> Self {
    Self{
    messages: Vector::new(b"m"),
    beneficiary: "thecarbongames-events-15.testnet".parse().unwrap(),
  }
  }
}

#[near_bindgen]
impl Events {
  
  #[payable]
  pub fn add_event(&mut self, event_id: String, title: String, description: String, latitude: String, longitude: String) {
   
    // only attach to blockchain if payment of 1N has been made
    let sender = env::predecessor_account_id();
    let payment_amount: Balance = env::attached_deposit();
    let to_transfer: Balance = if payment_amount != 1 {
      // This is the user's first payment, lets register it, which increases storage
      assert!(payment_amount > STORAGE_COST, "Attach at least 1 Near");
      
      // Subtract the storage cost to the amount to transfer
      payment_amount - STORAGE_COST
    }else{
      payment_amount
    };

    Promise::new(self.beneficiary.clone()).transfer(to_transfer);
    let message = PostedMessage{sender, event_id, title, description, latitude, longitude };
    self.messages.push(&message);
    
  }
  
  
  /* pub fn get_events(&self, from_index:Option<U128>, limit:Option<u64>) -> Vector<PostedMessage>{
   let from = u128::from(from_index.unwrap_or(U128(0)));
    self.messages.iter()
    .skip(from as usize)
    .take(limit.unwrap_or(10) as usize)
    .collect()
  }*/
}

/*
 * the rest of this file sets up unit tests
 * to run these, the command will be: `cargo test`
 * Note: 'rust-counter-tutorial' comes from cargo.toml's 'name' key
 */

// use the attribute below for unit tests
#[cfg(test)]
mod tests {
  use super::*;
  
  #[test]
  fn add_event() {
    let mut contract = Events::default();
    contract.add_event("xDheodkmospsps".to_string(),
                       "Web 3 Developer Conference".to_string(),
                       "Web 3 Developer Conference for developers".to_string(),
                       "6.3030933".to_string(),
                       "2.3030933".to_string()
                      );

   // let posted_message = &contract.get_events(None, None)[0];
   // assert_eq!(posted_message.premium, false);
   // assert_eq!(posted_message.title, "Web 3 Developer Conference".to_string());
  }

  #[test]
  fn iters_messages() {
    let mut contract = Events::default();
    contract.add_event("xDheodkmospsps".to_string(),
                        "Web 3 Developer Conference".to_string(),
                        "Web 3 Developer Conference for developers".to_string(),
                        "6.3030933".to_string(),
                        "2.3030933".to_string()); 
   
    contract.add_event("jssjskjskjs".to_string(),
                        "Web 3 ".to_string(),
                        "Another".to_string(),
                        "6.3030933".to_string(),
                        "2.3030933".to_string()); 

                           
    contract.add_event("sksJSJajsisi".to_string(),
                      "Web 3.s".to_string(),
                      "Another one lets go".to_string(),
                      "6.3030933".to_string(),
                      "2.3030933".to_string()); 
                           
   // let messages = &contract.get_events(None, None);
    //assert!(messages.len() == 3);

    //let last_message = &contract.get_events(Some(U128::from(1)), Some(2))[1];
   // assert_eq!(last_message.premium, false);
   // assert_eq!(last_message.title, "Web 3.s".to_string());
  }
}