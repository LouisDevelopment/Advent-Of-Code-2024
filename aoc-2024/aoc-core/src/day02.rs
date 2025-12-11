
pub fn solve(input: &str, part_two: bool) -> String {
    
    input.lines().filter(| line | {
        let values = line.split_whitespace()
        .map(|val| val.parse::<i32>().unwrap()).collect::<Vec<i32>>();
        if is_safe(&values) {
            return true
        } else if part_two {
            for i in 0..values.len() {
                let mut temp = values.clone();
                temp.remove(i);

                if is_safe(&temp) {
                    return true
                }
            }
        }
        false
    })
    .count()
    .to_string()
}

fn is_safe(report: &[i32]) -> bool{
    report.windows(2).all(|val| val[1]-val[0] > 0 && val[1]-val[0] <= 3) || 
    report.windows(2).all(|val| val[0]-val[1] > 0 && val[0]-val[1] <= 3)
}
