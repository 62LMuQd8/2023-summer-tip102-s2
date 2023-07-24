// https://github.com/codepath/compsci_guides/wiki/Number-of-Islands
import { Islands } from './islands.js';
let grid1 = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];
let grid2 = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
];
let grid3 = [
  ["0","0","1","0","0"],
  ["0","0","0","0","0"],
  ["0","0","0","0","0"],
  ["0","0","1","0","0"]
];
console.log('Solving with DFS...');
console.log(Islands.getNumberOfIslandsDFS(JSON.parse(JSON.stringify(grid1))));
console.log(Islands.getNumberOfIslandsDFS(JSON.parse(JSON.stringify(grid2))));
console.log(Islands.getNumberOfIslandsDFS(JSON.parse(JSON.stringify(grid3))));
console.log('\nSolving with BFS...');
console.log(Islands.getNumberOfIslandsBFS(JSON.parse(JSON.stringify(grid1))));
console.log(Islands.getNumberOfIslandsBFS(JSON.parse(JSON.stringify(grid2))));
console.log(Islands.getNumberOfIslandsBFS(JSON.parse(JSON.stringify(grid3))));
