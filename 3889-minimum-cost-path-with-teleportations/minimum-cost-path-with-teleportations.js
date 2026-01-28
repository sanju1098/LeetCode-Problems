/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var minCost = function(grid, k) {
    const m = grid.length; 
    const n = grid[0].length;

    // we flatten cells
    const cells = [];
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            cells.push([grid[i][j], i, j]);

    // we sort descending
    cells.sort((a, b) => b[0] - a[0]);

    // we group by value
    const groups = [];
    for (let p = 0; p < cells.length; ) {
        const v = cells[p][0];
        const g = [];
        while (p < cells.length && cells[p][0] === v) 
            g.push(cells[p++]);
        groups.push(g);
    }

    // Two DP layers
    let prev = Array.from({ length: m }, () => Array(n).fill(Infinity));
    let cur  = Array.from({ length: m }, () => Array(n).fill(Infinity));

    prev[0][0] = 0;

    // we relax normal moves (right/down)
    function relax(dp) {
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let best = dp[i][j];
                if (i > 0) best = Math.min(best, dp[i - 1][j] + grid[i][j]);
                if (j > 0) best = Math.min(best, dp[i][j - 1] + grid[i][j]);
                dp[i][j] = best;
            }
        }
    }

    relax(prev);

    for (let t = 1; t <= k; t++) {
        // Start cur as a copy of prev
        for (let i = 0; i < m; i++) {
            const rowPrev = prev[i], rowCur = cur[i];
            for (let j = 0; j < n; j++) rowCur[j] = rowPrev[j];
        }

        let best = Infinity;

        // Teleport sweep
        for (const group of groups) {
            let groupMin = Infinity;

            for (let x = 0; x < group.length; x++) {
                const cell = group[x];
                const i = cell[1], j = cell[2];
                groupMin = Math.min(groupMin, prev[i][j]);
            }

            best = Math.min(best, groupMin);

            for (let x = 0; x < group.length; x++) {
                const cell = group[x];
                const i = cell[1], j = cell[2];
                cur[i][j] = Math.min(cur[i][j], best);
            }
        }

        relax(cur);

        // we swap layers
        const tmp = prev; prev = cur; cur = tmp;
    }

    return prev[m - 1][n - 1];
};
