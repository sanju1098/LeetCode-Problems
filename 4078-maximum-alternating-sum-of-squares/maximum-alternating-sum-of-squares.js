/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function (nums) {
    const squares = nums
        .map(num => num * num)
        .sort((a, b) => a - b);
    let score = 0;
    let left = 0;
    let right = squares.length - 1;
    while (left < right) {
        score += squares[right] - squares[left];
        right--;
        left++;
    }
    if (left === right) {
        score += squares[left];
    }
    return score;
};
