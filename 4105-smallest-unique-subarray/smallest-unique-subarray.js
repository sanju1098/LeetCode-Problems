/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestUniqueSubarray = function (nums) {
    const n = nums.length;

    // Coordinate compression
    const values = [...new Set(nums)].sort((a, b) => a - b);
    const valueRank = new Map();

    values.forEach((value, index) => {
        valueRank.set(value, index);
    });

    let rank = nums.map(num => valueRank.get(num));

    // Build suffix array using doubling
    const sa = Array.from({ length: n }, (_, i) => i);

    for (let len = 1; len < n; len *= 2) {
        sa.sort((a, b) => {
            if (rank[a] !== rank[b]) {
                return rank[a] - rank[b];
            }

            const secondA = a + len < n ? rank[a + len] : -1;
            const secondB = b + len < n ? rank[b + len] : -1;

            return secondA - secondB;
        });

        const newRank = new Array(n);
        newRank[sa[0]] = 0;

        for (let i = 1; i < n; i++) {
            const prev = sa[i - 1];
            const curr = sa[i];

            const prevSecond =
                prev + len < n ? rank[prev + len] : -1;

            const currSecond =
                curr + len < n ? rank[curr + len] : -1;

            const different =
                rank[prev] !== rank[curr] ||
                prevSecond !== currSecond;

            newRank[curr] = newRank[prev] + (different ? 1 : 0);
        }

        rank = newRank;

        if (rank[sa[n - 1]] === n - 1) {
            break;
        }
    }

    // Build inverse suffix array
    const position = new Array(n);

    for (let i = 0; i < n; i++) {
        position[sa[i]] = i;
    }

    // Kasai's algorithm to calculate LCP
    const lcp = new Array(n).fill(0);
    let h = 0;

    for (let i = 0; i < n; i++) {
        const r = position[i];

        if (r === 0) {
            h = 0;
            continue;
        }

        const j = sa[r - 1];

        while (
            i + h < n &&
            j + h < n &&
            nums[i + h] === nums[j + h]
        ) {
            h++;
        }

        lcp[r] = h;

        if (h > 0) {
            h--;
        }
    }

    // Find the shortest unique subarray
    let answer = n;

    for (let i = 0; i < n; i++) {
        const r = position[i];

        const previousLCP = lcp[r];
        const nextLCP = r + 1 < n ? lcp[r + 1] : 0;

        const longestLCP = Math.max(previousLCP, nextLCP);
        const uniqueLength = longestLCP + 1;

        if (uniqueLength <= n - i) {
            answer = Math.min(answer, uniqueLength);
        }
    }

    return answer;
};
