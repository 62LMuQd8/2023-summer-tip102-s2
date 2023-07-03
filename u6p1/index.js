// 
import { Tree } from './tree.js';
// for problem sets in u6 and u7
// require code that converts array
// into actual tree data structure / class
// initial test data
console.log('Testing array parser...');
Tree.print(new Tree([1,2,3,4,5]));

// u6 test data
Tree.print(new Tree([1,2,3,null,5]));
Tree.print(new Tree([1]));
Tree.print(new Tree([3,9,20,null,null,15,7]));
Tree.print(new Tree([1,2,2,3,3,null,null,4,4]));
Tree.print(new Tree([]));
Tree.print(new Tree([1,2,2,3,4,4,3]));
Tree.print(new Tree([1,2,2,null,3,null,3]));

// u7 test data
Tree.print(new Tree([4,2,7,1,3]));
Tree.print(new Tree([40,20,60,10,30,50,70]));
Tree.print(new Tree([4,2,7,1,3,null,null,null,null,null,null]));
Tree.print(new Tree([3,1,4,null,2]));
Tree.print(new Tree([5,3,6,2,4,null,null,1]));
Tree.print(new Tree([2,1,3]));
Tree.print(new Tree([5,1,4,null,null,3,6]));
console.log()

// Binary Tree Paths
console.log('u6p1 outputs...');
let tree1 = new Tree([1,2,3,null,5]);
let tree2 = new Tree([1]);
tree1.displayRLPaths();
tree2.displayRLPaths();