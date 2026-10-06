/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function (s) {
    let balance = 0;
    let ans = 0;

    for (const char of s) {
        if (char === "(") {
            balance++;
        } else {
            if (balance > 0) {
                balance--;
            } else {
                ans++;
            }
        }
    }
    return ans + balance;
};