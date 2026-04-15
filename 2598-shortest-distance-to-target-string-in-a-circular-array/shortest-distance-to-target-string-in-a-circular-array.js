/**
 * @param {string[]} words
 * @param {string} target
 * @param {number} startIndex
 * @return {number}
 */
var closestTarget = function (words, target, startIndex) {
    let n = words.length;
    let minDist = Infinity;

    for (let i = 0; i < n; i++) {
        if (words[i] === target) {
            let diff = Math.abs(i - startIndex);
            let dist = Math.min(diff, n - diff);
            minDist = Math.min(minDist, dist);
        }
    }

    return minDist === Infinity ? -1 : minDist;
};