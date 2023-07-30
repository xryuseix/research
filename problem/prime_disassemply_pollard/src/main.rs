use std::collections::HashMap;
use std::io;
use std::time::Instant;

// verifyed with https://judge.yosupo.jp/submission/64249

fn pow_mod_i128(mut x: i128, mut n: i64, modulo: i64) -> i64 {
    let mut res: i64 = 1;
    while n > 0 {
        if n & 1 == 1 {
            res = ((res as i128 * x) % (modulo as i128)) as i64;
        }
        x = x * x % (modulo as i128);
        n >>= 1;
    }
    return res;
}

fn miller_rabin(x: i64) -> bool {
    if x <= 2 {
        return x == 2;
    }
    if x % 2 == 0 {
        return false;
    }
    let mut d: i64 = x - 1;
    while d % 2 == 0 {
        d /= 2;
    }
    for a in vec![2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37] {
        if x <= a {
            return true;
        }
        let mut t: i64 = d;
        let mut y: i64 = pow_mod_i128(a as i128, t, x);
        while t != x - 1 && y != 1 && y != x - 1 {
            y = ((y as i128) % (x as i128) * (y as i128) % (x as i128)) as i64;
            t <<= 1;
        }
        if y != x - 1 && t % 2 == 0 {
            return false;
        }
    }
    return true;
}
fn gcd(a: i64, b: i64) -> i64 {
    if b > 0 {
        return gcd(b, a % b);
    } else {
        return a;
    }
}

fn pollard_single(n: i64) -> i64 {
    let rand = |x: i64| {
        return (((x as i128) % (n as i128) * (x as i128) % (n as i128) + 1) % (n as i128)) as i64;
    };
    if miller_rabin(n) {
        return n;
    }
    if n % 2 == 0 {
        return 2;
    }
    let mut st: i64 = 0;
    loop {
        st += 1;
        let mut x: i64 = st;
        let mut y: i64 = rand(x);
        let mut d: i64 = 1;
        while d == 1 {
            d = gcd(y - x + n, n);
            if d == n || d == 0 {
                break;
            } else if d != 1 {
                return d;
            }
            x = rand(x);
            y = rand(rand(y));
        }
    }
}

// 受け取るときにソートすること
fn pollard_rho(n: i64) -> HashMap<i64, i32> {
    if n == 1 {
        return HashMap::new();
    }
    let x = pollard_single(n);
    if x == n {
        let mut primes: HashMap<i64, i32> = HashMap::new();
        primes.insert(x, 1);
        return primes;
    };
    let mut primes: HashMap<i64, i32> = pollard_rho(x);
    let primes_inverse: HashMap<i64, i32> = pollard_rho(n / x);
    for (prime, num) in &primes_inverse {
        let count = primes.entry(*prime).or_insert(0);
        *count += num;
    }
    return primes;
}

fn main() {
    let mut tmp = String::new();
    io::stdin().read_line(&mut tmp).expect("");
    tmp.pop();
    let q: i32 = tmp.parse::<i32>().unwrap();
    let mut cache: HashMap<i64, HashMap<i64, i32>> = HashMap::new();
    for _i in 0..q {
        tmp = String::new();
        io::stdin().read_line(&mut tmp).expect("");
        tmp.pop();
        let n: i64 = tmp.parse::<i64>().unwrap();
        let start = Instant::now();
        let ans: HashMap<i64, i32> = match cache.contains_key(&n) {
            true => cache.get(&n).unwrap().clone(),
            false => {
                let primes: HashMap<i64, i32> = pollard_rho(n);
                cache.insert(n, primes.clone());
                primes
            }
        };
        let end = start.elapsed();
        let mut ans_vec:Vec<i64> = Vec::new();
        for (prime, num) in &ans {
            for _j in 0..*num {
                ans_vec.push(*prime);
            }
        }
        print!("size: {}, prime: [", ans_vec.len());
        ans_vec.sort();
        for prime in ans_vec {
            print!(" {}", prime);
        }
        println!(" ] (elapsed: {:.3}ms)", end.as_secs_f64() * 1000.0);
    }
}

#[cfg(test)]

mod tests {
    use super::*;

    #[test]
    fn pow_mod_test() {
        assert_eq!(pow_mod_i128(2, 3, 100), 8);
        assert_eq!(pow_mod_i128(2, 137, 101), 55);
        assert_eq!(pow_mod_i128(763478678686668, 453, 1000000007), 67898578);
    }
    #[test]
    fn isprime_test() {
        assert_eq!(miller_rabin(2), true);
        assert_eq!(miller_rabin(1), false);
        assert_eq!(miller_rabin(11), true);
        assert_eq!(miller_rabin(51), false);
        assert_eq!(miller_rabin(1000000007), true);
        assert_eq!(miller_rabin(998244353), true);
    }
    #[test]
    fn gcd_test() {
        assert_eq!(gcd(2, 2), 2);
        assert_eq!(gcd(12, 3), 3);
        assert_eq!(gcd(17 * 11, 101 * 17), 17);
        assert_eq!(
            gcd(998244353 * 1000000009, 998244353 * 1000000007),
            998244353
        );
    }
    #[test]
    fn factorize_test() {
        {
            let mut primes: HashMap<i64, i32> = HashMap::new();
            primes.insert(2, 2);
            primes.insert(3, 1);
            assert_eq!(pollard_rho(12 as i64), primes)
        }
        {
            let primes: HashMap<i64, i32> = HashMap::new();
            assert_eq!(pollard_rho(1 as i64), primes)
        }
        {
            let mut primes: HashMap<i64, i32> = HashMap::new();
            primes.insert(7, 1);
            assert_eq!(pollard_rho(7 as i64), primes)
        }
        {
            let mut primes: HashMap<i64, i32> = HashMap::new();
            primes.insert(3, 1);
            primes.insert(104719755119659931, 1);
            assert_eq!(pollard_rho(314159265358979793 as i64), primes)
        }
        {
            let mut primes: HashMap<i64, i32> = HashMap::new();
            primes.insert(999665081, 1);
            primes.insert(999716071, 1);
            assert_eq!(pollard_rho(999381247093216751), primes)
        }
        {
            let mut primes: HashMap<i64, i32> = HashMap::new();
            primes.insert(3, 5);
            primes.insert(5, 3);
            primes.insert(41, 2);
            primes.insert(157321, 2);
            assert_eq!(pollard_rho(1263739024124850375), primes)
        }
    }
}