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
pub struct Events {
  pub account_id: AccountId, 
  pub title: String,
  pub description: String,
  pub latitude: String,
  pub longitude: String,
}

#[near_bindgen]
impl Contract {
    pub fn createEvent(&mut self) -> U128 {
        
    }

}