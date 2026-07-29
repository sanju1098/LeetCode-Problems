/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
    let ngeMap = {};
    let stack = [];
    let n = nums2.length;

    stack.push(nums2[n - 1]);
    ngeMap[nums2[n - 1]] = -1;
    for (let i = n - 2; i >= 0; i--) {
        while (stack.length && stack[stack.length - 1] <= nums2[i]) {
            stack.pop();
        }
        if (stack.length) {
            ngeMap[nums2[i]] = stack[stack.length - 1];
        } else {
            ngeMap[nums2[i]] = -1;
        }
        stack.push(nums2[i]);
    }

    let ans = [];
    for (let i = 0; i < nums1.length; i++) {
        ans.push(ngeMap[nums1[i]]);
    }
    return ans;
};