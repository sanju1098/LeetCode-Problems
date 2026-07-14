/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    const set = new Set(nums);
    let longest = 0;
    for (const num of set) {
        if (set.has(num - 1)) {
            continue;
        }
        let length = 1;
        let current = num;
        while (set.has(current + 1)) {
            current++;
            length++;
        }
        longest = Math.max(longest, length);
    }
    return longest;
};