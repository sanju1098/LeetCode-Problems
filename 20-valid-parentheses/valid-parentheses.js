/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    let stack = [];
    let map = {
        "(": ")",
        "{": "}",
        "[": "]",
    };
    for (let i = 0; i < s.length; i++) {
        // if (s[i] === "(" || s[i] === "[" || s[i] === "{") {
        if (map[s[i]]) {
            stack.push(s[i]);
        } else {
            let top = stack.pop();
            // if (
            //     !top ||
            //     (top === "(" && s[i] !== ")") ||
            //     (top === "{" && s[i] !== "}") ||
            //     (top === "[" && s[i] !== "]")
            // )
            if (!top || s[i] !== map[top]) return false;
        }
    }
    return stack.length === 0;
};