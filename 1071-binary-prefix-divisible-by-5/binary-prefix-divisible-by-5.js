/**
 * @param {number[]} nums
 * @return {boolean[]}
 */
var prefixesDivBy5 = function (nums) {
    let result = [];
    let val = 0;

    for (let bit of nums) {
        val = (val * 2 + bit) % 5;
        result.push(val === 0);
    }

    return result;
};