import { Heap } from './heap.js'

// read CodePath's explanation: https://guides.codepath.org/compsci/Kth-Largest-Element-in-an-Array
export class KthLargest {
  static parseKth(nums, k) {
    let removedKey;
    let heapObj = new Heap();
    // heapify array of nums
    for (const num of nums) {
      heapObj.add(num);
    }
    // remove k number of nums from array
    for (let i = 0; i < k; i++) {
      removedKey = heapObj.remove();
    }
    // return kth largest num
    return removedKey;
  }
}