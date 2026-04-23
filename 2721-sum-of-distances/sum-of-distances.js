/**
 * @param {number[]} nums
 * @return {number[]}
 */
var distance = function (nums) {
    const n = nums.length;
    const map = new Map();

    // Step 1: group indices
    for (let i = 0; i < n; i++) {
        if (!map.has(nums[i])) map.set(nums[i], []);
        map.get(nums[i]).push(i);
    }

    const res = Array(n).fill(0);

    // Step 2: process each group
    for (let indices of map.values()) {
        const k = indices.length;

        if (k === 1) continue;

        // prefix sum
        let prefix = Array(k).fill(0);
        prefix[0] = indices[0];

        for (let i = 1; i < k; i++) {
            prefix[i] = prefix[i - 1] + indices[i];
        }

        let total = prefix[k - 1];

        for (let i = 0; i < k; i++) {
            let idx = indices[i];

            let left = idx * i - (i > 0 ? prefix[i - 1] : 0);
            let right = (total - prefix[i]) - idx * (k - i - 1);

            res[idx] = left + right;
        }
    }

    return res;
};;