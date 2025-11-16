/**
 * @param {string} s
 * @return {number}
 */
var numSub = function (s) {
    const MOD = 1_000_000_007;
    let count = 0;
    let result = 0;

    for (let char of s) {
        if (char === '1') {
            count++;
        } else {
            result = (result + (count * (count + 1) / 2)) % MOD;
            count = 0; // reset
        }
    }

    result = (result + (count * (count + 1) / 2)) % MOD;

    return result;
};