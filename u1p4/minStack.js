// read CodePath's explanation: https://guides.codepath.org/compsci/Min-Stack
export class MinStack {
    constructor() {
        this.stack = [];
    }

    push(val) {
        // if stack is empty
        // push new value onto stack, and minimum is new value
        if (this.stack.length === 0) {
            this.stack.push([val, val]);
        }
        // get the top of stack element
        let tos = this.stack[this.stack.length - 1];
        // push new value onto stack
        // and keep track of current minimum by comparing minimum from current top of stack element
        // (before new value is pushed onto the stack)
        // with the new value being pushed onto the stack,
        // the smaller of the two values is the new minimum
        // that is pushed together with the new value,
        // in other words, the minimum value is tracked at each level or element
        // (each level keeps track of the minimum value up to the current level in the stack)
        this.stack.push([val, val < tos[1] ? val : tos[1]]);
    }

    pop() {
        // remove tos element
        this.stack.pop();
    }

    top() {
        // get value of tos element
        return this.stack[this.stack.length - 1][0];
    }

    getMin() {
        // get minimum value stored with tos element
        return this.stack[this.stack.length - 1][1];
    }
}