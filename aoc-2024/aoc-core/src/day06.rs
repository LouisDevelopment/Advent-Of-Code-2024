use std::collections::HashSet;

pub fn solve(input: &str, part_two: bool) -> String {
    let mut grid: Vec<Vec<char>> = input.lines().map(|line| line.chars().collect()).collect();
    let rows = grid.len();
    let cols = grid[0].len();
    
    let mut start_pos = (0, 0);
    let dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)];

    'outer: for r in 0..rows {
        for c in 0..cols {
            if grid[r][c] == '^' {
                start_pos = (r, c);
                grid[r][c] = '.'; 
                break 'outer;
            }
        }
    }

    if !part_two {
        let mut visited = HashSet::new();
        let mut pos = start_pos;
        let mut dir = 0;

        loop {
            visited.insert(pos);
            
            let (dr, dc) = dirs[dir];
            let next_r = pos.0 as i32 + dr;
            let next_c = pos.1 as i32 + dc;

            if next_r < 0 || next_r >= rows as i32 || next_c < 0 || next_c >= cols as i32 {
                break;
            }

            if grid[next_r as usize][next_c as usize] == '#' {
                dir = (dir + 1) % 4;
            } else {
                pos = (next_r as usize, next_c as usize);
            }
        }
        return visited.len().to_string();
    } else {
        let mut candidates = HashSet::new();
        let mut pos = start_pos;
        let mut dir = 0; 
        
        loop {
            candidates.insert(pos);
            let (dr, dc) = dirs[dir];
            let next_r = pos.0 as i32 + dr;
            let next_c = pos.1 as i32 + dc;

            if next_r < 0 || next_r >= rows as i32 || next_c < 0 || next_c >= cols as i32 {
                break;
            }

            if grid[next_r as usize][next_c as usize] == '#' {
                dir = (dir + 1) % 4;
            } else {
                pos = (next_r as usize, next_c as usize);
            }
        }

        candidates.remove(&start_pos);

        let mut loop_count = 0;

        for cand in candidates {
            grid[cand.0][cand.1] = '#';

            if check_for_loop(&grid, start_pos, 0, &dirs) {
                loop_count += 1;
            }

            grid[cand.0][cand.1] = '.';
        }

        return loop_count.to_string();
    }
}

fn check_for_loop(
    grid: &Vec<Vec<char>>, 
    start: (usize, usize), 
    start_dir: usize, 
    dirs: &[(i32, i32)]
) -> bool {
    let rows = grid.len();
    let cols = grid[0].len();
    
    let mut pos = start;
    let mut dir = start_dir;

    let mut visited = vec![vec![[false; 4]; cols]; rows];

    loop {
        if visited[pos.0][pos.1][dir] {
            return true;
        }
        visited[pos.0][pos.1][dir] = true;

        let (dr, dc) = dirs[dir];
        let next_r = pos.0 as i32 + dr;
        let next_c = pos.1 as i32 + dc;

        if next_r < 0 || next_r >= rows as i32 || next_c < 0 || next_c >= cols as i32 {
            return false;
        }

        if grid[next_r as usize][next_c as usize] == '#' {
            dir = (dir + 1) % 4;
        } else {
            pos = (next_r as usize, next_c as usize);
        }
    }
}