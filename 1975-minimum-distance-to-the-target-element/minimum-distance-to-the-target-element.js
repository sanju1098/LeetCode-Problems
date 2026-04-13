/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @return {number}
 */
var getMinDistance = function (nums, target, start) {
    let n = nums.length;

    for (let d = 0; d < n; d++) {
        if (start - d >= 0 && nums[start - d] === target) return d;
        if (start + d < n && nums[start + d] === target) return d;
    }
};