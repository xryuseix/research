use anyhow::{bail, Result};

pub struct RpnCalculator(bool);

impl RpnCalculator {
    pub fn new() -> Self {
        RpnCalculator(false)
    }

    pub fn eval(&self, tokens_input: &Vec<&str>) -> Result<f64> {
        let mut tokens = tokens_input.clone();
        tokens.reverse();
        let mut stack = Vec::new();
        let mut pos = 0;

        while let Some(token) = tokens.pop() {
            pos += 1;

            if let Ok(x) = token.parse::<f64>() {
                stack.push(x);
            } else if stack.len() >= 2 {
                let y = stack.pop().expect("invalid syntax");
                let x = stack.pop().expect("invalid syntax");

                let res = match token {
                    "+" => x + y,
                    "-" => x - y,
                    "*" => x * y,
                    "/" => {
                        if y == 0.0 {
                            bail!("division by zero");
                        }
                        x / y
                    }
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

    // 式FにCをかける/割る時，Fの先頭と末尾に括弧が必要かどうか判定する
    fn is_need_paren(&self, formula: String, rev: bool) -> bool {
        for token in formula.chars() {
            if token == '+' || token == '-' {
                return true;
            } else if (!rev && token == '(') || (rev && token == ')') {
                return false;
            }
        }
        false
    }

    // RPNを中置記法に変換する
    pub fn rpn_to_infix(&self, rpn_formula: String) -> Result<String> {
        let mut infix: Vec<String> = Vec::new();
        for (pos, token) in rpn_formula.split(' ').enumerate() {
            if let Ok(_num) = token.parse::<i64>() {
                infix.push(token.to_string());
            } else if infix.len() >= 2 {
                let mut y = infix.pop().expect("invalid syntax");
                let mut x = infix.pop().expect("invalid syntax");
                if token != "+" {
                    // 括弧をつける
                    if token == "*" || token == "/" {
                        if self.is_need_paren(x.clone(), false)
                            || self.is_need_paren(x.chars().rev().collect::<String>(), true)
                        {
                            x = format!("({})", x);
                        }
                    }
                    if self.is_need_paren(y.clone(), false)
                        || self.is_need_paren(y.chars().rev().collect::<String>(), true)
                    {
                        y = format!("({})", y);
                    }
                }
                let xy = format!("{} {} {}", x, token, y);
                infix.push(xy);
            } else {
                bail!("invalid syntax at {}", pos);
            }
        }
        if infix.len() != 1 {
            bail!("invalid syntax");
        }
        Ok(infix[0].clone())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_rpn_ok() {
        let calc = RpnCalculator::new();
        assert_eq!(calc.eval(&vec!["5"]).unwrap(), 5.0);
        assert_eq!(calc.eval(&vec!["50"]).unwrap(), 50.0);
        assert_eq!(calc.eval(&vec!["-50"]).unwrap(), -50.0);

        assert_eq!(calc.eval(&vec!["2", "3", "+"]).unwrap(), 5.0);
        assert_eq!(calc.eval(&vec!["2", "3", "*"]).unwrap(), 6.0);
        assert_eq!(calc.eval(&vec!["2", "3", "-"]).unwrap(), -1.0);
        assert_eq!(calc.eval(&vec!["2", "3", "/"]).unwrap(), 2.0 / 3.0);
        assert_eq!(
            calc.eval(&vec!["1", "2", "+", "3", "4", "+", "*"]).unwrap(),
            21.0
        );
        assert_eq!(
            calc.eval(&vec!["4", "3", "1", "/", "*", "2", "-"]).unwrap(),
            10.0
        );
    }

    #[test]
    fn test_rpn_ng() {
        let calc = RpnCalculator::new();
        assert!(calc.eval(&vec!["1", "1"]).is_err());
        assert!(calc.eval(&vec!["1", "1", "^"]).is_err());
        assert!(calc.eval(&vec!["1", "1", "-", "+"]).is_err());
    }

    #[test]
    fn test_rpn_to_infix() {
        let calc = RpnCalculator::new();
        {
            let rpn = vec!["4", "3", "1", "/", "*", "2", "-"].join(" ");
            let infix = calc.rpn_to_infix(rpn);
            assert_eq!(infix.unwrap(), "4 * 3 / 1 - 2".to_string());
        }
        {
            let rpn = vec!["6", "1", "-", "1", "1", "+", "*"].join(" ");
            let infix = calc.rpn_to_infix(rpn);
            assert_eq!(infix.unwrap(), "(6 - 1) * (1 + 1)".to_string());
        }
        {
            let rpn = vec!["4", "1", "+", "1", "6", "-", "-"].join(" ");
            let infix = calc.rpn_to_infix(rpn);
            assert_eq!(infix.unwrap(), "4 + 1 - (1 - 6)".to_string());
        }
    }
}
