import { ListService } from "./listService.js";
import { Node } from "./node.js";

export class ArrayService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Remove-Duplicates-from-Sorted-List-II
    static removeDuplicates(nums) {
        // transform nums array into linked list
        let head = ListService.createLinkedList(nums);
        // create temp node that points to head
        // temp node will always point to head (like a dynamic anchor)
        // (even if head changes from original linked list,
        // like when first node is removed from original linked list)
        let temp = new Node(null, head);
        // current node starts at head (first node in linked list)
        // note: we check whether there are duplicates for this node
        let curr = head;
        // previous node starts at temp node (dynamic anchor, in case first node changes)
        // note: all nodes before and including previous node are guaranteed to be dedupped
        let prev = temp;

        // while there are still nodes to look at
        while (curr) {
            // starting from the current node
            // we look at the next node of current node
            let next = curr.next;

            // if the next node is a duplicate of current node
            if (next && next.val === curr.val) {
                // then we check if there are more duplicates of current node
                while (next.next && next.next.val === curr.val) {
                    next = next.next;
                }
                // the previous node now points to the last duplicate of current node
                prev.next = next;
                // the last duplicate of current node is now the previous node
                prev = next;
                // and the current node is now the next node to check for duplicates
                curr = next.next;
            } else {
                // else the next node is unique (no duplicates),
                // the current node becomes the previous node
                prev = curr;
                // and the next node becomes the current node
                curr = next;
            }
        }

        // convert linked list to array before returning answer
        return ListService.linkedListToArray(temp.next);
    }
}