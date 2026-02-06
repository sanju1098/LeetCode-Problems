/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minRemoval = function (nums, k) {
    nums.sort((a, b) => a - b);
    let left = 0;
    let maxWindow = 0;

    for (let right = 0; right < nums.length; right++) {
        while (nums[right] > nums[left] * k) {
            left++;
        }
        maxWindow = Math.max(maxWindow, right - left + 1);
    }
    return nums.length - maxWindow; // Minimum removals = total - max kept
};