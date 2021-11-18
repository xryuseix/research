use anyhow::Result;
use std::io::{stdin, BufRead, BufReader};
mod calc;

fn main() -> Result<()> {
    let stdin = stdin();
    let reader = stdin.lock();
    run(reader)
}

fn run<R: BufRead>(reader: R) -> Result<()> {
    for line in reader.lines() {
        let line = line.unwrap();
        match calc::calc(line) {
            Ok(answer) => {
                for ans in answer {
                    println!("{:?}", ans);
                }
            }
            Err(e) => eprintln!("{:#?}", e),
        }
    }

    Ok(())
}
