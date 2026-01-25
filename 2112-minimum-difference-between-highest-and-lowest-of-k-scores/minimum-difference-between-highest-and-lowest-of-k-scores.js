/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
    if (k === 1) return 0;

    nums.sort((a, b) => a - b);

    let minDiff = Infinity;

    for (let i = 0; i + k - 1 < nums.length; i++) {
        const diff = nums[i + k - 1] - nums[i];
        if (diff < minDiff) {
            minDiff = diff;
        }
    }

    return minDiff;
};