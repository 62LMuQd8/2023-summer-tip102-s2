let s1 = '()';
let s2 = '()[]{}';
let s3 = '(]';
let s4 = '({([])})'
let s5 = '({([)]})'
let s6 = '(parenthesis)'

// stacks (LIFO) or queues(FIFO)?
// observation: last opening bracket must be closed first
// use a stack

// implementation
function isValidString(str) {
  let stack = [];
  let matched;
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    if (!isOpenBrackets(char) && !isCloseBrackets(char)) {
      throw new Error(`Invalid string: ${str}`);
    }
    if (isOpenBrackets(char)) {
      stack.push(char);
      continue;
    }
    if (isCloseBrackets(char)) {
      let openBracket = stack[stack.length - 1];
      switch(char) {
        case ')':
          if (openBracket === '(') {
            matched = true;
            stack.pop();
          } else {
            matched = false;
          }
          break;
        case '}':
          if (openBracket === '{') {
            matched = true;
            stack.pop();
          } else {
            matched = false;
          }
          break;
        case ']':
          if (openBracket === '[') {
            matched = true;
            stack.pop();
          } else {
            matched = false;
          }
          break;
        default:
          matched = false;
      }
      if (!matched) break;
    }
  }
  return matched;
}

function isOpenBrackets(char) {
  return char === '(' || char === '{' || char === '[';
}

function isCloseBrackets(char) {
  return char === ')' || char === '}' || char === ']';
}

// testing
console.log(isValidString(s1));
console.log(isValidString(s2));
console.log(isValidString(s3));
console.log(isValidString(s4));
console.log(isValidString(s5));
console.log(isValidString(s6));