import { TreeService } from "./treeService.js";
import { Node } from "./node.js";

console.log(TreeService.findDiameter(getRoot1()));
console.log(TreeService.findDiameter(getRoot2()));

function getRoot1(arr) {
    // [1,2,3,4,5]
    return new Node(1, new Node(2, new Node(4), new Node(5)), new Node(3));
}

function getRoot2(arr) {
    // [1,2]
    return new Node(1, new Node(2));
}