/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minBitwiseArray = function (nums) {
    return nums.map(n => {
        if ((n & 1) === 0) return -1; // even → impossible

        let ans = Infinity;

        for (let i = 0; i < 31; i++) {
            if ((n & (1 << i)) !== 0) {
                // turn bit i off
                let x = n & ~(1 << i);
                // set all lower bits to 1
                x |= (1 << i) - 1;

                if ((x | (x + 1)) === n) {
                    ans = Math.min(ans, x);
                }
            }
        }

        return ans === Infinity ? -1 : ans;
    });
};