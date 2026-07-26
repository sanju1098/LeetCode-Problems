/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function (s) {
    // With Stack
    // let stack = [];
    // let ans = ""
    // for (let i = 0; i < s.length; i++) {
    //     if (s[i] === "(") {
    //         stack.push(s[i])
    //         let len = stack.length
    //         if (len > 1) {
    //             ans = ans + s[i]
    //         }
    //     }
    //     else {
    //         let len = stack.length
    //         if (len > 1) {
    //             ans = ans + s[i]
    //         }
    //         stack.pop()
    //     }
    // }
    // return ans

    // Without Stack
    let level = 0;
    let ans = ""

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            level++
            ans += level > 1 ? s[i] : ""
        }
        else {
            ans += level > 1 ? s[i] : ""
            level--
        }
    }
    return ans
};