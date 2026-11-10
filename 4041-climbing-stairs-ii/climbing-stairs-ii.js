/**
 * @param {number} n
 * @param {number[]} costs
 * @return {number}
 */
var climbStairs = function (n, costs) {
    const dp = new Array(n + 1).fill(Infinity);

    dp[0] = 0;

    for (let i = 1; i <= n; i++) {
        // Jump from step i - 1
        dp[i] = Math.min(
            dp[i],
            dp[i - 1] + costs[i - 1] + 1
        );

        // Jump from step i - 2
        if (i >= 2) {
            dp[i] = Math.min(
                dp[i],
                dp[i - 2] + costs[i - 1] + 4
            );
        }

        // Jump from step i - 3
        if (i >= 3) {
            dp[i] = Math.min(
                dp[i],
                dp[i - 3] + costs[i - 1] + 9
            );
        }
    }

    return dp[n];
};