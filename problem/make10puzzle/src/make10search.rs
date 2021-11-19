use crate::permutation;
use anyhow::{ensure, Result};

pub fn brute_force(mut numbers: Vec<i32>) -> Result<Vec<String>, anyhow::Error> {
    ensure!(numbers.len() == 4, "[ERROR] Numbers length is not 4");
    ensure!(
        0 <= *numbers.iter().min().expect("[ERROR] min() is panicked!")
            && *numbers.iter().max().expect("[ERROR] max() is panicked!") < 10,
        "[ERROR] Numbers should be between 0 and 9"
    );
    while permutation::next_permutation(&mut numbers) {
        let mut _crr_numbers = numbers.clone();
    }

    return Ok(vec!["AAA".to_string()]);
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_brute_force_ok() {
        assert!(brute_force(vec![1, 2, 3, 4]).is_ok());
    }
    #[test]
    fn test_brute_force_ng() {
        assert!(brute_force(vec![]).is_err());
        assert!(brute_force(vec![1, 2, 3, 4, 5]).is_err());
        assert!(brute_force(vec![1, 2, 3, 10]).is_err());
        assert!(brute_force(vec![1, 2, 3, -1]).is_err());
    }
}
