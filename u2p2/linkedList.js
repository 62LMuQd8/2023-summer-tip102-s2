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

  // https://github.com/codepath/compsci_guides/wiki/Add-Two-Numbers
  // numbers are stored in reverse order
  // so that two numbers can be added in this way:
  //
  // carry [0, 1, 1, 0, 0]
  //       [4, 3, 2, 8, 7]
  //     + [6, 8, 4]
  // ----------------------
  //       [0, 2, 7, 8, 7]
  //
  // explanation: 78234 + 486 = 78720
  
  static addTwoNumbers(ll1, ll2) {
    let result = [];
    let v1 = ll1.head;
    let v2 = ll2.head;
    let carry = 0;
    // loop through both linked list until both lists are entirely read
    // and carry digit is 0 (no carry digit)
    // https://en.wikipedia.org/wiki/Carry_(arithmetic)
    // https://en.wikipedia.org/wiki/Elementary_arithmetic
    while (v1 !== null || v2 !== null || carry !== 0) {
      let a = v1 !== null ? v1.data : 0;
      let b = v2 !== null ? v2.data : 0;
      // compute sum of a and b
      // sum of a and b can be no more than 18 b/c (9 + 9)
      let sum = a + b + carry;
      // carry is the value in the tens column of the sum
      carry = Math.floor(sum / 10);
      // value of the current column
      // or node is the ones column of the sum
      result.push(sum % 10);
      if (v1 !== null) v1 = v1.next;
      if (v2 !== null) v2 = v2.next;
    }
    return new LinkedList(result);
  }
}