/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function (arr) {
    const MOD = 1e9 + 7;

    let odd = 0;
    let even = 1;
    let prefixParity = 0;
    let result = 0;

    for (let num of arr) {
        prefixParity = (prefixParity + num) % 2;
        if (prefixParity === 1) {
            result = (result + even) % MOD;
            odd++;
        } else {
            result = (result + odd) % MOD;
            even++;
        }
    }
    return result;
};
