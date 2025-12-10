use std::collections::HashMap;

pub fn solve(input: &str, part_two: bool) -> String {
    let mut left = Vec::new();
    let mut right = Vec::new();

    for line in input.lines() {
        let mut parts = line.split_whitespace();
        match (parts.next(), parts.next()) {
            (Some(l), Some(r)) => {
                match (l.parse::<i32>(), r.parse::<i32>()) {
                    (Ok(left_value), Ok(right_value)) => {
                        left.push(left_value);
                        right.push(right_value);
                    },
                    _ => {}
                }
            },
            _ => {}
        }
    }

    if !part_two {
        left.sort();
        right.sort();

        let total: i32 = left.iter()
        .zip(right.iter())
        .map(|(l, r)| (l-r).abs())
        .sum();

        return total.to_string();
    }

    let mut right_map = HashMap::new();

    for key in right {
        let count = right_map.entry(key).or_insert(0);
        *count += 1;
    }

    let total: i32 = left.iter()
    .map(|value| value * right_map.get(value).unwrap_or(&0))
    .sum();

    total.to_string()
}
