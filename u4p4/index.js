import { StackService } from "./stackService.js";

console.log(StackService.validateSequence([1,2,3,4,5], [4,5,3,2,1]));
console.log(StackService.validateSequence([1,2,3,4,5], [4,3,5,1,2]));
console.log(StackService.validateSequence([0], [0]));