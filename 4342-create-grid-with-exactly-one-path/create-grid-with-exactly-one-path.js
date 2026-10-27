/**
 * @param {number} m
 * @param {number} n
 * @return {string[]}
 */
var createGrid = function (m, n) {
    const grid = Array(m).fill(0).map(() => Array(n).fill('#'));

    // Make the top row free
    for (let j = 0; j < n; j++) {
        grid[0][j] = '.';
    }

    // Make the rightmost column free
    for (let i = 0; i < m; i++) {
        grid[i][n - 1] = '.';
    }
    return grid.map(row => row.join(''));
};
