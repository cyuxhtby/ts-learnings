// Leetcode Is Valid: 

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

function isValid(s: string): boolean {

    const bracketMap = new Map([['(',')'],['{','}'],['[',']']]);

    const stack: string[] = [];
    for (let i = 0; i < s.length; i ++){
        const char = s.charAt(i);
        // check if its an open bracket
        if (bracketMap.has(char)) {
            stack.push(char);
        }else{
            const top = stack.pop();
            // check if closing bracket closes top of stack
            if(bracketMap.get(top) !== char ){
                return false;
            }
        }
    }
    // if array is not empty return false
    return stack.length === 0;
};
