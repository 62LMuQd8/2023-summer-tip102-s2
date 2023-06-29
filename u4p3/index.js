import { LinkedList } from './linkedList.js';

let l1, l2;

// data set 1
l1 = new LinkedList([7,2,4,3]);
l2 = new LinkedList([5,6,4]);
console.log(LinkedList.print(LinkedList.addTwoNumbers(l1, l2)));

// data set 2
l1 = new LinkedList([2,4,3]);
l2 = new LinkedList([5,6,4]);
console.log(LinkedList.print(LinkedList.addTwoNumbers(l1, l2)));

// data set 3
l1 = new LinkedList([0]);
l2 = new LinkedList([0]);
console.log(LinkedList.print(LinkedList.addTwoNumbers(l1, l2)));

// data set 4
l1 = new LinkedList([5,6,4]);
l2 = new LinkedList([7,2,4,3]);
console.log(LinkedList.print(LinkedList.addTwoNumbers(l1, l2)));

// data set 5
l1 = new LinkedList([9,9,9]);
l2 = new LinkedList([9,9,9,9,9]);
console.log(LinkedList.print(LinkedList.addTwoNumbers(l1, l2)));