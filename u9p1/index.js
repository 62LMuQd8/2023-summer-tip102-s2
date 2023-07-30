// solve with adjacency matrix
// https://github.com/codepath/compsci_guides/wiki/Find-the-Town-Judge
import { Town } from './town.js';
console.log(Town.find(2, [[1,2]]));
console.log(Town.find(3, [[1,3],[2,3]]));
console.log(Town.find(3, [[1,3],[2,3],[3,1]]));
console.log(Town.find(1, []));