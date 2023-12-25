import { StackService } from "./stackService.js";

// infix notation: 3 * (1 + 2) = 9
console.log(StackService.evalRPN(["2","1","+","3","*"]));

// infix notation: (5 / 13) + 4 = 4
console.log(StackService.evalRPN(["4","13","5","/","+"]));

// infix notation: (5 + (17 + (((-11 * (3 + 9)) / 6) * 10))) = -198
console.log(StackService.evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]));