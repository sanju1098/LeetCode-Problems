/**
 * @param {number[]} nums
 * @return {number}
 */
var sortPermutation = function (nums) {
    const n = nums.length;

    // Already sorted
    let sorted = true;
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i) {
            sorted = false;
            break;
        }
    }

    if (sorted) return 0;

    // AND all elements that are not already in their correct positions
    let k = -1;

    for (let i = 0; i < n; i++) {
        if (nums[i] !== i) {
            k &= nums[i];
        }
    }

    return k;
};