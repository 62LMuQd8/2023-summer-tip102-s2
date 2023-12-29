export class Node {
  constructor(val, left, right) {
    this.val = val ?? null;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}