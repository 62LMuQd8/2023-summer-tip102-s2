// https://guides.codepath.org/compsci/Insert-Into-a-Binary-Search-Tree
import { Tree } from './tree.js';
let tree1 = new Tree([4,2,7,1,3]);
let tree2 = new Tree([40,20,60,10,30,50,70]);
let tree3 = new Tree([4,2,7,1,3,null,null,null,null,null,null]);
tree1.addData(5);
tree2.addData(25);
tree3.addData(5);
Tree.print(tree1);
Tree.print(tree2);
Tree.print(tree3);