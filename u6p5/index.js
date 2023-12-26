import { TreeService } from "./treeService.js";
import { Node } from "./node.js";

console.log(TreeService.hasPathSum(getRoot1(), 22));
console.log(TreeService.hasPathSum(getRoot2(), 5));
console.log(TreeService.hasPathSum(getRoot3(), 0));

function getRoot1() {
    // [5,4,8,11,null,13,4,7,2,null,null,null,1]
    return new Node(5,
        new Node(4, new Node(11, new Node(7), new Node(2))),
        new Node(8, new Node(13), new Node(4, null, new Node(1)))
    );
}

function getRoot2() {
    // [1,2,3]
    return new Node(1, new Node(2), new Node(3));
}

function getRoot3() {
    // []
    return null;
}