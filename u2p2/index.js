// implement a linked list
// with functions to work with linked list

import { LinkedList } from './linkedList.js'

//data set 1
let l1 = new LinkedList([2,4,3]);
let l2 = new LinkedList([5,6,4]);
console.log(LinkedList.print(LinkedList.combine(l1, l2)));
console.log(LinkedList.print(LinkedList.addTwoNumbers(l1, l2)));

//data set 2
let l3 = new LinkedList([0]);
let l4 = new LinkedList([0]);
console.log(LinkedList.print(LinkedList.combine(l3, l4)));
console.log(LinkedList.print(LinkedList.addTwoNumbers(l3, l4)));

//data set 3
let l5 = new LinkedList([9,9,9,9,9,9,9]);
let l6 = new LinkedList([9,9,9,9]);
console.log(LinkedList.print(LinkedList.combine(l5, l6)));
console.log(LinkedList.print(LinkedList.addTwoNumbers(l5, l6)));

//data set 4
let l7 = new LinkedList([4,3,2,8,7]);
let l8 = new LinkedList([6,8,4]);
console.log(LinkedList.print(LinkedList.combine(l7, l8)));
console.log(LinkedList.print(LinkedList.addTwoNumbers(l7, l8)));