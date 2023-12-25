import { ArrayService } from "./arrayService.js";

// comments are index of pivot
console.log(ArrayService.findBugPivot([5])) // -1
console.log(ArrayService.findBugPivot([5,6,7,4,1,2,3])); // 3
console.log(ArrayService.findBugPivot([2, 1])); // 0
console.log(ArrayService.findBugPivot([3,4,5,6,7,2,1])); // 5
console.log(ArrayService.findBugPivot([7,6,1,2,3,4,5])); // 1
console.log(ArrayService.findBugPivot([3,2,1])); // 1
console.log(ArrayService.findBugPivot([3,1,2])); // 0
console.log(ArrayService.findBugPivot([3,4,5,6,2,1])) // 4
console.log(ArrayService.findBugPivot([6,5,1,2,3,4])) // 1
console.log(ArrayService.findBugPivot([1,2,3,4,5,6])) // -1
console.log(ArrayService.findBugPivot([1,2,3])) // -1

console.log();

// comments for index of target
console.log(ArrayService.search([4,5,6,7,0,1,2], 0)); // 4
console.log(ArrayService.search([4,5,6,7,0,1,2], 3)); // -1
console.log(ArrayService.search([1], 0)); // - 1
console.log(ArrayService.search([1,2,3,4,5,6,7], 6)); // 5
console.log(ArrayService.search([6,7,1,2,3,4,5], 2)); // 3
console.log(ArrayService.search([], 5)); // -1
console.log(ArrayService.search([3,4,5,6,7,1,2], 7)); // 4
console.log(ArrayService.search([1,2,3,4,5,6], 4)); // 3
console.log(ArrayService.search([3,4,5,6,1,2], 2)); // 5
console.log(ArrayService.search([5,6,1,2,3,4], 1)); // 2
console.log(ArrayService.search([2,3,4,5,6,7,8,9,10,11,12,13,14,15,1], 8)); // 6
console.log(ArrayService.search([20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 14)); // 14
console.log(ArrayService.search([8,9,10,1,2,3,4,5], 1)); // 3