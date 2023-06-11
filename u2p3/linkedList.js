// code template and explanation found here:
// https://www.geeksforgeeks.org/implementation-linkedlist-javascript/
import { ListElement } from './listElement.js'
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

  // palindrame is validated by comparing linked list
  // forwards and backwards with strings
  static validatePalindrome(ll) {
    let forwardStr = LinkedList.read(ll);
    let reverseStr = forwardStr.toString().split('').reverse().join('');
    return forwardStr === reverseStr;
  }

  // reads value stored as linked list
  static read(ll) {
    let current = ll.head;
    let strValue = '';
    for (let i = 0; i < ll.length; i++) {
      // data is appended
      // number will be forward value
      strValue = strValue + current.data;
      current = current.next;
    }
    return strValue;
  }
}