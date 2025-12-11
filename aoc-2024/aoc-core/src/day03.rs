use regex::Regex;

pub fn solve(input: &str, part_two: bool) -> String {
    let mut re = Regex::new(r"mul\((\d+),(\d+)\)|do\(\)|don't\(\)").unwrap();

    let mut total = 0;
    let mut enabled = true;
    for value in re.captures_iter(input) {
        match &value[0] {
            "do()" => enabled = true,
            "don't()" => enabled = false,
            _ => {
                if enabled || !part_two {
                    total += value[1].parse::<i32>().unwrap() * value[2].parse::<i32>().unwrap();
                }
            }
        }
    }

    total.to_string()
}
