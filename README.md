# Sudoku Games

A classic Sudoku game offering a range of game modes and preset clues. Developed using React and Redux, with all algorithms for grid generation and uniqueness checks implemented from scratch.

## Table Of Contents

-   [Demo](#demo)
-   [Features](#features)
-   [Algorithms](#algorithms)
-   [References](#references)

## Demo

https://sudoku-nine-kappa.vercel.app/

## Features

### Game Mode

-   **Classic Mode:** Follows traditional Sudoku rules, filling a 9x9 grid with digits from 1 to 9, ensuring each row, column, and 3x3 subgrid contains each digit once.

-   **Diagonals Mode:** Similar to Classic Sudoku but adds the requirement that each of the two main diagonals of the grid also contains digits from 1 to 9 once.

-   **Even-Odd Mode:** Like Classic Sudoku, players fill a 9x9 grid with digits from 1 to 9. However, there is an extra requirement: darker cells are for even numbers, while lighter cells are for odd numbers.

### Grid Size

Each game mode offers four different grid sizes: 4x4, 6x6, 8x8, and 9x9.

### In-game Assistance

-   **Checks:** Clears erroneous cells from the grid. There are at most 3 checks per game.

-   **Hints:** Reveals the correct value of a randomly selected empty cell. There can be up to 5 hints per game.

-   **Notes:** Enables users to record potential values for each cell, without limitations.

### Difficulty

The level of difficulty is determined flexibly based on the initial number of clues present in the Sudoku grid. You can specify up to $N^2-1$ clues where $N$ represents the size of the grid.

### Other functions

-   Game Restart: Resets the grid to its initial state.
-   Game Pause: Temporarily halts the game, blurring the grid in the process.

## Algorithms

The Sudoku Grid generation can be broken down into two steps:

1. Create a fully filled grid: This step involves generating a Sudoku grid that is completely filled and represents the solution to the puzzle.

2. Elimination Of Clues: Once the fully filled grid is generated, clues are systematically eliminated to create a playable grid that will be presented to the user.

### Grid Generation

To generate the Sudoku grid, we employ a backtracking algorithm, meticulously filling each cell step by step. An optimization strategy is implemented, attempting to solve the Sudoku grid using traditional methods first. For further details, refer to the [code](src/algorithms/index.ts#L14).

### Elimination Of Clues

After creating a fully-filled grid, begin the process of elimination. Grid clues are removed one at a time. At each step, we ensure that the puzzle maintains a unique and solvable solution. For more information, refer to the code [here](src/algorithms/index.ts#L79).

## References

-   [Online Sudoku Solver](https://www.thonky.com/sudoku/solution-count) – To ensure that my grid generation algorithm produces a unique solution
-   [Color Palette](https://coolors.co/) – Color combination ideas
-   [Font Awesome](https://fontawesome.com/icons) - Free Icons
-   [Google Fonts](https://fonts.google.com/) - Free custom fonts
-   [Sudoku.com](https://sudoku.com/) – Inspiration for the design
