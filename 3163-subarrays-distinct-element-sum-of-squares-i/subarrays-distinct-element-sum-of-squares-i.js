/**
 * @param {number[]} nums
 * @return {number}
 */
var sumCounts = function (nums) {
    let result = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        const freq = new Map();
        let distinct = 0;
        for (let j = i; j < n; j++) {
            if (!freq.has(nums[j])) {
                freq.set(nums[j], 1);
                distinct++;
            } else {
                freq.set(nums[j], freq.get(nums[j]) + 1);
            }
            result += distinct * distinct;
        }
    }
    return result;
};