/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function (s) {
    let res = 0;
    let first = Array(26).fill(Infinity);
    let last = Array(26).fill(-1);

    // Track first and last appearance
    for (let i = 0; i < s.length; i++) {
        let c = s.charCodeAt(i) - 97;
        first[c] = Math.min(first[c], i);
        last[c] = Math.max(last[c], i);
    }

    // For each possible outer character 'a' to 'z'
    for (let x = 0; x < 26; x++) {
        if (first[x] < last[x]) {
            let seen = new Set();

            // Check unique middle characters between first & last
            for (let i = first[x] + 1; i < last[x]; i++) {
                seen.add(s[i]);
            }

            res += seen.size;
        }
    }

    return res;
};