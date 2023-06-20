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

  // https://github.com/codepath/compsci_guides/wiki/Palindrome-Linked-Lists
  static isPalindromeRecursion(ll) {
    let ref = ll.head;
    // inner function is able to access outer function b/c of closure feature
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    function recursion(curr) {
      if (curr) {
        // this recursion call will call recursion on every element in linked list
        // until the null node (which will return true)
        // then Javascript will move back up the call stack
        // and check each element by comparing curr with ref:
        //
        // palindrome? [1,2,3,4,5,4,3,2,1]
        // ref data is encapsulated with parentheses ()
        // curr data is encapsulated with curly braces {}
        //
        // [(1), 2, 3, 4, 5, 4, 3, 2, 1, {null}] -> return true;
        // [(1), 2, 3, 4, 5, 4, 3, 2, {1}, null] -> return true;
        // [1, (2), 3, 4, 5, 4, 3, {2}, 1, null] -> return true;
        // [1, 2, (3), 4, 5, 4, {3}, 2, 1, null] -> return true;
        // [1, 2, 3, (4), 5, {4}, 3, 2, 1, null] -> return true;
        // [1, 2, 3, 4, {(5)}, 4, 3, 2, 1, null] -> return true;
        // [1, 2, 3, {4}, 5, (4), 3, 2, 1, null] -> return true;
        // [1, 2, {3}, 4, 5, 4, (3), 2, 1, null] -> return true;
        // [1, {2}, 3, 4, 5, 4, 3, (2), 1, null] -> return true;
        // [{1}, 2, 3, 4, 5, 4, 3, 2, (1), null] -> return true;
        //
        if (!recursion(curr.next)) return false;
        if (ref.data !== curr.data) {
          return false;
        } else {
          ref = ref.next;
        }
      }
      return true;
    }
    return recursion(ll.head);
  }

  // https://github.com/codepath/compsci_guides/wiki/Palindrome-Linked-Lists
  static isPalindromeSplitReverse(ll) {
    // clone linked list because we will be updating references on linked list
    let clone = LinkedList.clone(ll);
    // if linked list is empty or only contains 1 element
    // then linked list must be a palindrome
    if (!clone.head || !clone.head.next) {
      return true;
    }
    // two pointer method to find the mid point of a linked list
    // this works b/c fast pointer moves twice as fast as slow pointer
    // for every 1 step by slow pointer, fast pointer moves 2 steps
    //
    // -------------------------
    // slow        |        fast
    // -------------------------
    // 1 step      |     2 steps
    // 2 steps     |     4 steps
    // 3 steps     |     6 steps
    // 4 steps     |     8 steps
    // 5 steps     |    10 steps
    // -------------------------
    let slow = clone.head;
    let fast = clone.head;
    // keep looping until fast point reaches end of linked list
    // fast pointer will stop just before moving to null node
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    // start of the left half
    let left = clone.head;
    // start of the right half
    let right = slow;
    // flip the right half in order to compare
    let revRight = LinkedList.reverse(right);
    // keep looping until either left or right halves reaches null node
    //
    // palindrome? [1,2,3,4,5,4,3,2,1,null] - odd length (ignore null node)
    // left half: [1,2,3,4,null]
    // right half: [5,4,3,2,1,null]
    // reverse right half: [1,2,3,4,5,null]
    //
    // palindrome? [1,2,3,4,4,3,2,1,null] - even length (ignore null node)
    // left half: [1,2,3,4,null]
    // right half: [4,3,2,1,null]
    // reverse right half: [1,2,3,4,null]
    //
    // in the examples above, we see that valid palindromes
    // may differ by one element, but the element is shared
    // between the left and right halves.
    // splitting the linked list in two halves
    // guarantees that either halves will differ only by one element
    // and comparisons up to this element should be equal for valid palindromes
    while (left && revRight) {
      if (left.data !== revRight.data) return false;
      left = left.next;
      revRight = revRight.next;
    }
    return true;
  }

  // helper linked list clone function
  static clone(ll) {
    let curr = ll.head;
    let arr = [];
    while (curr !== null) {
      arr.push(curr.data);
      curr = curr.next;
    }
    return new LinkedList(arr);
  }

  static reverse(head) {
    // if head is null, return null
    if (!head) return head;
    let curr = head;
    let prev = null;
    let nextNode;
    // keep looping until current node is null node
    while (curr) {
      // get next node
      nextNode = curr.next;
      // current node's next node is previous node
      // fliping which way the arrow is pointing
      curr.next = prev;
      // done updating, move to next node
      // by first setting current node as previous node
      prev = curr;
      // and changing current node to next node
      curr = nextNode;
    }
    // return previous node b/c current node is null
    return prev;
  }
}