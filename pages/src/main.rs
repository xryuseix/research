use anyhow::Result;
mod calc;

fn main() -> Result<()> {
    let _ans = calc::calc(String::from("( ( 1 + 3 ) * 2 ) * 3")).unwrap();
    println!("{}", _ans);
    Ok(())
}
