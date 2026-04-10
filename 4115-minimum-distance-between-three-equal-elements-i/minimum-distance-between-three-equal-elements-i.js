/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDistance = function (nums) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) {
            map.set(nums[i], []);
        }
        map.get(nums[i]).push(i);
    }

    let ans = Infinity;

    for (let indices of map.values()) {
        if (indices.length < 3) continue;

        for (let i = 0; i <= indices.length - 3; i++) {
            let first = indices[i];
            let third = indices[i + 2];

            let dist = 2 * (third - first);
            ans = Math.min(ans, dist);
        }
    }

    return ans === Infinity ? -1 : ans;
}