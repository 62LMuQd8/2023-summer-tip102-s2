// code template and explanation found here:
// https://www.geeksforgeeks.org/implementation-linkedlist-javascript/
import { ListElement } from './listElement.js'
export class LinkedList {
  constructor(initData) {
    this.head = null;
    this.length = 0;
    for (const data of initData) {
      // data can be num or str
      // parseInt will cast either to num
      this.add(Number.parseInt(data));
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

  static combine(ll1, ll2) {
    let numValue1 = LinkedList.read(ll1);
    let numValue2 = LinkedList.read(ll2);
    let cValue = numValue1 + numValue2;
    // calculated value must be reversed
    // before creating new linked list
    let rValue = cValue.toString().split('').reverse().join('');
    return new LinkedList(Array.from(rValue));
  }

  // reads value stored as linked list
  static read(ll) {
    let current = ll.head;
    let strValue = '';
    for (let i = 0; i < ll.length; i++) {
      // data is prepended
      // because number is stored in reverse order
      strValue = current.data + strValue;
      current = current.next;
    }
    return Number.parseInt(strValue);
  }

  // helper print function to validate implementation
  static print(ll) {
    let arrayEquivalent = [];
    let current = ll.head;
    for (let i = 0; i < ll.length; i++) {
      arrayEquivalent.push(current.data);
      current = current.next;
    }
    return JSON.stringify(arrayEquivalent);
  }
}