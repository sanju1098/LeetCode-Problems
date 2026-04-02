/**
 * @param {number[][]} coins
 * @return {number}
 */
var maximumAmount = function (coins) {
    let m = coins.length;
    let n = coins[0].length;

    // dp[i][j][k]
    let dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => Array(3).fill(-Infinity))
    );

    // Base case
    dp[0][0][0] = coins[0][0];
    if (coins[0][0] < 0) {
        dp[0][0][1] = 0; // neutralize
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k <= 2; k++) {

                if (i === 0 && j === 0) continue;

                let val = coins[i][j];

                let fromTop = i > 0 ? dp[i - 1][j] : null;
                let fromLeft = j > 0 ? dp[i][j - 1] : null;

                for (let prev of [fromTop, fromLeft]) {
                    if (!prev) continue;

                    // Case 1: do not neutralize
                    if (prev[k] !== -Infinity) {
                        dp[i][j][k] = Math.max(
                            dp[i][j][k],
                            prev[k] + val
                        );
                    }

                    // Case 2: neutralize (only if negative and k > 0)
                    if (val < 0 && k > 0 && prev[k - 1] !== -Infinity) {
                        dp[i][j][k] = Math.max(
                            dp[i][j][k],
                            prev[k - 1] // no loss
                        );
                    }
                }
            }
        }
    }

    return Math.max(...dp[m - 1][n - 1]);
};