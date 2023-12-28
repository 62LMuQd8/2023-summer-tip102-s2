import { TreeService } from "./treeService.js";

TreeService.printLevelOrder(TreeService.buildTree([3,9,20,15,7], [9,3,15,20,7]));
TreeService.printLevelOrder(TreeService.buildTree([-1], [-1]));