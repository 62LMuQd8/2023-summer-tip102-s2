// implement a linked list to validate palindrome in O(n) time
import { LinkedList } from './linkedList.js'
//data set 1
let l1 = new LinkedList([1,2,2,1]);
console.log(LinkedList.validatePalindrome(l1));

//data set 2
let l2 = new LinkedList([1,2]);
console.log(LinkedList.validatePalindrome(l2));