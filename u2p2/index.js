// implement a linked list
// with functions to work with linked list

import { LinkedList } from './linkedList.js'

//data set 1
let l1 = new LinkedList([2,4,3]);
let l2 = new LinkedList([5,6,4]);
let ans1 = LinkedList.combine(l1, l2);
console.log(LinkedList.print(ans1));

//data set 2
let l3 = new LinkedList([0]);
let l4 = new LinkedList([0]);
let ans2 = LinkedList.combine(l3, l4);
console.log(LinkedList.print(ans2));

//data set 3
let l5 = new LinkedList([9,9,9,9,9,9,9]);
let l6 = new LinkedList([9,9,9,9]);
let ans3 = LinkedList.combine(l5, l6);
console.log(LinkedList.print(ans3));