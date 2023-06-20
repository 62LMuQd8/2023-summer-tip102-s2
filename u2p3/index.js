// implement a linked list to validate palindrome in O(n) time
import { LinkedList } from './linkedList.js'
//data set 1
let l1 = new LinkedList([1,2,2,1]);
console.log(LinkedList.validatePalindrome(l1));
console.log(LinkedList.isPalindromeRecursion(l1));
console.log(LinkedList.isPalindromeSplitReverse(l1));

//data set 2
let l2 = new LinkedList([1,2]);
console.log(LinkedList.validatePalindrome(l2));
console.log(LinkedList.isPalindromeRecursion(l2));
console.log(LinkedList.isPalindromeSplitReverse(l2));

//data set 3
let l3 = new LinkedList([3,4,3,8,7,6,4,4,6,7,8,3,4,3]);
console.log(LinkedList.validatePalindrome(l3));
console.log(LinkedList.isPalindromeRecursion(l3));
console.log(LinkedList.isPalindromeSplitReverse(l3));

//data set 4
let l4 = new LinkedList([3,4,3,8,7,6,4,6,7,8,3,4,3]);
console.log(LinkedList.validatePalindrome(l4));
console.log(LinkedList.isPalindromeRecursion(l4));
console.log(LinkedList.isPalindromeSplitReverse(l4));

//data set 5
let l5 = new LinkedList([3,4,3,8,7,6,4,6,7,8,9,4,3]);
console.log(LinkedList.validatePalindrome(l5));
console.log(LinkedList.isPalindromeRecursion(l5));
console.log(LinkedList.isPalindromeSplitReverse(l5));