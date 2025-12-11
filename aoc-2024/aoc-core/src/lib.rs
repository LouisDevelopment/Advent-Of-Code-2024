use wasm_bindgen::prelude::*;

mod day01;
mod day02;
mod day03;
mod day04;

#[wasm_bindgen]
pub fn solve(day: i32, input: &str, part_two: bool) -> String {
    match day {
        1 => day01::solve(input, part_two),
        2 => day02::solve(input, part_two),
        3 => day03::solve(input, part_two),
        4 => day04::solve(input, part_two),
        _ => "Day not implemented".to_string()
    }
}