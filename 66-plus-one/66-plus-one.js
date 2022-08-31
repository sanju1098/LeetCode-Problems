/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let value = digits.join("");
    let newNum = BigInt(value)+BigInt(1);
    return Array.from(String(newNum));
    //(BigInt(value)+BigInt(1)).toString().split("");
};