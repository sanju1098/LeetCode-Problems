/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minBitwiseArray = function (nums) {
    let result = new Array(nums.length);

    for (let i = 0; i < nums.length; i++) {
        let cur = nums[i];

        if (cur === 2) {
            result[i] = -1;
            continue;
        }

        let temp = cur;
        let cnt = 0;

        while ((temp & 1) === 1) {
            cnt++;
            temp >>= 1;
        }

        result[i] = cur - (1 << (cnt - 1));
    }

    return result;
};