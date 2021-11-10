use anyhow::{bail, Result};
use std::collections::HashMap;

struct RpnCalculator(bool);

impl RpnCalculator {
    pub fn new(verbose: bool) -> Self {
        Self(verbose)
    }

    pub fn eval(&self, tokens_input: &Vec<&str>) -> Result<i32> {
        let mut tokens = tokens_input.clone();
        tokens.reverse();
        let mut stack = Vec::new();
        let mut pos = 0;

        while let Some(token) = tokens.pop() {
            pos += 1;

            if let Ok(x) = token.parse::<i32>() {
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

            // `-v`オプションが指定されている場合は、この時点でのトークンとスタックの状態を出力
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
    priority: HashMap<&'a str, i32>,
    verbose: bool,
}

impl<'a> Calculator<'a> {
    pub fn new(verbose: bool) -> Self {
        let priority: HashMap<&'a str, i32> = [
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

    pub fn eval(&self, formula: &str) -> Result<i32> {
        let mut tokens = formula.split_whitespace().collect::<Vec<_>>();
        self.eval_inner(&mut tokens)
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
            let is_x_num = x.parse::<i32>().is_ok();
            let is_y_num = y.parse::<i32>().is_ok();
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
                } else if tokens[pos + 1] != "(" && tokens[pos + 1].parse::<i32>().is_err() {
                    // "("の後ろは"("または数値である
                    return Ok((false, pos));
                }
            } else if token == &")" {
                paren -= 1;
                if pos == 0 {
                    // 先頭に")"はない
                    return Ok((false, pos));
                } else if tokens[pos - 1] != ")" && tokens[pos - 1].parse::<i32>().is_err() {
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

    fn eval_inner(&self, tokens: &Vec<&str>) -> Result<i32> {
        let (valid, pos) = self.validate(tokens)?;
        if !valid {
            bail!("invalid syntax at {}", pos);
        }
        let mut stack = Vec::new();
        let mut rpn_formula: Vec<&str> = Vec::new();
        for (_pos, token) in tokens.iter().enumerate() {
            if let Ok(_x) = token.parse::<i32>() {
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

pub fn calc(formula: String, verbose: bool) -> Result<String, anyhow::Error> {
    let calc = Calculator::new(verbose);
    let ans = match calc.eval(&formula) {
        Ok(answer) => format!("{}", answer),
        Err(e) => format!("[ERROR] {}", e),
    };
    return Ok(ans);
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
        let calc = Calculator::new(false);
        assert_eq!(calc.eval("2").unwrap(), 2);
        assert_eq!(calc.eval("2 + 3").unwrap(), 5);
        assert_eq!(calc.eval("2 + 3 * 4").unwrap(), 14);
        assert_eq!(calc.eval("2 - 3 + 4").unwrap(), 3);
        assert_eq!(calc.eval("1 + 2 * 3 - 4 + 5").unwrap(), 8);
        assert_eq!(calc.eval("( 5 - 3 ) * ( 1 + 2 ) + 10").unwrap(), 16);
        assert_eq!(calc.eval("( ( 1 + 3 ) * 2 ) * 3").unwrap(), 24);
    }

    #[test]
    fn test_calc_ng() {
        let calc = Calculator::new(false);
        assert!(calc.eval("").is_err());
        assert!(calc.eval("( )").is_err());
        assert!(calc.eval("2 3").is_err());
        assert!(calc.eval("2 + + 3").is_err());
        assert!(calc.eval("( 1 + 2 ) ( 3 + 4 )").is_err());
        assert!(calc.eval("1 + ) 3 + 4 ( + 5").is_err());
        assert!(calc.eval("( 1 + 2 ) )").is_err());
        assert!(calc.eval("( + ) * 3").is_err());
    }
}
