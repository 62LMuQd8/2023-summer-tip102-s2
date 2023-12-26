export class TreeService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Path-Sum
    static hasPathSum(root, targetSum) {
        // return path sum evaluation
        return pathSum(root, targetSum);

        function pathSum(root, sum) {
            // empty tree cannot have path sum
            if (root === null) return false;
            
            // if we are at a leaf node, we have a path sum if remaining sum is equal to value at root
            // this is the same has the condition (0 = sum - root.val) when at leaf node
            if (root.left === null && root.right === null && root.val === sum) return true;

            // else we have a path sum if the left subtree or right subtree has a path sum with the remaining sum amount
            return pathSum(root.left, sum - root.val) || pathSum(root.right, sum - root.val);
        }
    }
}