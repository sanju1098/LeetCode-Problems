/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDistance = function (nums) {
    const map = new Map();

    // Step 1: group indices
    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) {
            map.set(nums[i], []);
        }
        map.get(nums[i]).push(i);
    }

    let minDist = Infinity;

    // Step 2: process each value
    for (let indices of map.values()) {
        if (indices.length < 3) continue;

        // Step 3: check consecutive triplets
        for (let i = 0; i <= indices.length - 3; i++) {
            let dist = 2 * (indices[i + 2] - indices[i]);
            minDist = Math.min(minDist, dist);
        }
    }

    return minDist === Infinity ? -1 : minDist;
}