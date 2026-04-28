/**
 * @param {number[][]} grid
 * @param {number} x
 * @return {number}
 */
var minOperations = function (grid, x) {
    let arr = grid.flat();

    // Step 1: check feasibility
    let mod = arr[0] % x;
    for (let num of arr) {
        if (num % x !== mod) return -1;
    }

    // Step 2: sort
    arr.sort((a, b) => a - b);

    // Step 3: median
    let median = arr[Math.floor(arr.length / 2)];

    // Step 4: count operations
    let ops = 0;
    for (let num of arr) {
        ops += Math.abs(num - median) / x;
    }

    return ops;
};