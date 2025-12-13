use std::collections::HashSet;
use std::cmp::Ordering;

pub fn solve(input: &str, part_two: bool) -> String {
    let parts: Vec<&str> = input.split("\n\n").collect();
    let rules_section = parts[0];
    let updates_section = parts[1];

    let mut rules = HashSet::new();
    for line in rules_section.lines() {
        if let Some((left, right)) = line.split_once('|') {
            let a: i32 = left.trim().parse().unwrap();
            let b: i32 = right.trim().parse().unwrap();
            rules.insert((a, b));
        }
    }

    let mut total = 0;

    for line in updates_section.lines() {
        let mut update: Vec<i32> = line.split(',').map(|n| n.trim().parse().unwrap()).collect();
        
        if is_ordered(&update, &rules) {
            if !part_two {
                total += update[update.len() / 2];
            }
        } else {
            if part_two {
                update.sort_by(|a, b| {
                    if rules.contains(&(*a, *b)) {
                        Ordering::Less
                    } else if rules.contains(&(*b, *a)) {
                        Ordering::Greater
                    } else {
                        Ordering::Equal
                    }
                });
                
                total += update[update.len() / 2];
            }
        }
    }

    total.to_string()
}

fn is_ordered(update: &[i32], rules: &HashSet<(i32, i32)>) -> bool {
    for i in 0..update.len() {
        for j in i + 1..update.len() {
            let page_a = update[i];
            let page_b = update[j];

            if rules.contains(&(page_b, page_a)) {
                return false;
            }
        }
    }
    true
}