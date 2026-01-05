/**
 * @param {number[][]} matrix
 * @return {number}
 */
var maxMatrixSum = function (matrix) {
    let totalSum = 0;
    let negativeCount = 0;
    let minAbs = Infinity;

    for (let row of matrix) {
        for (let val of row) {
            if (val < 0) negativeCount++;
            const absVal = Math.abs(val);
            totalSum += absVal;
            minAbs = Math.min(minAbs, absVal);
        }
    }

    if (negativeCount % 2 === 0) {
        return totalSum;
    } else {
        return totalSum - 2 * minAbs;
    }
};