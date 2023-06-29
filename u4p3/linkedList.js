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

  add(data) {
    let listElement = new ListElement(data);
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

  // numbers are not stored in reverse orders
  // to calculate 7243 + 564, or any two pairs of numbers
  // we add the shorter number to the longer number through recursion
  // and follow the rules of arithmetic
  // for example:
  // 9 -> 9 -> 9 -> null (more number of significant figures)
  // 9 -> 9 -> null (less number of significant figures)
  //   t
  //   hh
  //   ou
  //   un
  //   sd
  //   art0n
  //   neenu
  //   ddnel
  //   ssssl
  // -------
  // c 1110
  // -------
  //    999
  // +   99
  // --------
  //   1098
  //
  // we start by recursing on the longer of the two numbers
  // and we keep track of the column we are on with each iteration
  // the index of the most significant figure (of the longer of the two numbers) is 0
  // once the null node is reached, we return 0 because the carry value is 0
  // (see the ones column and the carry row above)
  //
  // as we travel back up the stack, we add together the values of the column
  // including the carry value returned from last recursion step popped from stack
  // (see the ones and tens columns)
  //
  // in columns where only one number has significant figures
  // we add only the carry and the significant figure of the number
  // (see the hundreds column)
  //
  // when adding any two numbers, the most significant figure of the sum
  // is at most one column over to the most significant figure of the longer number
  // the value of the most significant figure of the sum is determined by
  // the carry of the last column of the longer number (see the thousands column)
  // for example,
  // 999 + 99 = 1098
  // 342 + 45 = 0397
  static addTwoNumbers(ll1, ll2) {
    let carry, ans;
    // use the longer number to recursively find the last carry
    // that determines most significant figure of the sum
    if (ll1.length >= ll2.length) {
      carry = LinkedList.recursion(ll1.head, ll2.head, 0, ll1.length - ll2.length);
    } else {
      carry = LinkedList.recursion(ll2.head, ll1.head, 0, ll2.length - ll1.length);
    }
    // step to point to the correct location in memory b/c we are updating in place
    ans = ll1.length >= ll2.length ? ll1 : ll2;
    // if the carry is 1
    if (carry) {
      // add the 1 to the beginning of the answer
      let newListElement = new ListElement(carry);
      newListElement.next = ans.head;
      ans.head = newListElement;
      ans.length = ans.length + 1;
    }
    // return answer
    return ans;
  }

  // https://en.wikipedia.org/wiki/Significant_figures
  //   12345
  // + 00678
  //   -----
  //   13023
  // in the example above, 12345 has [2] significant figures more than 678
  // (the difference in length of the two numbers)
  // if columns is zero-based index
  // and the most significant figure of the larger number is index 0,
  // in columns at index [0, 1], only the larger number contains significant figures;
  // and in columns at index [2], 3, 4, both numbers contain significant figures
  static recursion(a, b, column, numOfExtraSigFigs) {
    // return carry of 0, if null node is reached
    if (a === null) return 0;
    // in the current column, only the longer number contains a significant figure
    if (numOfExtraSigFigs && column < numOfExtraSigFigs) {
      // look at next column
      let carry = LinkedList.recursion(a.next, b, column + 1, numOfExtraSigFigs);
      // then add carry (from previous step popped from stack)
      // and significant figure of the longer number
      let sum = a.data + carry;
      // update sum (in place)
      a.data = sum % 10;
      // return carry
      return Math.floor(sum / 10);
    } else {
      // look at next column
      let carry = LinkedList.recursion(a.next, b.next, column + 1, numOfExtraSigFigs);
      // then add values of the column
      // including the carry (from previous step popped from stack)
      let sum = a.data + b.data + carry;
      // update sum (in place)
      a.data = sum % 10;
      // return carry
      return Math.floor(sum / 10);
    }
  }
}