export class TreeService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Binary-Tree-Pruning
    static pruneTree(root) {
        // no nodes in tree, return null
        if (root === null) return root;
        // start traversal
        prune(root);
        // return tree
        return root;

        function prune(root) {
            // we are at null node, return false to start checking whether subtrees
            // contain node with value of 1 (returning true means that ancestor nodes
            // will not prune subtrees that this null node belongs to which is not what we want)
            if (root === null) return false;

            // traverse left subtree and check whether subtree contains a 1
            let skipLeft = prune(root.left);
            // traverse right subtree and check whether subtree contains a 1
            let skipRight = prune(root.right);

            // if left subtree does not contain a 1, prune left subtree
            if (!skipLeft) root.left = null;
            // if right subtree does not contain a 1, prune right subtree
            if (!skipRight) root.right = null;

            // return result of check (whether current subtree contains 1)
            // note: a 1 at parent node or any descendant node means that the current subtree contains a 1
            //       (any true will force expression to eval to true)
            return root.val === 1 || skipLeft || skipRight;
        }
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