/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSelectedElements = function (nums) {
    nums.sort((a, b) => a - b);

    const dp = new Map();
    let answer = 0;

    for (const num of nums) {
        const keep = (dp.get(num - 1) || 0) + 1;
        const increase = (dp.get(num) || 0) + 1;
        dp.set(num, Math.max(dp.get(num) || 0, keep));
        dp.set(num + 1, Math.max(dp.get(num + 1) || 0, increase));
        answer = Math.max(answer, keep, increase);
    }
    return answer;
};
