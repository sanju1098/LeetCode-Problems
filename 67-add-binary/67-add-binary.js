/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let result = BigInt("0b" + a) + BigInt("0b" + b);
    let newVal = result.toString(2);
    return newVal;
};