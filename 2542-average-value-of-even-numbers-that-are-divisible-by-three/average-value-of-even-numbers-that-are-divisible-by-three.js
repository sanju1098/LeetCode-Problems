/**
 * @param {number[]} nums
 * @return {number}
 */
var averageValue = function (nums) {
    nums = nums.filter(a => a % 2 === 0 && a % 3 === 0)  // filters numbers that are divisible by 6, thereby ensuring they are even and divisible by 3.
    console.log(nums);
    return nums.length ? parseInt(nums.reduce((a, b) => a + b) / nums.length) : 0
};