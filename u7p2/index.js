// https://guides.codepath.org/compsci/Kth-Smallest-Element-in-a-BST
import { Tree } from './tree.js';
let tree1 = new Tree([3,1,4,null,2]);
let tree2 = new Tree([5,3,6,2,4,null,null,1]);
let tree3 = new Tree([31,27,51,9,29]);
console.log(tree1.getKthSmallest(1));
console.log(tree2.getKthSmallest(3));
console.log(tree1.getKthSmallest(2));
console.log(tree2.getKthSmallest(5));
console.log(tree3.getKthSmallest(3));
console.log(tree3.getKthSmallest(5));
console.log(tree3.getKthSmallest(6));
console.log(tree3.getKthSmallest(0));