use anyhow::Result;
use std::io::{stdin, BufRead};
mod make10search;

fn main() -> Result<()> {
    let stdin = stdin();
    let reader = stdin.lock();
    run(reader)
}

fn run<R: BufRead>(reader: R) -> Result<()> {
    for line in reader.lines() {
        let line = line.unwrap();
        let numbers: Vec<i32> = line
            .split_whitespace()
            .map(|s| s.parse().expect("parse error"))
            .collect();
        match make10search::brute_force(numbers) {
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
