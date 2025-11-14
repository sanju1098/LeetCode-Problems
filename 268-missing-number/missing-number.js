/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    let n = nums.length;
    let totalSum = (n * (n + 1)) / 2

    let eleSum = 0;
    for (let i = 0; i < nums.length; i++) {
        eleSum += nums[i]
    }
    return totalSum - eleSum
};