// stack, queue, or heap ?
// stream is a java api that wraps around collections (arrays, maps, etc)
// to process a collection (e.g. get the max value of an array)
// however solution requires us to use stack, queue, or heap
// problem statement is most similar to max heap;
// can continually to remove max key until kth key.
// key uniquessness can be ignored for this problem per prompt.

import { KthLargest } from './kthLargest.js'
const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
console.log(kthLargest.add(3));
console.log(kthLargest.add(5));
console.log(kthLargest.add(10));
console.log(kthLargest.add(9));
console.log(kthLargest.add(4));