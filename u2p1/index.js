// implement a linked list
// return linked list
// with nth node removed, starting from end of list

import { LinkedList } from './linkedList.js'

//data set 1
let linkedList1 = new LinkedList([1,2,3,4,5]);
console.log(linkedList1.remove(2))

//data set 2
let linkedList2 = new LinkedList([1]);
console.log(linkedList2.remove(1))

//data set 3
let linkedList3 = new LinkedList([1,2]);
console.log(linkedList3.remove(1))