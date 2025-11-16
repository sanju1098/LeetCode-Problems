/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    let slow = nums[0];
    let fast = nums[0];

    // Phase 1: Detect the cycle
    do {
        // console.log("DO WHILE Loop")
        slow = nums[slow];        // move 1 step
        fast = nums[nums[fast]];  // move 2 steps
        // console.log(slow, fast, "Slow , fast")
    } while (slow !== fast);

    // Phase 2: Find the entry point (duplicate number)
    // console.log(slow, fast, "Before reset (after do while) Slow , fast")
    fast = nums[0];
    // console.log(slow, fast, "After reset (after do while) Slow , fast")

    while (fast !== slow) {
        // console.log("WHILE Loop")
        // console.log(slow, fast, " Before (inside while )Slow , fast")
        fast = nums[fast];
        slow = nums[slow];
        // console.log(slow, fast, " After (inside while )Slow , fast")
    }

    return slow;
};