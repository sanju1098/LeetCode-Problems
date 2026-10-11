/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
    let l = 0;
    let r = nums.length - 1
    while (l < r) {
        let leftCount;
        let mid = l + Math.floor((r - l) / 2)
        if (nums[mid] === nums[mid - 1]) {
            leftCount = mid - 1 - l
            if (leftCount % 2 === 1) {
                r = mid - 2
            } else { l = mid + 1 }
        }
        else if (nums[mid] === nums[mid + 1]) {
            leftCount = mid - l
            if (leftCount % 2 === 1) {
                r = mid - 1
            } else { l = mid + 2 }
        } else {
            return nums[mid]
        }
    }
    return nums[l]
};