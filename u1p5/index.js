import { MyQueue } from './myQueue.js';

let myQueue = new MyQueue();

myQueue.push(1);
myQueue.push(2);
console.log(myQueue.peek());
console.log(myQueue.pop());
console.log(myQueue.empty());
console.log(myQueue.pop());