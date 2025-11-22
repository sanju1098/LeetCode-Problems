/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
    let ops = 0;
    for (let n of nums) {
        // console.log(n, "n")
        let r = n % 3;
        // console.log(r, "r")
        if (r !== 0) ops += 1; 
    }
    console.log(ops, "ops")
    return ops;
};