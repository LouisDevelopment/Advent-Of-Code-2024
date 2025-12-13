use std::collections::HashSet;

pub fn solve(input: &str, part_two: bool) -> String {
    let grid: Vec<Vec<char>> = input.lines().map(|line| line.chars().collect()).collect();
    let rows = grid.len();
    let cols = grid[0].len();

    let dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)];
    let mut dir_idx = 0;

    let mut guard_pos = (0, 0);

    'outer: for (r, row) in grid.iter().enumerate() {
        for (c, &ch) in row.iter().enumerate() {
            if ch == '^' {
                guard_pos = (r, c);
                break 'outer;
            }
        }
    }

    let mut visited = HashSet::new();
    
    loop {
        visited.insert(guard_pos);

        let (dr, dc) = dirs[dir_idx];
        let next_r = guard_pos.0 as i32 + dr;
        let next_c = guard_pos.1 as i32 + dc;

        if next_r < 0 || next_r >= rows as i32 || next_c < 0 || next_c >= cols as i32 {
            break;
        }

        let nr = next_r as usize;
        let nc = next_c as usize;

        if grid[nr][nc] == '#' {
            dir_idx = (dir_idx + 1) % 4;
        } else {
            guard_pos = (nr, nc);
        }
    }

    visited.len().to_string()
}