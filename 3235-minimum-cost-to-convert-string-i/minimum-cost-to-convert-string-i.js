/**
 * @param {string} source
 * @param {string} target
 * @param {character[]} original
 * @param {character[]} changed
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function (source, target, original, changed, cost) {
    const INF = Number.MAX_SAFE_INTEGER;
    const N = 26;

    // Step 1: Initialize distance matrix
    const dist = Array.from({ length: N }, () => Array(N).fill(INF));

    for (let i = 0; i < N; i++) {
        dist[i][i] = 0;
    }

    // Step 2: Fill direct conversions (take minimum if duplicates exist)
    for (let i = 0; i < original.length; i++) {
        const u = original[i].charCodeAt(0) - 97;
        const v = changed[i].charCodeAt(0) - 97;
        dist[u][v] = Math.min(dist[u][v], cost[i]);
    }

    // Step 3: Floyd–Warshall (All-pairs shortest path)
    for (let k = 0; k < N; k++) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (dist[i][k] !== INF && dist[k][j] !== INF) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }

    // Step 4: Calculate total cost
    let totalCost = 0;

    for (let i = 0; i < source.length; i++) {
        if (source[i] === target[i]) continue;

        const u = source[i].charCodeAt(0) - 97;
        const v = target[i].charCodeAt(0) - 97;

        if (dist[u][v] === INF) return -1;
        totalCost += dist[u][v];
    }

    return totalCost;
};
