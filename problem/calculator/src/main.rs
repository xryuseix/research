use anyhow::Result;
use clap::Clap;
use std::fs::File;
use std::io::{stdin, BufRead, BufReader};
use std::path::PathBuf;
mod calc;

#[derive(Clap, Debug)]
#[clap(
    name = "My Calculator program",
    version = "1.0.0",
    author = "xryuseix",
    about = "Super awesome sample calculator"
)]
struct Opts {
    /// Sets the level of verbosity
    #[clap(short, long)]
    verbose: bool,

    /// Formulas written in RPN
    #[clap(name = "FILE")]
    formula_file: Option<PathBuf>,
}

fn main() -> Result<()> {
    let opts = Opts::parse();

    if let Some(path) = opts.formula_file {
        let f = File::open(path)?;
        let reader = BufReader::new(f);
        run(reader, opts.verbose)
    } else {
        let stdin = stdin();
        let reader = stdin.lock();
        run(reader, opts.verbose)
    }
}

fn run<R: BufRead>(reader: R, verbose: bool) -> Result<()> {
    for line in reader.lines() {
        let line = line.unwrap();
        match calc::calc(line, verbose) {
            Ok(answer) => println!("{}", answer),
            Err(e) => eprintln!("{:#?}", e),
        }
    }

    Ok(())
}
