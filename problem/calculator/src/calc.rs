use anyhow::{bail, Result};
use std::collections::HashMap;
extern crate regex;
use regex::Regex;

struct RpnCalculator(bool);

impl RpnCalculator {
    pub fn new(verbose: bool) -> Self {
        Self(verbose)
    }

    pub fn eval(&self, tokens_input: &Vec<&str>) -> Result<i64> {
        let mut tokens = tokens_input.clone();
        tokens.reverse();
        let mut stack = Vec::new();
        let mut pos = 0;

        while let Some(token) = tokens.pop() {
            pos += 1;

            if let Ok(x) = token.parse::<i64>() {
                stack.push(x);
            } else if stack.len() >= 2 {
                let y = stack.pop().expect("invalid syntax");
                let x = stack.pop().expect("invalid syntax");

                let res = match token {
                    "+" => x + y,
                    "-" => x - y,
                    "*" => x * y,
                    "/" => x / y,
                    "%" => x % y,
                    _ => bail!("invalid token at {}", pos),
                };
                stack.push(res);
            } else {
                bail!("invalid syntax at {}", pos);
            }
            if self.0 {
                println!("{:?} {:?}", tokens, stack);
            }
        }

        if stack.len() != 1 {
            bail!("invalid syntax");
        }

        Ok(stack[0])
    }
}

struct Calculator<'a> {
    priority: HashMap<&'a str, i64>,
    verbose: bool,
}

impl<'a> Calculator<'a> {
    pub fn new(verbose: bool) -> Self {
        let priority: HashMap<&'a str, i64> = [
            ("*", 1),
            ("/", 1),
            ("%", 1),
            ("+", 2),
            ("-", 2),
            ("(", 3),
            (")", 3),
        ]
        .iter()
        .cloned()
        .collect();
        Self { priority, verbose }
    }

    pub fn eval(&self, formula: &str) -> Result<i64> {
        let spacing_formula = self.spacing(&formula);
        let mut tokens = spacing_formula.split_whitespace().collect::<Vec<_>>();
        self.eval_inner(&mut tokens)
    }

    fn spacing(&self, formula_tmp: &str) -> String {
        // スペースをいい感じに入れる
        let mut formula = formula_tmp.chars().collect::<Vec<_>>();
        if formula.len() >= 2 && formula[0] == '-' && formula[1] == '(' {
            formula.insert(0, '0');
        }
        let mut res = Vec::new();
        let op = vec!['(', ')', '+', '-', '*', '/', '%'];
        let minus_front_op = vec!['+', '-', '*', '/', '%'];
        for (i, c) in formula.iter().enumerate() {
            if c == &'-' && i >= 1 && minus_front_op.contains(&formula[i - 1]) {
                res.push(' ');
                res.push('-');
            } else if op.contains(&c) {
                res.push(' ');
                res.push(*c);
                res.push(' ');
            } else {
                res.push(*c);
            }
        }
        let mut unique_res = Vec::new();
        for c in res.clone() {
            if unique_res.len() == 0 && c == ' ' {
                continue;
            } else if unique_res.len() > 0 && c == ' ' && unique_res[unique_res.len() - 1] == ' ' {
                continue;
            } else {
                unique_res.push(c);
            }
        }
        while unique_res.len() > 0 && unique_res[unique_res.len() - 1] == ' ' {
            unique_res.pop();
        }
        println!("{:?}", unique_res.iter().collect::<String>());
        return unique_res.iter().collect();
    }

    fn validate(&self, tokens: &Vec<&str>) -> Result<(bool, usize)> {
        /*
        数式が正しい数式かチェックする
        チェックするのは下記の4項目(BNFでのチェックは行わない)
        1. 式が存在しない場合
        2. 数値が連続，括弧が連続，演算子が連続していないか
        3. 括弧列がvalidか
        4. "("の次は数値または"("であり，")"の前は数値または")"である
        */
        // 1の処理
        if tokens.len() == 0 {
            bail!("invalid syntax");
        }
        // 2の処理
        for pos in 0..(tokens.len() - 1) {
            let x = tokens[pos];
            let y = tokens[pos + 1];
            let is_x_num = x.parse::<i64>().is_ok();
            let is_y_num = y.parse::<i64>().is_ok();
            if is_x_num && is_y_num {
                // 数値 数値の時
                return Ok((false, pos));
            } else if is_x_num || is_y_num {
                // 片方が数値の時
                continue;
            } else {
                let x_priority = *self.priority.get(x).unwrap();
                let y_priority = *self.priority.get(y).unwrap();
                if x_priority <= 2 && y_priority <= 2 {
                    // 演算子が連続する時
                    return Ok((false, pos));
                } else if x_priority == 3 && y_priority == 3 && x != y {
                    // 違う括弧が連続する時
                    return Ok((false, pos));
                }
            }
        }
        // 3, 4の処理
        let mut paren = 0;
        for (pos, token) in tokens.iter().enumerate() {
            if token == &"(" {
                paren += 1;
                if pos == tokens.len() - 1 {
                    // 末尾に"("はない
                    return Ok((false, pos));
                } else if tokens[pos + 1] != "(" && tokens[pos + 1].parse::<i64>().is_err() {
                    // "("の後ろは"("または数値である
                    return Ok((false, pos));
                }
            } else if token == &")" {
                paren -= 1;
                if pos == 0 {
                    // 先頭に")"はない
                    return Ok((false, pos));
                } else if tokens[pos - 1] != ")" && tokens[pos - 1].parse::<i64>().is_err() {
                    // ")"の前は")"または数値である
                    return Ok((false, pos));
                }
            }
            if paren < 0 {
                return Ok((false, pos));
            }
        }
        if paren != 0 {
            return Ok((false, tokens.len()));
        }
        Ok((true, 0 as usize))
    }

    fn eval_inner(&self, tokens: &Vec<&str>) -> Result<i64> {
        let (valid, pos) = self.validate(tokens)?;
        if !valid {
            bail!("invalid syntax at {}", pos);
        }
        let mut stack = Vec::new();
        let mut rpn_formula: Vec<&str> = Vec::new();
        for (_pos, token) in tokens.iter().enumerate() {
            if let Ok(_x) = token.parse::<i64>() {
                rpn_formula.push(token);
            } else {
                if token == &"(" {
                    stack.push(token);
                } else if token == &")" {
                    while let Some(top) = stack.pop() {
                        if top == &"(" {
                            break;
                        }
                        rpn_formula.push(top);
                    }
                } else {
                    while let Some(top) = stack.last() {
                        if self.priority.get(*top).unwrap_or(&0)
                            <= self.priority.get(token).unwrap_or(&0)
                        {
                            rpn_formula.push(stack.pop().unwrap());
                        } else {
                            break;
                        }
                    }
                    stack.push(token);
                }
            }
        }
        while let Some(token) = stack.pop() {
            rpn_formula.push(token);
        }
        let rpn_calc = RpnCalculator::new(self.verbose);
        rpn_calc.eval(&rpn_formula)
    }
}

