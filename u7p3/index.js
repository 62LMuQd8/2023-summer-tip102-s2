// https://guides.codepath.org/compsci/Validate-Binary-Search-Tree
import { Tree } from './tree.js';
let tree1 = new Tree([2,1,3]);
let tree2 = new Tree([5,1,4,null,null,3,6]);
let tree3 = new Tree([1]);
console.log(tree1.isValidBinarySearchTree());
console.log(tree2.isValidBinarySearchTree());
console.log(tree3.isValidBinarySearchTree());