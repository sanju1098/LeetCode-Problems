/**
 * @param {number[]} nums
 * @param {number} original
 * @return {number}
 */
var findFinalValue = function (nums, original) {
    const set = new Set(nums); // {1, 3, 5, 6, 12}
    while (set.has(original)) {
        original *= 2;
    }
    return original;
};