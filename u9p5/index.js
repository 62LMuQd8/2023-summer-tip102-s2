import { TreeService } from "./treeService.js";
import { Node } from "./node.js";

TreeService.printLevelOrder(TreeService.addRowDFS(getInput1(), 1, 2));
TreeService.printLevelOrder(TreeService.addRowDFS(getInput2(), 1, 3));
TreeService.printLevelOrder(TreeService.addRowDFS(getInput3(), 1, 1));

console.log();

TreeService.printLevelOrder(TreeService.addRowBFS(getInput1(), 1, 2));
TreeService.printLevelOrder(TreeService.addRowBFS(getInput2(), 1, 3));
TreeService.printLevelOrder(TreeService.addRowBFS(getInput3(), 1, 1));

function getInput1() {
    // [4,2,6,3,1,5]
    return new Node(4,
        new Node(2, new Node(3), new Node(1)),
        new Node(6, new Node(5))
    );
}

function getInput2() {
    // [4,2,null,3,1]
    return new Node(4, new Node(2, new Node(3), new Node(1)));
}

function getInput3() {
    // [1]
    return new Node(1);
}