/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    let currCount = 0;
    let maxCount = 0;

    for(let i=0; i<nums.length;i++){
        if(nums[i]===1){
            currCount++
        }
        else {
            maxCount = Math.max(maxCount, currCount)
            currCount = 0
        }
    }
    // return maxCount // if last ele is the max count -> that count wont update
    return Math.max(maxCount, currCount)
};