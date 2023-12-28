import { Node } from "./node.js";

// read CodePath's explanation: https://guides.codepath.org/compsci/Construct-Binary-Tree-from-Preorder-and-Inorder-Traversal
// review binary tree traversals: https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
export class TreeService {
    // preorder array tells us the value of each root node, in the order that each root node should be created
    // inorder array tells us where the null nodes are and how to branch the subtrees
    static buildTree(preorder, inorder) {
        // there are no nodes in this subtree, return null node
        if (inorder.length === 0) return null;
        // get the value of current node to be created
        // by removing the first value from preorder array
        // so that we know the value of the next node, and so on and so forth
        // (remember that preorder is root, left child, right child)
        let val = preorder.shift();
        // get the index in the inorder array where value of root node is
        // note: position of root node value divides the inorder array into two halves,
        //       values of left subtree and values of right subtree
        let index = inorder.findIndex(a => a === val);
        // create the root node
        let root = new Node(val);
        // left child of the root node is the left subtree of the root node
        // and in order to create the left subtree we call buildTree() again
        // with the updated preorder array (tells us the value of the next node to be created)
        // and the updated inorder array (subarray containing the node values of the subtree)
        root.left = TreeService.buildTree(preorder, inorder.slice(0, index));
        // likewise, right child of the root node is the right subtree of the root node
        // and in order to create the right subtree we call buildTree() again
        root.right = TreeService.buildTree(preorder, inorder.slice(index + 1));
        // return the root node (with left and right children correctly referenced) to ancestor node
        // another way of seeing this is left and right subtree is completely created
        // or nodes below the current node are completely set up
        return root;
    }

    static printLevelOrder(root) {
        let result = [];
        // edge case when tree is empty
        if (root === null) return result;
        let queue = [];
        // push root node to queue
        queue.push(root);
        // while there are still nodes to visit
        while (queue.length !== 0) {
          // get number of nodes at current level
          let numNodesAtCurrLevel = queue.length;
          let levelNodes = [];
          // visit each node at current level
          for (let i = 0; i < numNodesAtCurrLevel; i++) {
            // and check children (next level) of each node at current level
            // if child nodes present, add to end of queue
            if (queue[0].left !== null) queue.push(queue[0].left);
            if (queue[0].right !== null) queue.push(queue[0].right);
            // record node at current level is visited
            levelNodes.push(queue.shift());
          }
          // all nodes at current level have been visited
          // add record log to result array, go to next level and repeat
          result.push(levelNodes.map(node => node.val));
        }
        console.log(result);
      }
}