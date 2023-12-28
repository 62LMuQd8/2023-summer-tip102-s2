import { MatrixService } from "./matrixService.js";

console.log(MatrixService.floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2));
console.log(MatrixService.floodFill([[0,0,0],[0,0,0]], 0, 0, 0));
console.log(MatrixService.floodFill([[1,0,0],[0,1,0],[0,0,1]], 0, 0, 0));