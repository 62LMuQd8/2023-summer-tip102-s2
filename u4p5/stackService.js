export class StackService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Evaluate-Reverse-Polish-Notation
    // read general explanation of RPN: https://en.wikipedia.org/wiki/Reverse_Polish_notation#Explanation
    static evalRPN(exp) {
        // computation stack
        let stack = [];
        // javascript regex
        const ops = /^[\+\-\*\/]$/

        // for each token in expression array
        for (const token of exp) {
            // if current token is not an operator
            if(!ops.test(token)) {
                // then push number to stack
                stack.push(Number(token));
                // and go to next token
                continue;
            }

            // else current token is an operator
            // then pop off two operands
            let a = stack.pop();
            let b = stack.pop();

            // operate on operands depending on operator
            // and push result onto computation stack
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    // per constraints, division rounds toward zero
                    stack.push(Math.trunc(a / b));
                    break;
                default:
            }
        }

        // return answer
        return stack.pop();
    }
}