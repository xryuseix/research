use crate::calc;
use crate::permutation;
use anyhow::{ensure, Result};
use std::collections::HashSet;

pub fn brute_force(numbers: Vec<i32>) -> Result<Vec<String>, anyhow::Error> {
    ensure!(numbers.len() == 4, "[ERROR] Numbers length is not 4");
    ensure!(
        0 <= *numbers.iter().min().expect("[ERROR] min() is panicked!")
            && *numbers.iter().max().expect("[ERROR] max() is panicked!") < 10,
        "[ERROR] Numbers should be between 0 and 9"
    );
    let op = ["+", "-", "*", "/"];
    // 演算子3つの組み合わせを作成する
    let mut op_combination = vec![];
    for op1 in op {
        for op2 in op {
            for op3 in op {
                let combination = vec![op1, op2, op3];
                op_combination.push(combination);
            }
        }
    }
    let mut answer_formula: Vec<String> = Vec::new();
    // N1 N2 N3 N4 OP1 OP2 OP3のように結合し，next_permutationで全探索してから式を評価する
    for ops in op_combination {
        // Vec<i32>をVec<String>に変換してからVec<&str>に変換する
        let tmp: Vec<String> = numbers
            .clone()
            .iter()
            .map(|num| num.to_string())
            .collect::<Vec<String>>();
        let mut numbers_and_ops: Vec<&str> = tmp.iter().map(AsRef::as_ref).collect::<Vec<&str>>();
        numbers_and_ops.extend(ops);
        numbers_and_ops.sort();
        while permutation::next_permutation(&mut numbers_and_ops) {
            let rpn = calc::RpnCalculator::new();
            let result: f64 = match rpn.eval(&numbers_and_ops) {
                Ok(ans) => ans,
                Err(_e) => std::f64::MAX,
            };
            if result == std::f64::MAX {
                continue;
            }
            if (result - 10.0).abs() <= f64::EPSILON {
                // RPNを中置記法に変換する
                let tmp = numbers_and_ops.clone().into_iter().collect::<String>();
                let formula: String = tmp
                    .split("")
                    .filter(|&s| s != "")
                    .collect::<Vec<&str>>()
                    .join(" ");
                answer_formula.push(rpn.rpn_to_infix(formula).unwrap());
            }
        }
    }
    let mut answer_unique: Vec<String> = answer_formula
        .into_iter()
        .collect::<HashSet<String>>()
        .into_iter()
        .collect::<Vec<String>>();
    answer_unique.sort();
    return Ok(answer_unique);
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_brute_force_ok() {
        {
            let mut expect: Vec<String> = vec![
                "(1 + 1) * (6 - 1)".to_string(),
                "(6 - 1) * (1 + 1)".to_string(),
            ];
            expect.sort();
            assert_eq!(brute_force(vec![1, 1, 1, 6]).unwrap(), expect);
        }
        {
            let expect: Vec<String> = Vec::new();
            assert_eq!(brute_force(vec![0, 1, 2, 3]).unwrap(), expect);
        }
        {
            let mut expect: Vec<String> =
                vec!["(9 * 9 + 9) / 9".to_string(), "(9 + 9 * 9) / 9".to_string()];
            expect.sort();
            assert_eq!(brute_force(vec![9, 9, 9, 9]).unwrap(), expect);
        }
        {
            let mut expect = vec![
                "(1 + 8) * 2 - 8".to_string(),
                "2 * (1 + 8) - 8".to_string(),
                "2 * (8 + 1) - 8".to_string(),
                "(8 + 1) * 2 - 8".to_string(),
                "(1 + 2 / 8) * 8".to_string(),
                "(2 / 8 + 1) * 8".to_string(),
                "8 * (1 + 2 / 8)".to_string(),
                "8 * (2 / 8 + 1)".to_string(),
            ];
            expect.sort();
            assert_eq!(brute_force(vec![1, 2, 8, 8]).unwrap(), expect);
        }
        {
            let mut expect = vec![
                "(1 + 7 / 3) * 3".to_string(),
                "3 * (1 + 7 / 3)".to_string(),
                "3 * (7 / 3 + 1)".to_string(),
                "(7 / 3 + 1) * 3".to_string(),
            ];
            expect.sort();
            assert_eq!(brute_force(vec![7, 3, 3, 1]).unwrap(), expect);
        }
    }
    #[test]
    fn test_brute_force_ng() {
        assert!(brute_force(vec![]).is_err());
        assert!(brute_force(vec![1, 2, 3, 4, 5]).is_err());
        assert!(brute_force(vec![1, 2, 3, 10]).is_err());
        assert!(brute_force(vec![1, 2, 3, -1]).is_err());
    }
}
