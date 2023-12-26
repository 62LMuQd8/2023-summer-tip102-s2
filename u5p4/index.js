import { ArrayService } from "./arrayService.js";

console.log(ArrayService.maxWaterRecursion([1,8,6,2,5,4,8,3,7]));
console.log(ArrayService.maxWaterRecursion([1,1]));
console.log(ArrayService.maxWaterRecursion([3,2,10,5]));

console.log();

console.log(ArrayService.maxWaterIterative([1,8,6,2,5,4,8,3,7]));
console.log(ArrayService.maxWaterIterative([1,1]));
console.log(ArrayService.maxWaterIterative([3,2,10,5]));