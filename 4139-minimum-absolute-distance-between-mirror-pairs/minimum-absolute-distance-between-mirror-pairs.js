/**
 * @param {number[]} nums
 * @return {number}
 */
var minMirrorPairDistance = function (nums) {
    const map = new Map();
    let minDist = Infinity;

    const reverseNum = (num) => {
        let rev = 0;
        while (num > 0) {
            rev = rev * 10 + (num % 10);
            num = Math.floor(num / 10);
        }
        return rev;
    };

    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            minDist = Math.min(minDist, i - map.get(nums[i]));
        }

        const rev = reverseNum(nums[i]);
        map.set(rev, i);
    }

    return minDist === Infinity ? -1 : minDist;
};