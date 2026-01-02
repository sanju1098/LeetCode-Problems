/**
 * @param {number[]} nums
 * @return {number}
 */
var repeatedNTimes = function (nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) return nums[i];
        if (i + 2 < nums.length && nums[i] === nums[i + 2]) return nums[i];
        if (i + 3 < nums.length && nums[i] === nums[i + 3]) return nums[i];
    }
};

{/** Dry Run – nums = [1, 2, 3, 3]
    i = 0, nums[0] = 1, nums[1] = 2, nums[2] = 3
    Check 1: nums[0] === nums[1] → 1 === 2 ❌
    Check 2: nums[0] === nums[2] → 1 === 3 ❌
    No match → continue loop
    
    i = 1, nums[1] = 2, nums[2] = 3, nums[3] = 3
    Check 1: nums[1] === nums[2] → 2 === 3 ❌
    Check 2: nums[1] === nums[3] → 2 === 3 ❌
    No match → continue loop
    
    i = 2, nums[2] = 3, nums[3] = 3
    Check 1: nums[2] === nums[3] → 3 === 3 ✅
    Return 3
    
    Final Output: 3
 */}