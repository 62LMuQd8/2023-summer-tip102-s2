import { DataElement } from './dataElement.js';
export class Tree {
  constructor(arr) {
    // edge case - initialize tree as null node
    // in case arr is not provided
    this.root = null;
    // convert array into tree
    if (arr) this.root = this.generateTree(arr, 0);
  }

  // https://www.geeksforgeeks.org/construct-complete-binary-tree-given-array/
  // order of nodes in array is same as heap data structure, see u4p1
  generateTree(arr, i) {
    // create null node
    let root = null;
    // if value at index in array is null, or index is outside of array,
    // return null node
    if (arr[i] === null || i >= arr.length) return root;
    // else create a parent node with value at index in array
    // note: the initial node of the tree is the root node,
    // all other nodes are either parent nodes (with or without children)
    root = new DataElement(arr[i]);
    // create left child node
    root.left = this.generateTree(arr, 2 * i + 1);
    // create right child node
    root.right = this.generateTree(arr, 2 * i + 2);
    // return parent node
    return root;
  }

  // https://www.geeksforgeeks.org/level-order-tree-traversal/
  // note: tree must be height balanced
  // in order to correctly print all nodes
  static print(tree) {
    // get root of tree
    let root = tree.root;
    // get height of tree which is longest path from root to leaf
    let h = Tree.height(root);
    // output array
    let o = [];
    // root is level 1
    // step through each level
    for (let i = 1; i <= h; i++) {
      // and add each node at the level to output array
      Tree.buildLevel(root, i, o);
    }
    // remove trailing nulls at end of output array
    while (o[o.length - 1] === null) o.pop();
    // print output array
    console.log(JSON.stringify(o));
  }

  //        7
  //       / \
  //      4   8
  //     / \   \
  //    3   5   9
  //       /     \
  //      2       10
  // each node is at a level (1,2...,h)
  // so the height function returns the taller height
  // of either the left or right sub-tree plus the current level,
  // see nodes at 2 and 4, or nodes at 10 and 8 in graph
  static height(root) {
    // return 0 if null node reached
    if (root === null) return 0;
    // get height of left sub-tree
    let left = Tree.height(root.left);
    // get height of right sub-tree
    let right = Tree.height(root.right);
    // returns taller height of either left or right sub-tree
    // plus the current level
    return left > right ? left + 1 : right + 1;
  }

  // we are starting at the root node
  // and must traverse down level amount of times
  // before we can record the nodes at each level
  static buildLevel(root, level, output) {
    // we reached a null node
    // record null node and return
    if (root === null) { output.push(null); return; }
    //      ---------------------||---------------------
    //                index      || actual level in root
    //      ---------------------||---------------------
    // level when --->  5        ||          1
    // entering         4        ||          2
    // buildLevel(...)  3        ||          3
    //                  2        ||          4
    //                  1        ||          5
    // we traverse down to the correct level
    // and record node data
    if (level === 1) output.push(root.data);
    // if level index is greater than 1
    // this means we are not at the corrrect level
    // and must continue level descent
    if (level > 1) {
      // look at left child that is next level down
      Tree.buildLevel(root.left, level - 1, output);
      // look at right child that is next level down
      Tree.buildLevel(root.right, level - 1, output);
    }
  }

  isValidBinarySearchTree() {
    let root = this.root;
    // start validation here
    // root node must be between the min and max values allowed
    // for Javascript Numbers object (these are system values)
    return this.binarySearchTree(root, Number.MIN_VALUE, Number.MAX_VALUE);
  }

  binarySearchTree(root, minValue, maxValue) {
    // reached a null node, valid by default
    // does not contradict problem statement definition of binary search tree
    if (root === null) return true;
    // check if value of current node is in range, if not, return false
    // or equals operators used because problem statement excludes duplicates
    if (root.data <= minValue || root.data >= maxValue) return false;
    // left node value must be smaller than value of current node
    // or between min allowed system value and value at current node
    return this.binarySearchTree(root.left, minValue, root.data)
      // right node value must bigger than value of current node
      // or between value at current node and max allowed system value
      && this.binarySearchTree(root.right, root.data, maxValue);
  }
}