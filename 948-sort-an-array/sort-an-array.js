/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
    if (nums.length <= 1) return nums;
    let mid = Math.floor(nums.length / 2);

    let left = sortArray(nums.slice(0, mid))
    let right = sortArray(nums.slice(mid));

    return merge(left, right);
};

function merge(left, right) {
    let res = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            res.push(left[i]);
            i++
        } else {
            res.push(right[j]);
            j++
        }
    }
    return [...res, ...left.slice(i), ...right.slice(j)]
}