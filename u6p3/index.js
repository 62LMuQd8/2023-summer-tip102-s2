// https://guides.codepath.org/compsci/Symmetric-Tree
import { Tree } from './tree.js';
let tree1 = new Tree([1,2,2,3,4,4,3]);
let tree2 = new Tree([1,2,2,null,3,null,3]);
let tree3 = new Tree([]);
console.log(tree1.isSymmetric());
console.log(tree2.isSymmetric());
console.log(tree3.isSymmetric());