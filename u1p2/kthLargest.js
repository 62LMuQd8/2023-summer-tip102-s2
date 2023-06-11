import { Heap } from './heap.js'
export class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heapObj = new Heap();
    for (const num of nums) {
      this.heapObj.add(num);
    }
  }

  add(val) {
    this.heapObj.add(val);
    let clone = this.heapObj.cloneHeap();
    let removedKey;
    for (let i = 0; i < this.k; i++) {
      removedKey = clone.remove();
    }
    return removedKey;
  }
}