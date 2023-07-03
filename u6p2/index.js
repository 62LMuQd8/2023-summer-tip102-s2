// https://guides.codepath.org/compsci/Balanced-Binary-Tree
import { Tree } from './tree.js';
let tree1 = new Tree([3,9,20,null,null,15,7]);
let tree2 = new Tree([1,2,2,3,3,null,null,4,4]);
let tree3 = new Tree([7,4,8,3,5,null,9,null,null,2,null,null,null,null,10]);
console.log(tree1.isHeightBalanced());
console.log(tree2.isHeightBalanced());
console.log(tree3.isHeightBalanced());