pub fn calc(formula: String, verbose: bool) -> Result<i64, anyhow::Error> {
    // 式が空のときエラーを返す
    if formula.is_empty() {
        bail!("[ERROR] Formula is empty");
    }

    // 式に変な文字が入っているとエラーを返す
    let re = Regex::new(r"^[\d\(\)\+\-\*/% ]+$").unwrap();
    if !re.is_match(&formula) {
        bail!("[ERROR] Unnecessary characters are included");
    }

    let calc = Calculator::new(verbose);
    match calc.eval(&formula) {
        Ok(answer) => {
            return Ok(answer);
        }
        Err(e) => {
            bail!(format!("[ERROR] {}", e));
        }
    };
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_rpn_ok() {
        let calc = RpnCalculator::new(false);
        assert_eq!(calc.eval(&vec!["5"]).unwrap(), 5);
        assert_eq!(calc.eval(&vec!["50"]).unwrap(), 50);
        assert_eq!(calc.eval(&vec!["-50"]).unwrap(), -50);

        assert_eq!(calc.eval(&vec!["2", "3", "+"]).unwrap(), 5);
        assert_eq!(calc.eval(&vec!["2", "3", "*"]).unwrap(), 6);
        assert_eq!(calc.eval(&vec!["2", "3", "-"]).unwrap(), -1);
        assert_eq!(calc.eval(&vec!["2", "3", "/"]).unwrap(), 0);
        assert_eq!(calc.eval(&vec!["2", "3", "%"]).unwrap(), 2);
        assert_eq!(
            calc.eval(&vec!["1", "2", "+", "3", "4", "+", "*"]).unwrap(),
            21
        );
    }

    #[test]
    fn test_rpn_ng() {
        let calc = RpnCalculator::new(false);
        assert!(calc.eval(&vec!["1", "1"]).is_err());
        assert!(calc.eval(&vec!["1", "1", "^"]).is_err());
        assert!(calc.eval(&vec!["1", "1", "-", "+"]).is_err());
    }

    #[test]
    fn test_calc_ok() {
        assert_eq!(calc("2".to_string(), false).unwrap(), 2);
        assert_eq!(calc("2 + 3".to_string(), false).unwrap(), 5);
        assert_eq!(calc("2 + 3 * 4".to_string(), false).unwrap(), 14);
        assert_eq!(calc("2 - 3 + 4".to_string(), false).unwrap(), 3);
        assert_eq!(calc("1 + 2 * 3 - 4 + 5".to_string(), false).unwrap(), 8);
        assert_eq!(
            calc("( 5 - 3 ) * ( 1 + 2 ) + 10".to_string(), false).unwrap(),
            16
        );
        assert_eq!(
            calc("( ( 1 + 3 ) * 2 ) * 3".to_string(), false).unwrap(),
            24
        );
        assert_eq!(calc("1+2*3-4+5".to_string(), false).unwrap(), 8);
        assert_eq!(calc("((1+3)*2)*3".to_string(), false).unwrap(), 24);
        assert_eq!(calc("1--5+-2*-3".to_string(), false).unwrap(), 12);
        assert_eq!(calc("1--1        ".to_string(), false).unwrap(), 2);
        assert_eq!(calc("-(1--1)--3".to_string(), false).unwrap(), 1);
    }

    #[test]
    fn test_calc_ng() {
        assert!(calc("".to_string(), false).is_err());
        assert!(calc("( )".to_string(), false).is_err());
        assert!(calc("2 3".to_string(), false).is_err());
        assert!(calc("2 + + 3".to_string(), false).is_err());
        assert!(calc("( 1 + 2 ) ( 3 + 4 )".to_string(), false).is_err());
        assert!(calc("1 + ) 3 + 4 ( + 5".to_string(), false).is_err());
        assert!(calc("( 1 + 2 ) )".to_string(), false).is_err());
        assert!(calc("( + ) * 3".to_string(), false).is_err());
        assert!(calc("1 + a".to_string(), false).is_err());
        assert!(calc("5 と 7 を足して".to_string(), false).is_err());
    }
}
