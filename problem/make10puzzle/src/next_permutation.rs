pub trait LexicalPermutation {
    fn next_permutation(&mut self) -> bool;
}

impl<T> LexicalPermutation for [T]
where
    T: Ord,
{
    fn next_permutation(&mut self) -> bool {
        if self.len() < 2 {
            return false;
        }

        let mut i = self.len() - 1;
        while i > 0 && self[i - 1] >= self[i] {
            i -= 1;
        }

        if i == 0 {
            return false;
        }

        let mut j = self.len() - 1;
        while j >= i && self[j] <= self[i - 1] {
            j -= 1;
        }

        self.swap(j, i - 1);
        self[i..].reverse();

        true
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn lexical() {
        let mut data = [1, 2, 3];
        let mut c = 0;
        while data.next_permutation() {
            match c {
                0 => assert_eq!(&data, &[1, 3, 2]),
                1 => assert_eq!(&data, &[2, 1, 3]),
                2 => assert_eq!(&data, &[2, 3, 1]),
                3 => assert_eq!(&data, &[3, 1, 2]),
                4 => assert_eq!(&data, &[3, 2, 1]),
                _ => {}
            }
            c += 1;
        }
        assert_eq!(c, 5);
    }
}
