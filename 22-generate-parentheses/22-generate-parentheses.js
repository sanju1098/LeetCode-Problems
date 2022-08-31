/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let result = []
    const generateParentheses = (str = [], open = 0, close = 0) => {
        if (str.length == 2*n) return result.push(str)
        if (open < n) generateParentheses(str+'(', open+1, close)
        if (close < open) generateParentheses(str+')', open, close+1)
    }
    generateParentheses()
    return result
};
