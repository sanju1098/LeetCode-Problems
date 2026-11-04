/**
 * @param {number[]} nums
 * @param {number} x
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, x, k) {
    const n = nums.length;
    const m = n - x + 1;

    // Coordinate compression
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const size = sorted.length;
    const indexMap = new Map();

    for (let i = 0; i < size; i++) {
        indexMap.set(sorted[i], i + 1);
    }

    // Fenwick Tree for counts and sums
    class Fenwick {
        constructor(size) {
            this.size = size;
            this.tree = new Array(size + 1).fill(0);
        }

        update(index, delta) {
            while (index <= this.size) {
                this.tree[index] += delta;
                index += index & -index;
            }
        }

        query(index) {
            let sum = 0;

            while (index > 0) {
                sum += this.tree[index];
                index -= index & -index;
            }

            return sum;
        }

        // Find the index of the element with the given rank
        kth(rank) {
            let index = 0;
            let bit = 1;

            while ((bit << 1) <= this.size) {
                bit <<= 1;
            }

            for (; bit > 0; bit >>= 1) {
                const next = index + bit;

                if (
                    next <= this.size &&
                    this.tree[next] < rank
                ) {
                    rank -= this.tree[next];
                    index = next;
                }
            }

            return index + 1;
        }
    }

    const countTree = new Fenwick(size);
    const sumTree = new Fenwick(size);

    let windowSum = 0;

    // Build the first window
    for (let i = 0; i < x; i++) {
        const idx = indexMap.get(nums[i]);

        countTree.update(idx, 1);
        sumTree.update(idx, nums[i]);

        windowSum += nums[i];
    }

    const costs = new Array(m);

    function getWindowCost() {
        // Lower median
        const medianRank = Math.floor((x + 1) / 2);
        const medianIdx = countTree.kth(medianRank);
        const median = sorted[medianIdx - 1];

        const leftCount = countTree.query(medianIdx);
        const leftSum = sumTree.query(medianIdx);

        const rightCount = x - leftCount;
        const rightSum = windowSum - leftSum;

        return (
            median * leftCount - leftSum +
            rightSum - median * rightCount
        );
    }

    // Calculate cost for each sliding window
    for (let start = 0; start < m; start++) {
        costs[start] = getWindowCost();

        if (start + x < n) {
            const outgoing = nums[start];
            const incoming = nums[start + x];

            const outIdx = indexMap.get(outgoing);
            const inIdx = indexMap.get(incoming);

            countTree.update(outIdx, -1);
            sumTree.update(outIdx, -outgoing);

            countTree.update(inIdx, 1);
            sumTree.update(inIdx, incoming);

            windowSum += incoming - outgoing;
        }
    }

    // DP with rolling arrays
    const INF = Infinity;

    // For zero subarrays, cost is 0 for every prefix
    let prev = new Array(n + 1).fill(0);

    for (let j = 1; j <= k; j++) {
        const curr = new Array(n + 1).fill(INF);

        for (let pos = 1; pos <= n; pos++) {
            // Skip current element
            curr[pos] = curr[pos - 1];

            // Select a subarray of size x ending at pos - 1
            if (pos >= x) {
                const start = pos - x;

                if (prev[start] !== INF) {
                    curr[pos] = Math.min(
                        curr[pos],
                        prev[start] + costs[start]
                    );
                }
            }
        }

        prev = curr;
    }

    return prev[n];
};
