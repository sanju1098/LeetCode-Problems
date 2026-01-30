/**
 * @param {string} source
 * @param {string} target
 * @param {string[]} original
 * @param {string[]} changed
 * @param {number[]} cost
 * @return {number}
 */var minimumCost = function (source, target, original, changed, cost) {
  const INF = 1e18;
  const n = source.length;

  // 1. Group rules by length
  const rulesByLen = new Map();
  for (let i = 0; i < original.length; i++) {
    const len = original[i].length;
    if (!rulesByLen.has(len)) rulesByLen.set(len, []);
    rulesByLen.get(len).push([original[i], changed[i], cost[i]]);
  }

  // 2. Precompute shortest paths per length
  const shortest = new Map();

  for (const [len, rules] of rulesByLen.entries()) {
    const idMap = new Map();
    let id = 0;

    for (const [u, v] of rules) {
      if (!idMap.has(u)) idMap.set(u, id++);
      if (!idMap.has(v)) idMap.set(v, id++);
    }

    const dist = Array.from({ length: id }, () =>
      Array(id).fill(INF)
    );

    for (let i = 0; i < id; i++) dist[i][i] = 0;

    for (const [u, v, c] of rules) {
      const ui = idMap.get(u);
      const vi = idMap.get(v);
      dist[ui][vi] = Math.min(dist[ui][vi], c);
    }

    // Floyd–Warshall
    for (let k = 0; k < id; k++)
      for (let i = 0; i < id; i++)
        for (let j = 0; j < id; j++)
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);

    shortest.set(len, { idMap, dist });
  }

  // 3. DP
  const dp = Array(n + 1).fill(INF);
  dp[n] = 0;

  const validLens = [...rulesByLen.keys()];

  for (let i = n - 1; i >= 0; i--) {
    // Case: single char already matches
    if (source[i] === target[i]) {
      dp[i] = dp[i + 1];
    }

    for (const len of validLens) {
      if (i + len > n) continue;

      const s = source.substring(i, i + len);
      const t = target.substring(i, i + len);

      if (s === t) {
        dp[i] = Math.min(dp[i], dp[i + len]);
        continue;
      }

      const info = shortest.get(len);
      if (!info) continue;

      const { idMap, dist } = info;
      if (!idMap.has(s) || !idMap.has(t)) continue;

      const c = dist[idMap.get(s)][idMap.get(t)];
      if (c < INF) {
        dp[i] = Math.min(dp[i], c + dp[i + len]);
      }
    }
  }

  return dp[0] === INF ? -1 : dp[0];
};
