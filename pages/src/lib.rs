mod calc;
mod test;
mod utils;

use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn calc() {
    let unti: String = calc::calc(String::from("( ( 1 + 3 ) * 2 ) * 3")).unwrap();
    alert(&unti);
}
