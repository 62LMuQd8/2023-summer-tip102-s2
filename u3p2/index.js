// https://en.wikipedia.org/wiki/Binary_search_algorithm#Procedure_for_finding_the_leftmost_element
// problem statement is to find the first bad version in an array of versions
// that makes use of an api which returns whether a version is bad
// api calls are required to be minimized => run time O(log(n))
import { Version } from './version.js'
const version1 = new Version(4);
const version2 = new Version(5)
const version3 = new Version(1)
const version4 = new Version(28)
// recursion
console.log('Recursion');
console.log('---------');
console.log(version1.getFirstBadVersionRecursion(5));
console.log(version2.getFirstBadVersionRecursion(5));
console.log(version3.getFirstBadVersionRecursion(1));
console.log(version4.getFirstBadVersionRecursion(56));
console.log();
// iterative
console.log('Iterative');
console.log('---------');
console.log(version1.getFirstBadVersionIterative(5));
console.log(version2.getFirstBadVersionIterative(5));
console.log(version3.getFirstBadVersionIterative(1));
console.log(version4.getFirstBadVersionIterative(56));