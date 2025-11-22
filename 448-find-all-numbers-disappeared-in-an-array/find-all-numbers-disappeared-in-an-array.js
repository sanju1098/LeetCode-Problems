/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        let index = Math.abs(nums[i]) - 1;
        // console.log(index, "index")
        nums[index] = -Math.abs(nums[index]); // mark as visited
        // console.log(nums[index])
    }
    // console.log(nums,"nums")

    let result = [];
    for (let i = 0; i < nums.length; i++) {
        // console.log(i,"num=>", nums[i])
        if (nums[i] > 0) result.push(i + 1);
    }

    return result;
};