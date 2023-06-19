// implement binary search
// iterative or recursive ?
import { BinarySearch } from './binarySearch.js'
let arr = [-1,0,3,5,9,12];
console.log(BinarySearch.findIterative(arr, 9));
console.log(BinarySearch.findRecursive(arr, 9));
console.log(BinarySearch.findIterative(arr, 2));
console.log(BinarySearch.findRecursive(arr, 2));