/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countIslands = function (grid, k) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function dfs(r, c) {
        // Stop if out of bounds or not land
        if (
            r < 0 || c < 0 ||
            r >= rows || c >= cols ||
            grid[r][c] === 0
        ) {
            return 0;
        }

        // Add this cell's value and mark it visited
        const value = grid[r][c];
        grid[r][c] = 0;

        // Explore all four directions
        return value +
            dfs(r - 1, c) +
            dfs(r + 1, c) +
            dfs(r, c - 1) +
            dfs(r, c + 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] > 0) {
                const sum = dfs(r, c);

                if (sum % k === 0) {
                    count++;
                }
            }
        }
    }

    return count;
};