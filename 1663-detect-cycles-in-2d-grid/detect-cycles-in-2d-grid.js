/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var containsCycle = function (grid) {
    const m = grid.length;
    const n = grid[0].length;

    const visited = Array.from({ length: m }, () => Array(n).fill(false));

    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    const dfs = (x, y, px, py, char) => {
        visited[x][y] = true;

        for (let [dx, dy] of dirs) {
            let nx = x + dx;
            let ny = y + dy;

            if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
            if (grid[nx][ny] !== char) continue;

            // skip parent
            if (nx === px && ny === py) continue;

            // cycle found
            if (visited[nx][ny]) return true;

            if (dfs(nx, ny, x, y, char)) return true;
        }

        return false;
    };

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited[i][j]) {
                if (dfs(i, j, -1, -1, grid[i][j])) {
                    return true;
                }
            }
        }
    }

    return false;
};