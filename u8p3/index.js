// https://github.com/codepath/compsci_guides/wiki/Battleships-in-a-Board
import { BoardGames } from './boardGames.js';
let grid1 = [
  ["X",".",".","X"],
  [".",".",".","X"],
  [".",".",".","X"]
];
let grid2 = [["."]];
let grid3 = [["X"]];
console.log(BoardGames.getNumberOfShips(grid1));
console.log(BoardGames.getNumberOfShips(grid2));
console.log(BoardGames.getNumberOfShips(grid3));
