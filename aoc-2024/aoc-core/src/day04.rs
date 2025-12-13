pub fn solve(input: &str, part_two: bool) -> String {
    let mut total = 0;
    let grid: Vec<Vec<char>> = input.lines().map(|line| line.chars().collect()).collect();
    if !part_two {
        let target = "xmas";

        let first_char = target.chars().nth(0).unwrap();
        for (r, row) in grid.iter().enumerate() {
            for (c, char) in row.iter().enumerate() {
                if char.eq_ignore_ascii_case(&first_char) {
                    total += check_neighbours(&grid, (r, c), (1, target), None) as i32;
                }
            }
        }
    } else {
        let anchor = 'a';
        
        for (r, row) in grid.iter().enumerate() {
            for (c, char) in row.iter().enumerate() {
                if char.eq_ignore_ascii_case(&anchor) {
                    total += find_x_mas(&grid, (r, c)) as i32;
                }
            }
        }
    }
    total.to_string()
}

fn find_x_mas(grid: &Vec<Vec<char>>, pos: (usize, usize)) -> u8 {
    let mut total = 0;

    if pos.0 >= 1 && pos.0+1 < grid.len() && pos.1 >= 1 && pos.1+1 < grid[0].len() {
        if [grid[pos.0-1][pos.1-1].to_ascii_lowercase(), grid[pos.0+1][pos.1+1].to_ascii_lowercase()].contains(&'m') && [grid[pos.0-1][pos.1-1].to_ascii_lowercase(), grid[pos.0+1][pos.1+1].to_ascii_lowercase()].contains(&'s'){
            if [grid[pos.0-1][pos.1+1].to_ascii_lowercase(), grid[pos.0+1][pos.1-1].to_ascii_lowercase()].contains(&'m') && [grid[pos.0-1][pos.1+1].to_ascii_lowercase(), grid[pos.0+1][pos.1-1].to_ascii_lowercase()].contains(&'s'){
                total += 1;
            }
        }
    }
    total
}

fn check_neighbours(
    grid: &Vec<Vec<char>>, 
    root: (usize, usize), 
    target: (usize, &str), 
    dir: Option<(i32, i32)>
) -> u8 {
    if target.0 >= target.1.len() { return 1; }

    let target_char = target.1.chars().nth(target.0).unwrap();
    let mut total = 0;
    if let Some((dr, dc)) = dir {
        let next_r = root.0 as i32 + dr;
        let next_c = root.1 as i32 + dc;

        if next_r >= 0 && next_r < grid.len() as i32 && next_c >= 0 && next_c < grid[0].len() as i32 {
            let nr = next_r as usize;
            let nc = next_c as usize;
            if grid[nr][nc].eq_ignore_ascii_case(&target_char) {
                total += check_neighbours(grid, (nr, nc), (target.0 + 1, target.1), dir);
            }
        }
    } else {
        for dr in -1..=1 {
            for dc in -1..=1 {
                if dr == 0 && dc == 0 { continue; }

                let next_r = root.0 as i32 + dr;
                let next_c = root.1 as i32 + dc;

                if next_r >= 0 && next_r < grid.len() as i32 && next_c >= 0 && next_c < grid[0].len() as i32 {
                    let nr = next_r as usize;
                    let nc = next_c as usize;
                    
                    if grid[nr][nc].eq_ignore_ascii_case(&target_char) {
                        total += check_neighbours(grid, (nr, nc), (target.0 + 1, target.1), Some((dr, dc)))
                    }
                }
            }
        }
    }
    total
}