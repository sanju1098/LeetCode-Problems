/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k1
 * @param {number} k2
 * @return {number}
 */
var minSumSquareDiff = function (nums1, nums2, k1, k2) {
    let k = k1 + k2;
    const n = nums1.length;
    const diff = new Array(n);

    let maxDiff = 0;
    let totalDiff = 0;

    for (let i = 0; i < n; i++) {
        diff[i] = Math.abs(nums1[i] - nums2[i]);

        maxDiff = Math.max(maxDiff, diff[i]);
        totalDiff += diff[i];
    }

    if (totalDiff <= k) {
        return 0;
    }

    const freq = new Array(maxDiff + 1).fill(0);

    for (const d of diff) {
        freq[d]++;
    }

    for (let d = maxDiff; d > 0 && k > 0; d--) {
        if (freq[d] === 0) continue;
        const operations = Math.min(k, freq[d]);
        freq[d] -= operations;
        freq[d - 1] += operations;
        k -= operations;
    }

    let result = 0;
    for (let d = 1; d < freq.length; d++) {
        result += d * d * freq[d];
    }
    return result;
};