export class StackService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Validate-Stack-Sequences
    static validateSequence(pushed, popped) {
        // test stack for push vals form pushed array
        let testStack = [];
        // counts the number of pops from test stack
        let counter = 0;

        for (const val of pushed) {
            // push next value from pushed array
            testStack.push(val);

            // we pop from test stack as soon as possible, and under these conditions:
            // 1. test stack is not empty
            // 2. we still have values to pop per popped array
            // 3. value on top of stack is the current value we need to pop per popped array
            while (testStack.length > 0 
                && counter < popped.length 
                && testStack[testStack.length - 1] === popped[counter]) {
                // pop from test stack
                testStack.pop();
                
                // increase counter for number of pops following the sequence defined by popped array
                counter++;
            }
        }

        // pushed and popped could have resulted from arrays provided
        // if we popped all values in the sequence defined by popped array
        return counter === popped.length;
    }
}