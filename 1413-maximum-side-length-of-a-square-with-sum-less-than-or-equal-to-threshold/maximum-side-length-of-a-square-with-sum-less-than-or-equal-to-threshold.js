/**
 * @param {number[][]} mat
 * @param {number} threshold
 * @return {number}
 */
var maxSideLength = function (mat, threshold) {
    const m = mat.length;
    const n = mat[0].length;

    // Build prefix sum
    const prefix = Array.from({ length: m + 1 }, () =>
        Array(n + 1).fill(0)
    );

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            prefix[i][j] =
                mat[i - 1][j - 1] +
                prefix[i - 1][j] +
                prefix[i][j - 1] -
                prefix[i - 1][j - 1];
        }
    }

    let maxLen = 0;
    const maxPossible = Math.min(m, n);

    for (let size = 1; size <= maxPossible; size++) {
        let found = false;

        for (let i = size; i <= m; i++) {
            for (let j = size; j <= n; j++) {
                const sum =
                    prefix[i][j] -
                    prefix[i - size][j] -
                    prefix[i][j - size] +
                    prefix[i - size][j - size];

                if (sum <= threshold) {
                    maxLen = size;
                    found = true;
                    break;
                }
            }
            if (found) break;
        }

        // If no square of this size works, no need to check larger sizes
        if (!found) break;
    }

    return maxLen;
};