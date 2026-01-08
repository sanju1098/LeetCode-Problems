/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function (nums1, nums2) {
    const n = nums1.length;
    const m = nums2.length;
    const NEG_INF = -1e15;

    // dp[i][j] = max dot product using non-empty subsequences
    // from nums1[i:] and nums2[j:]
    const dp = Array.from({ length: n + 1 }, () =>
        Array(m + 1).fill(NEG_INF)
    );

    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            const take = nums1[i] * nums2[j] + Math.max(0, dp[i + 1][j + 1]);
            const skip1 = dp[i + 1][j];
            const skip2 = dp[i][j + 1];

            dp[i][j] = Math.max(take, skip1, skip2);
        }
    }

    return dp[0][0];
};