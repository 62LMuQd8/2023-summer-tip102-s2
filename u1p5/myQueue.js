// read CodePath's explanation: https://guides.codepath.org/compsci/implement-queue-using-stacks/
export class MyQueue {
    constructor() {
        // input stack
        this.input = [];
        // output stack
        this.output = [];
    }

    push(val) {
        // push new value to input stack (end of queue)
        this.input.push(val);
    }

    pop() {
        // if there are values in output stack,
        if (this.output.length > 0) {
            // then pop from output stack (output stack is front of queue)
            return this.output.pop();
        } else {
            // else we need to pull values from input stack into output stack
            // (the input stack is the end of the queue,
            // we are not able to access the front of the queue,
            // in order to access the front of the queue,
            // we need to reverse the order of the elements in the input stack,
            // we can do this by popping the elements from the input stack to a new stack, or output stack)
            while (this.input.length > 0) {
                this.output.push(this.input.pop());
            }
            // and pop from output stack (output stack is front of queue)
            return this.output.pop();
        }
    }

    // get first element, but not remove, in front of queue
    peek() {
        // if output stack (front of queue) is not empty
        if (this.output.length > 0) {
            // then get tos element from front of queue
            return this.output[this.output.length - 1];
        } else {
            // else load from buffer (input stack or back of queue)
            while (this.input.length > 0) {
                this.output.push(this.input.pop());
            }
            // and get tos element from front of queue (output stack)
            return this.output[this.output.length - 1];
        }
    }

    // check if queue is empty
    empty() {
        // queue is empty is both stacks are empty
        return this.input.length === 0 && this.output.length === 0;
    }
}