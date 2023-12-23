import { ListService } from "./listService.js";
import { Node } from "./node.js";

export class ArrayService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Swap-Nodes-In-Pairs
    static swapPairs(nums) {
        // transform nums array into linked list
        let head = ListService.createLinkedList(nums);
        // create temp node that points to head
        // temp node will always point to head (like a dynamic anchor)
        // (even if head changes from original linked list,
        // like when first node is removed from original linked list,
        // or when first node is swapped with another node in the original linked list)
        let temp = new Node(null, head);
        // previous node starts at temp node (dynamic anchor, in case first node changes)
        let prev = temp;

        // continue to swap if there are at least 2 swappable nodes remaining
        //
        // (prev)   (head)
        //  temp ---> a ---> b ---> c ---> d
        //
        while (head && head.next) {
            // create temp pointer to first swappable node
            //
            // (prev)   (head)
            //  temp ---> a ---> b ---> c ---> d
            //            ^
            let a = head;

            // create temp pointer to second swappable node
            //
            // (prev)   (head)
            //  temp ---> a ---> b ---> c ---> d
            //            ^      ^
            let b = head.next;

            // previous node points to second swappable node
            //
            // (prev)   (head)
            //  temp      a ---> b ---> c ---> d
            //    \_____________/
            prev.next = b;

            // first swappable node points to second swappable node's next node
            //
            //              __________
            //             /          \
            // (prev)   (head)         \
            //  temp      a      b ---> c ---> d
            //     \____________/
            a.next = b.next;

            // second swappable node points to first swappable node
            //
            //              __________
            //             /          \
            // (prev)   (head)         \
            //  temp      a <--- b      c ---> d
            //     \____________/
            //
            // now, starting from previous node, we can traverse to node c in a s shape path
            //
            // reordering the graph, we have this diagram
            //
            // (prev)          (head)
            //  temp ---> b ---> a ---> c ---> d
            //
            // which is node a and b swapped
            b.next = a;

            // node a is now the previous node
            //
            //                 (head)
            //                 (prev)
            //  temp ---> b ---> a ---> c ---> d
            prev = a

            // and the node that node a is pointing to is the new head
            //
            //                 (prev) (head)
            //  temp ---> b ---> a ---> c ---> d
            head = a.next;
        }

        // convert linked list to array before returning answer
        return ListService.linkedListToArray(temp.next);
    }
}