export class StringService {
    // read CodePath's explanation: https://guides.codepath.org/compsci/Decode-String#2-m-atch
    static decodeString(s) {
        // typically string parsing problems use a stack
        // b/c a stack allows us to read one character at a time
        // and backtrack in case we need to transform
        // a substring we already read
        let stack = [];

        for (const c of s) {
            // if we do not see a closing square bracket
            // then keep reading each character
            if (c !== ']') {
                stack.push(c);
                continue;
            }

            // keep track of decoded string
            let decodedString = [];

            // if previous character is not an opening square bracket, then keep backtrack
            // we are retrieving the repeatable substring within the square backets
            while (stack[stack.length - 1] !== '[') {
                // pop character from stack and push to decodedString
                // and remember to push the expanded string back in the correct order


                // this is because when we push the expanded string
                // back to the stack, the characters will be pushed in the correct order:
                // first character of the expanded string is pushed first,
                // last character of the expanded string is pushed last
                // we will use join() to convert array to string later
                decodedString.push(stack.pop());
            }

            // remove the last character from stack
            // which should be a closing square bracket
            stack.pop()

            // variable to store expansion factor k
            let k = 0;
            // variable to help add each digit to the correct decimal place
            let base = 1;
            // regular expression for checking whether character is a number
            let regex = /^[\d]$/;

            // get expansion factor k
            // while last character is a string number
            // and stack is not empty (i.e. we popped the last character, which is a digit, from the stack)
            while (stack.length !== 0 && regex.test(stack[stack.length - 1])) {
                // get the string number and add the digit to the correct decimal place for k
                k = k + (Number(stack.pop())) * base;
                // increase the base to next decimal place
                base *= 10;
            }

            // we repeat the repeatable substring k number of times
            while (k > 0) {
                // since we pushed each character of the repeatable string
                // starting with the last character onto the decodedString stack,
                // we now need to start from the last character in the decodedString stack
                // when pushing back to the stack (i.e. if the expanded string is 'ab',
                // then in the decodedString stack the order is ['b', 'a']),
                // and the reason why we are pushing the expanded substring back to the stack
                // is because the expanded substring may also be a repeatable substring
                for (let i = decodedString.length - 1; i >= 0; i--) {
                    stack.push(decodedString[i]);
                }
                // decrement k counter
                k--;
            }
        }

        // return expanded string by joining the substrings in the stack
        return stack.join('');
    }
}