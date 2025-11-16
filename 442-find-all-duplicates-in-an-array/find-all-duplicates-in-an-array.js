/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
    // const hashMap = {};
    // const result = [];

    // for (let num of nums) {
    //     hashMap[num] = (hashMap[num] || 0) + 1
    // }
    // for (let key in hashMap) {
    //     if (hashMap[key] > 1) {
    //         result.push(parseInt(key))
    //     }
    // }
    // // if(result.length===0){
    // //     result.push(-1)
    // // }
    // return result
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        let idx = Math.abs(nums[i]) - 1;
        // console.log(idx, "idx")
        // console.log(nums[idx], "num[idx]")

        if (nums[idx] < 0) {
            // console.log(idx+1,"IF loop")
            result.push(idx + 1);
            // console.log(result, "result")
        } else {
            // console.log(nums[idx],"ELSE loop")
            nums[idx] = -nums[idx];
        }
    }

    return result;
};