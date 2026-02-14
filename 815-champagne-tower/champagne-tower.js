/**
 * @param {number} poured
 * @param {number} query_row
 * @param {number} query_glass
 * @return {number}
 */
var champagneTower = function (poured, query_row, query_glass) {
    let dp = Array.from({ length: query_row + 2 }, () =>
        new Array(query_row + 2).fill(0)
    );

    dp[0][0] = poured;

    for (let i = 0; i <= query_row; i++) {
        for (let j = 0; j <= i; j++) {

            if (dp[i][j] > 1) {
                let overflow = (dp[i][j] - 1) / 2;

                dp[i + 1][j] += overflow;
                dp[i + 1][j + 1] += overflow;

                dp[i][j] = 1; // glass can hold max 1
            }
        }
    }

    return Math.min(1, dp[query_row][query_glass]);
};