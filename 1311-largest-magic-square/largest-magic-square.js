/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestMagicSquare = function (grid) {
    const m = grid.length;
    const n = grid[0].length;

    // Prefix sums
    const rowSum = Array.from({ length: m }, () => Array(n).fill(0));
    const colSum = Array.from({ length: m }, () => Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            rowSum[i][j] = grid[i][j] + (j > 0 ? rowSum[i][j - 1] : 0);
            colSum[i][j] = grid[i][j] + (i > 0 ? colSum[i - 1][j] : 0);
        }
    }

    const getRowSum = (r, c1, c2) =>
        rowSum[r][c2] - (c1 > 0 ? rowSum[r][c1 - 1] : 0);

    const getColSum = (c, r1, r2) =>
        colSum[r2][c] - (r1 > 0 ? colSum[r1 - 1][c] : 0);

    const maxSize = Math.min(m, n);

    // Try sizes from largest to smallest
    for (let size = maxSize; size >= 2; size--) {
        for (let i = 0; i + size - 1 < m; i++) {
            for (let j = 0; j + size - 1 < n; j++) {
                const target = getRowSum(i, j, j + size - 1);
                let valid = true;

                // Check rows
                for (let r = i; r < i + size; r++) {
                    if (getRowSum(r, j, j + size - 1) !== target) {
                        valid = false;
                        break;
                    }
                }

                // Check columns
                for (let c = j; c < j + size && valid; c++) {
                    if (getColSum(c, i, i + size - 1) !== target) {
                        valid = false;
                        break;
                    }
                }

                // Check diagonals
                if (valid) {
                    let diag1 = 0,
                        diag2 = 0;
                    for (let k = 0; k < size; k++) {
                        diag1 += grid[i + k][j + k];
                        diag2 += grid[i + k][j + size - 1 - k];
                    }
                    if (diag1 !== target || diag2 !== target) valid = false;
                }

                if (valid) return size;
            }
        }
    }

    // Every 1x1 grid is magic
    return 1;
};