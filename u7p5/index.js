import { TreeService } from "./treeService.js";
import { Node } from "./node.js";

console.log(TreeService.printLevelOrder(TreeService.pruneTree(getInput1())));
console.log(TreeService.printLevelOrder(TreeService.pruneTree(getInput2())));
console.log(TreeService.printLevelOrder(TreeService.pruneTree(getInput3())));

function getInput1() {
    return new Node(1, null, new Node(0, new Node(0), new Node(1)));
}

function getInput2() {
    return new Node(1, new Node(0, new Node(0), new Node(0)), new Node(1, new Node(0), new Node(1)));
}

function getInput3() {
    return new Node(1,
        new Node(1, new Node(1, new Node(0)), new Node(1)),
        new Node(0, new Node(0), new Node(1))
    );
}