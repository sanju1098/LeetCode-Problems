/**
 * @param {number[]} nums
 * @return {number}
 */
var minPairSum = function (nums) {
    nums.sort((a, b) => a - b);

    let maxPairSum = 0;
    let n = nums.length;

    // 2. Use two pointers to pair the smallest with the largest
    for (let i = 0; i < n / 2; i++) {
        const currentSum = nums[i] + nums[n - 1 - i];

        // 3. Update the maximum sum found so far
        if (currentSum > maxPairSum) {
            maxPairSum = currentSum;
        }
    }

    return maxPairSum;
};