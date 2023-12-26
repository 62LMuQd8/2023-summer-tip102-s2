export class TreeService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Diameter-of-Binary-Tree
    static findDiameter(root) {
        // keep track of max distance between two nodes in tree (this is the diameter)
        let max = 0;
        
        // traverse the tree
        diameter(root);
    
        // return diameter
        return max;

        function diameter(root) {
            // height of null node is 0
            // height of a node is defined number of edges in longest path from node to leaf
            if (root === null) return 0;

            // get height of left subtree
            let leftHeight = diameter(root.left);
            // get height of right subtree
            let rightHeight = diameter(root.right);

            // height of parent is the max height between left and right subtrees
            let parentHeight = Math.max(leftHeight, rightHeight);
            
            // parent node connects left and right subtree
            // so we add the heights of left and right subtrees to get diameter,
            // we also update the diameter tracker
            max = Math.max(max, leftHeight + rightHeight);
            
            // return current height plus one additional edge
            // b/c we are returning height of parent to ancestor node
            return parentHeight + 1;
        }
    }
}