/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
    let l = 0
    let r = arr.length - k
    while (l < r) {
        let mid = l + Math.floor((r - l) / 2)
        if ((arr[mid + k] - x) < (x - arr[mid])) {
            l = mid + 1
        } else { r = mid }
    } let ans = []
    for (let i = l; i < l + k; i++) {
        ans.push(arr[i])
    }
    return ans
};