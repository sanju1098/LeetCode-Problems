/**
 * @param {number[][]} grid
 * @return {number}
 */

var minCost = function (grid) {
    const m = grid.length;
    const n = grid[0].length;

    const dp = Array.from(
        { length: m },
        () => Array.from({ length: n }, () => new Set())
    );

    dp[0][0].add(grid[0][0]);

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;

            if (i > 0) {
                for (const value of dp[i - 1][j]) {
                    dp[i][j].add(value ^ grid[i][j]);
                }
            }

            if (j > 0) {
                for (const value of dp[i][j - 1]) {
                    dp[i][j].add(value ^ grid[i][j]);
                }
            }
        }
    }
    return Math.min(...dp[m - 1][n - 1]);
};
