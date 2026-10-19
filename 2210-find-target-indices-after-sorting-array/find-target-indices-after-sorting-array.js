/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var targetIndices = function (nums, target) {
    // nums.sort((a, b) => a - b);
    // const result = [];
    // for (let i = 0; i < nums.length; i++) {
    //     if (nums[i] === target) {
    //         result.push(i);
    //     }
    // }
    // return result;

    let smaller = 0;
    let equal = 0;
    for (const num of nums) {
        if (num < target) {
            smaller++;
        } else if (num === target) {
            equal++;
        }
    }
    const result = [];
    for (let i = smaller; i < smaller + equal; i++) {
        result.push(i);
    }
    return result;
};