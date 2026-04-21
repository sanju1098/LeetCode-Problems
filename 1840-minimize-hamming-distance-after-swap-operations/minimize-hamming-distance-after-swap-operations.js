/**
 * @param {number[]} source
 * @param {number[]} target
 * @param {number[][]} allowedSwaps
 * @return {number}
 */
var minimumHammingDistance = function (source, target, allowedSwaps) {
    const n = source.length;

    // Union-Find
    const parent = Array.from({ length: n }, (_, i) => i);

    const find = (x) => {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    };

    const union = (a, b) => {
        let pa = find(a);
        let pb = find(b);
        if (pa !== pb) parent[pa] = pb;
    };

    // Step 1: build unions
    for (let [a, b] of allowedSwaps) {
        union(a, b);
    }

    // Step 2: group indices
    const groups = new Map();
    for (let i = 0; i < n; i++) {
        let p = find(i);
        if (!groups.has(p)) groups.set(p, []);
        groups.get(p).push(i);
    }

    let result = 0;

    // Step 3: process each group
    for (let indices of groups.values()) {
        const freq = new Map();

        // count source
        for (let i of indices) {
            freq.set(source[i], (freq.get(source[i]) || 0) + 1);
        }

        // match with target
        for (let i of indices) {
            if (freq.has(target[i]) && freq.get(target[i]) > 0) {
                freq.set(target[i], freq.get(target[i]) - 1);
            } else {
                result++;
            }
        }
    }

    return result;
};