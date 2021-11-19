mod make10search;
mod utils;
mod next_permutation;

use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn calc(numbers: Vec<i32>) -> String {
    let res = match make10search::brute_force(numbers) {
        Ok(ans) => ans.join("\n"),
        Err(_e) => String::from("[ERROR]"),
    };
    return res;
}
