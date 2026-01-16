/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} hFences
 * @param {number[]} vFences
 * @return {number}
 */
var maximizeSquareArea = function (m, n, hFences, vFences) {
    const MOD = 1000000007n;

    hFences = [1, ...hFences, m].sort((a, b) => a - b);
    vFences = [1, ...vFences, n].sort((a, b) => a - b);

    const hGaps = new Set();
    for (let i = 0; i < hFences.length; i++) {
        for (let j = i + 1; j < hFences.length; j++) {
            hGaps.add(hFences[j] - hFences[i]);
        }
    }

    let maxSide = -1;

    for (let i = 0; i < vFences.length; i++) {
        for (let j = i + 1; j < vFences.length; j++) {
            const gap = vFences[j] - vFences[i];
            if (hGaps.has(gap)) {
                maxSide = Math.max(maxSide, gap);
            }
        }
    }

    if (maxSide === -1) return -1;

    const side = BigInt(maxSide);
    return Number((side * side) % MOD);
};