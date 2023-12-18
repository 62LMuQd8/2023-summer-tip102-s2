// code template and explanation found here:
// https://www.geeksforgeeks.org/implementation-linkedlist-javascript/
import { ListElement } from './listElement.js'
// read CodePath's explanation: https://guides.codepath.org/compsci/Remove-Nth-Node-from-End-of-List
export class LinkedList {
  constructor(initData) {
    this.head = null;
    this.length = 0;
    for (const data of initData) {
      this.add(data);
    }
  }

  add(data){
    let listElement = new ListElement(data);

    // validations (optional) - adding for completion's sake
    // can bubble error instead of return string
    if (this.length < 0 && this.length > 29)
      return 'length of linked list can be at most 30';
    if (data < 0 && data > 100)
      return 'value of data must be between 0 and 100';

    // if the linked list is empty
    if (!this.head) {
      this.head = listElement;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = listElement;
    }
    this.length++;
  }

  // [4, 7, 2, 10]
  // key = 1
  // index is 4 - 1 = 3
  remove(rIndex) {
    // validations (optional) - adding for completion's sake
    // can bubble error instead of return string
    if (rIndex < 1 && rIndex > this.length)
      return 'index is between 1 and length of linked list';

    // need the current node and previous node
    // current node can get next node with current.next
    // update the next link in the previous node
    // with the next link in the current node
    // in order to delete the current node
    let previous = null;
    let current = null;
    for (let i = 0; i <= this.length - rIndex; i++) {
      if (i === 0) {
        current = this.head;
      } else {
        previous = current;
        current = current.next;
      }
    }
    this.length--;

    // check all combinations of previous and current
    // to account for edge cases such as linked list with only 1 node
    // or removing the first node of the linked list, etc
    if (!previous && !current.next) {
      this.head = null;
      return this.print();
    }
    if (!previous && current.next) {
      this.head = head.next;
      return this.print();
    }
    if (previous && current.next) {
      previous.next = current.next;
      return this.print();
    }
    if (previous && !current.next) {
      previous.next = current.next;
      return this.print();
    }
  }

  // helper print function to validate implementation
  print() {
    let arrayEquivalent = [];
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      arrayEquivalent.push(current.data);
      current = current.next;
    }
    return JSON.stringify(arrayEquivalent);
  }
}