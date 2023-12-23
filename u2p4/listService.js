import { Node } from "./node.js";

export class ListService {
  static createLinkedList(array) {
    // create null node (start with empty linked list)
    // head is always the first node in a linked list
    let head = null;
    // for each value in array
    for (const val of array) {
      // insert at end of linked list
      add(val);
    }
    // return head of linked list
    return head;

    function add(val) {
      // create new node from value
      let newNode = new Node(val);
      // if linked list is empty
      if (!head) {
        // the new node is head
        head = newNode;
      } else {
        // else we add the new node to the end of the linked list
        // so we create a temporary pointer to head
        let current = head;
        // loop until we are at the last node in linked list
        while (current.next) {
          current = current.next;
        }
        // and add the new node to the end of the last node in linked list
        current.next = newNode;
      }
    }
  }

  static linkedListToArray(head) {
    // output
    let array = [];
    // pointer to head
    let current = head;
    // for each node in linked list
    while (current) {
      // add value of node to array
      array.push(current.val);
      // go to next node
      current = current.next;
    }
    // return output
    return array;
  }
}