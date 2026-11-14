/**
 * @param {number[]} nums
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var minimumSumSubarray = function (nums, l, r) {
    let minSum = Infinity;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        let sum = 0;

        for (let j = i; j < n; j++) {
            sum += nums[j];

            let len = j - i + 1;

            if (len >= l && len <= r && sum > 0) {
                minSum = Math.min(minSum, sum);
            }

            if (len >= r) {
                break;
            }
        }
    }

    return minSum === Infinity ? -1 : minSum;
};
