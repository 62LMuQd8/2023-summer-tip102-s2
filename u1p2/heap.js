// code template and explanation found here:
// https://stackfull.dev/heaps-in-javascript
export class Heap {
  constructor(heap) {
    if (heap) {
      this.heap = heap;
    } else {
      this.heap = [];
    }
  }

  add(key) {
    this.heap.push(key);
    this.trickleUp();
  }

  trickleUp() {
    let curr = this.heap.length - 1;
    while (curr > 0) {
      let parent = Math.floor((curr-1)/2)
      if( this.heap[curr] > this.heap[parent] ) {
        [ this.heap[curr], this.heap[parent] ] =
          [ this.heap[parent], this.heap[curr] ];
        curr = parent
      } else{
        break
      }
    }
  }
  
  remove() {
    const n = this.heap.length;
    [this.heap[0], this.heap[n-1]] = [ this.heap[n-1], this.heap[0]]
    const removedKey = this.heap.pop();
    this.trickleDown();
    return removedKey;
  }

  trickleDown() {
    let curr = 0;
    while(2*curr + 1 < this.heap.length){
      const leftIndex = 2*curr+1; 
      const rightIndex = 2*curr+2;
      const maxChildIndex = (rightIndex < this.heap.length) &&
        (this.heap[rightIndex] > this.heap[leftIndex]) ? rightIndex : leftIndex;
      if(this.heap[maxChildIndex] > this.heap[curr]){
        [this.heap[maxChildIndex], this.heap[curr]] =
          [this.heap[curr], this.heap[maxChildIndex]]
        curr = maxChildIndex
      } else {
        break
      }
    }
  }

  cloneHeap() {
    return new Heap(JSON.parse(JSON.stringify(this.heap)));
  }
}