pub fn next_permutation(array: &mut Vec<&str>) -> bool {
    if array.len() < 2 {
        return false;
    }

    let mut i = array.len() - 1;
    while i > 0 && array[i - 1] >= array[i] {
        i -= 1;
    }

    if i == 0 {
        return false;
    }

    let mut j = array.len() - 1;
    while j >= i && array[j] <= array[i - 1] {
        j -= 1;
    }

    array.swap(j, i - 1);
    array[i..].reverse();

    true
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn next_permutation_ok() {
        let mut data: Vec<&str> = vec!["1", "2", "3"];
        let mut c = 0;
        while next_permutation(&mut data) {
            match c {
                0 => assert_eq!(&data, &["1", "3", "2"]),
                1 => assert_eq!(&data, &["2", "1", "3"]),
                2 => assert_eq!(&data, &["2", "3", "1"]),
                3 => assert_eq!(&data, &["3", "1", "2"]),
                4 => assert_eq!(&data, &["3", "2", "1"]),
                _ => {}
            }
            c += 1;
        }
        assert_eq!(c, 5);
    }
}
