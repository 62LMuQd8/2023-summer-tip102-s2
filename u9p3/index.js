// solve with adjacency list
// https://github.com/codepath/compsci_guides/wiki/Find-if-Path-Exists-in-Graph
import { GraphUtil } from './graphUtil.js';
console.log('with DFS...')
console.log(GraphUtil.findDFS(3, [[0,1],[1,2],[2,0]], 0 ,2));
console.log(GraphUtil.findDFS(6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5));
console.log(GraphUtil.findDFS(1, [], 0, 0));
console.log('\nwith BFS...')
console.log(GraphUtil.findBFS(3, [[0,1],[1,2],[2,0]], 0 ,2));
console.log(GraphUtil.findBFS(6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5));
console.log(GraphUtil.findBFS(1, [], 0, 0));