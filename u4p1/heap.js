// code template and explanation found here:
// https://stackfull.dev/heaps-in-javascript
export class Heap {
    constructor(heap) {
      this.heap = [];
    }
  
    add(key) {
      // add key as leaf in left most position
      this.heap.push(key);
      // bubble key up to correct position in order to satisfy max heap condition
      // which is every parent node must be greater than its child nodes 
      this.trickleUp();
    }
  
    trickleUp() {
      // start pointer at new leaf node (right most leaf node)
      let curr = this.heap.length - 1;
      // keep looping until root node is reached
      // no root node to a root node!
      while (curr > 0) {
        // get parent node of the current node
        let parent = Math.floor((curr-1)/2)
        // if current node is greater than parent node, then swap nodes
        if( this.heap[curr] > this.heap[parent] ) {
          [ this.heap[curr], this.heap[parent] ] =
            [ this.heap[parent], this.heap[curr] ];
          // move pointer to the parent node
          curr = parent
        } else{
          // max heap condition satisfied before reaching root, exit loop
          break;
        }
      }
    }
  
    remove() {
      // start pointer at right most leaf node
      const n = this.heap.length;
      // swap root node and right most lead node
      [this.heap[0], this.heap[n-1]] = [this.heap[n-1], this.heap[0]];
      // delete root node
      const removedKey = this.heap.pop();
      // bubble down right most leaf node in order to satisfy max heap condition
      this.trickleDown();
      // return deleted root node
      return removedKey;
    }
  
    trickleDown() {
      // start pointer at right most leaf node
      // which should now be at the root position
      let curr = 0;
      // keep looping until current node does not have a left child,
      // which means we have reached a leaf node,
      // see definition of a complete binary tree
      while(2*curr + 1 < this.heap.length){
        // get pointers for left child and right child
        const leftIndex = 2*curr+1; 
        const rightIndex = 2*curr+2;
        // get greater of left or right child
        // and check that right child is within array
        // check of left child is done in condition of while loop
        const maxChildIndex = (rightIndex < this.heap.length) &&
          (this.heap[rightIndex] > this.heap[leftIndex]) ? rightIndex : leftIndex;
        // if max child node is greater than current node, swap nodes
        if(this.heap[maxChildIndex] > this.heap[curr]){
          [this.heap[maxChildIndex], this.heap[curr]] =
            [this.heap[curr], this.heap[maxChildIndex]]
          // move pointer to max child node
          curr = maxChildIndex
        } else {
          // max heap condition satisfied before reaching leaf, exit loop
          break;
        }
      }
    }
  }