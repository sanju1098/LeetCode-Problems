/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minimumChanges = function (s, k) {
    const n = s.length;
    const INF = Infinity;

    // cost[i][j] = minimum changes to make s[i...j]
    // a semi-palindrome
    const cost = Array.from(
        { length: n },
        () => new Array(n).fill(INF)
    );

    // Step 1: Precompute semi-palindrome costs
    for (let start = 0; start < n; start++) {
        for (let end = start + 1; end < n; end++) {
            const len = end - start + 1;

            // Try every proper divisor of the substring length
            for (let d = 1; d < len; d++) {
                if (len % d !== 0) continue;

                let changes = 0;

                // Check each group formed by positions
                // having the same remainder modulo d
                for (let offset = 0; offset < d; offset++) {
                    let left = offset;
                    let right =
                        offset + Math.floor((len - 1 - offset) / d) * d;

                    while (left < right) {
                        if (
                            s[start + left] !== s[start + right]
                        ) {
                            changes++;
                        }

                        left += d;
                        right -= d;
                    }
                }

                cost[start][end] = Math.min(
                    cost[start][end],
                    changes
                );
            }
        }
    }

    // Step 2: DP for partitioning into exactly k substrings
    const dp = Array.from(
        { length: k + 1 },
        () => new Array(n + 1).fill(INF)
    );

    dp[0][0] = 0;

    for (let groups = 1; groups <= k; groups++) {
        for (let end = groups * 2; end <= n; end++) {
            // The last substring must have length >= 2
            for (let start = (groups - 1) * 2; start <= end - 2; start++) {
                if (dp[groups - 1][start] === INF) continue;

                dp[groups][end] = Math.min(
                    dp[groups][end],
                    dp[groups - 1][start] + cost[start][end - 1]
                );
            }
        }
    }
    return dp[k][n];
};