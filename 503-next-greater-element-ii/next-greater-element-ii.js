/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
    let arr = [...nums, ...nums] // doubling the array
    let n = arr.length

    let stack = [];
    let ans = Array(n).fill(-1);

    stack.push(arr[n - 1])
    for (let i = n - 2; i >= 0; i--) {
        while (stack.length) {
            let top = stack[stack.length - 1]
            if (arr[i] < top) {
                ans[i] = top;
                break
            } else {
                stack.pop()
            }
        } stack.push(arr[i])
    }
    return ans.slice(0, n / 2)
};