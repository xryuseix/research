mod calc;
mod utils;

use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn calc(numbers: Vec<i32>) -> Vec<String> {
    if numbers.len() != 4 {
        return vec![String::from("[ERROR]")];
    }
    let res = match calc::calc(numbers) {
        Ok(ans) => ans,
        Err(_e) => "[ERROR]".to_string(),
    };
    return res;
}
