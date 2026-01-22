/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumPairRemoval = function (nums) {
    const isNonDecreasing = (arr) => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    };

    let ops = 0;

    while (!isNonDecreasing(nums)) {
        let minSum = Infinity;
        let idx = 0;

        for (let i = 0; i < nums.length - 1; i++) {
            const s = nums[i] + nums[i + 1];
            if (s < minSum) {
                minSum = s;
                idx = i;
            }
        }

        nums = [
            ...nums.slice(0, idx),
            nums[idx] + nums[idx + 1],
            ...nums.slice(idx + 2),
        ];

        ops++;
    }

    return ops;
};
