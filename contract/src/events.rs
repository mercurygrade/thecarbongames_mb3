use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::Serialize;
use near_sdk::{env, AccountId, log, Balance, near_bindgen,Promise};
use near_sdk::collections::{Vector};
use near_sdk::json_types::{U128};
use near_sdk::collections::{UnorderedMap};

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

 #[derive(BorshDeserialize, BorshSerialize, Serialize)]
 #[serde(crate = "near_sdk::serde")]
 pub struct EventData {
  pub event_id: String,
  pub longitude: String,
  pub latitude: String,
  pub max_shared: String,
  pub amount: String
  }

#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct PooledFundsLog {
  pub event_id: String, 
  pub donor: AccountId,
  pub payment_amount: u128
}

#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct BountyClaim {
  pub event_id: String, 
  pub longitude: String,
  pub latitude: String,
  pub end_date: String,
  pub claimant: AccountId
}

#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Bounty {
  pub event_id: String,
  pub donor: AccountId,
  pub payment_amount: u128
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Events {
  pub beneficiary: AccountId,
  messages: Vector<PostedMessage>,
  pub pool_funds: Vector<PooledFundsLog>,
  pub bounty: Vector<Bounty>,
  pub event_data: Vector<EventData>,
  pub bounty_claim: Vector<BountyClaim>
}

impl Default for Events{
  fn default() -> Self {
    Self{
    messages: Vector::new(b"m"),
    beneficiary: "tcgevent.testnet".parse().unwrap(),
    pool_funds: Vector::new(b"m"),
    bounty: Vector::new(b"m"),
    event_data: Vector::new(b"m"),
    bounty_claim: Vector::new(b"m"),


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
   
   #[payable]
   pub fn pool_funds(&mut self, event_id:String, amount:String)  {
    //this method allows the user to pool fund to an event  
    let donor: AccountId = env::predecessor_account_id(); //account id of pooling
    let payment_amount: Balance = env::attached_deposit();
    
    let to_transfer: Balance = if payment_amount == 0 {
      // This is the user's first payment, lets register it, which increases storage
      assert!(payment_amount > STORAGE_COST, "Attach a deposit");
      // Subtract the storage cost to the amount to transfer
      payment_amount - STORAGE_COST
    }else{
      payment_amount
    };
    
    //send to carbongames
    Promise::new(self.beneficiary.clone()).transfer(to_transfer);
    //save to storage
    let message = PooledFundsLog{event_id, donor, payment_amount};
    self.pool_funds.push(&message);
   }
   
   
   #[payable]
    pub fn add_bounty(&mut self, event_id:String)
    {
     //this method allows the user to pool fund to an event  
    let donor: AccountId = env::predecessor_account_id(); //account id of pooling
    let payment_amount: Balance = env::attached_deposit();
    let to_transfer: Balance = if payment_amount == 0 {
      // This is the user's first payment, lets register it, which increases storage
      assert!(payment_amount > STORAGE_COST, "Attach a deposit");
      // Subtract the storage cost to the amount to transfer
      payment_amount - STORAGE_COST
    } 
    else{
      payment_amount
    };
    //log!("*******************#######Event Data::: event_data", event_data);
    
    //send to carbongames
    Promise::new(self.beneficiary.clone()).transfer(to_transfer);
    //save to storage
    let bounties = Bounty{event_id, donor, payment_amount};
    self.bounty.push(&bounties);
   } 

  
   pub fn add_bounty_claim(&mut self, event_id:String, longitude:String, latitude:String, end_date:String)  {
    //this method allows the user to pool fund to an event  
    let claimant: AccountId = env::predecessor_account_id(); //account id of pooling
    //save to storage
    let message = BountyClaim{event_id, longitude, latitude,end_date,claimant};
    self.bounty_claim.push(&message);
   }
   
   //list the funds added to an event
    pub fn list_all_added_bounty_claim(&self, from_index:Option<U128>, limit:Option<u64>) -> Vec<BountyClaim> {
      self.bounty_claim.iter() 
      .take(limit.unwrap_or(10) as usize)
      .collect()
   }
   
   //list the funds added to an event
   pub fn list_all_event_funds(&self, from_index:Option<U128>, limit:Option<u64>) -> Vec<PooledFundsLog> {
    self.pool_funds.iter() 
    .take(limit.unwrap_or(10) as usize)
    .collect()
   }
  
  //list the bounties
     pub fn list_all_bounties(&self, from_index:Option<U128>, limit:Option<u64>) -> Vec<Bounty> {
      self.bounty.iter() 
      .take(limit.unwrap_or(10) as usize)
      .collect()
     }
   
   pub fn number_of_pool_by_donor(&self, event_id:String) -> u128 {
      // let mut v =0;
      let mut v=Vec::new();
        self.pool_funds.iter()
           .into_iter()
          // .filter(|a| a.event_id == event_id)
           .map(|r| {
               v.push(r.payment_amount);
               log!("added {}", r.payment_amount);
           });
           //.collect::<Vec<PooledFundsLog>>();
           let sum: u128 = v.iter().sum();
           log!("Vector Values {:?}",v);
           
           return sum;
  }

    // Public - get payment by account ID
    pub fn get_pools_for_event_id(&self, event_id: String, donor:AccountId, payment_amount:u128 ) -> PooledFundsLog {
      PooledFundsLog {
        event_id: event_id.clone(),
        donor:  donor.clone(),
        payment_amount: payment_amount.clone()
      }
    }

  // Public - get total number of donors who have pooled funds to the events
  pub fn total_number_of_pool_donors(&self) -> u64 {
    self.pool_funds.len()
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