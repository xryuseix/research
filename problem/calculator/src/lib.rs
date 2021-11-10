mod calc;
mod utils;

use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn calc(formula: String) -> String {
    let res = match calc::calc(formula, false) {
        Ok(ans) => ans.to_string(),
        Err(_e) => "[ERROR]".to_string(),
    };
    return res;
}
