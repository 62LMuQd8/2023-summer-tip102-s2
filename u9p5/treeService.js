import { Node } from "./node.js";

// read CodePath's explanation: https://guides.codepath.org/compsci/Add-One-Row-to-Tree
export class TreeService {
    static addRowDFS(root, val, depth) {
        // val cannot be added at any depth from null node
        // (e.g. val cannot be inserted at correct depth if depth > tree depth)
        if (root === null) return root;

        // we are at root node (top of tree)
        // so create new root node and assign original root as right subtree
        if (depth === 1) return new Node(val, root);

        // we are at the correct insertion depth = (depth of val - 1)
        if (depth === 2) {
            // original left subtree is now the left subtree of the new parent
            // and the original parent is the ancestor of the new parent
            root.left = new Node(val, root.left, null);
            // original right subtree is not the right subtree of the new parent
            // and the original parent is the ancestor of the new parent
            root.right = new Node(val, null, root.right);
            // backtrack up the tree
            return root;
        }

        // else we are not at the correct depth
        // so keep on traversing down the tree
        // and at each step we decrement the depth counter
        // to know when we have reached the correct insertion depth
        TreeService.addRowDFS(root.left, val, depth - 1);
        TreeService.addRowDFS(root.right, val, depth -1);

        // backtrack up the tree
        return root;
    }

    static addRowBFS(root, val, depth) {
        // val cannot be added at any depth from null node
        if (root === null) return root;

        // we are at root node (top of tree)
        // so create new root node and assign original root as right subtree
        if (depth === 1) return new Node(val, root);

        // create queue for bfs traversal
        let queue = [root];

        // continue descending until we are at correct insertion depth = (depth of val - 1)
        while (depth > 2) {
            // for each node at current level
            for (let i = 0; i < queue.length; i++) {
                let node = queue.shift();
                // if node has left or right child
                // then add child nodes to queue (represents next level on tree)
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            // we are done with current level
            // update tracker to show next level
            // (level numbers are inverted b/c we started at depth instead of 1
            // and we stop traversing down when depth = 2 instead of depth of val - 1)
            depth -= 1;
        }

        for (const node of queue) {
            // original left subtree is now the left subtree of the new parent
            // and the original parent is the ancestor of the new parent
            node.left = new Node(val, node.left, null);
            // original right subtree is not the right subtree of the new parent
            // and the original parent is the ancestor of the new parent
            node.right = new Node(val, null, node.right);
        }

        // return top of tree with val inserted at correct depth
        // (or val not inserted in depth > tree depth)
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