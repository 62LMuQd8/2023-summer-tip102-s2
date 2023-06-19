// approximating square roots

// use newton / heron / babylonian method:
// https://tutorial.math.lamar.edu/Classes/CalcI/NewtonsMethod.aspx
// https://courses.csail.mit.edu/6.006/spring11/rec/rec23.pdf

// or use perfect squares method:
// https://courses.lumenlearning.com/wm-prealgebra/chapter/estimating-and-approximating-square-roots/

// or use a sort of continuous version of binary search method to approximate square roots to the decimals:
// https://www.geeksforgeeks.org/calculating-n-th-real-root-using-binary-search/l

// we are going to implement a discrete / bin version of binary search to approximate floored square roots

import { SquareRoot } from './squareRoot.js'
let squareRoot = new SquareRoot();
// recursion
console.log('Recursion');
console.log('---------');
console.log(squareRoot.getSquareRootRecursion(4));
console.log(squareRoot.getSquareRootRecursion(8));
console.log(squareRoot.getSquareRootRecursion(0));
console.log(squareRoot.getSquareRootRecursion(99));
console.log(squareRoot.getSquareRootRecursion(100));
console.log(squareRoot.getSquareRootRecursion(101));
console.log(squareRoot.getSquareRootRecursion(76435));
console.log();
// iterative
console.log('Iterative');
console.log('---------');
console.log(squareRoot.getSquareRootIterative(4));
console.log(squareRoot.getSquareRootIterative(8));
console.log(squareRoot.getSquareRootIterative(0));
console.log(squareRoot.getSquareRootIterative(99));
console.log(squareRoot.getSquareRootIterative(100));
console.log(squareRoot.getSquareRootIterative(101));
console.log(squareRoot.getSquareRootIterative(76435));