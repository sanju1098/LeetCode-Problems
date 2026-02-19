/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function (s) {
    let prev = 0;
    let curr = 1;
    let ans = 0;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            curr++;
        } else {
            ans += Math.min(prev, curr);
            prev = curr;
            curr = 1;
        }
    }

    // last pair
    ans += Math.min(prev, curr);

    return ans;
};