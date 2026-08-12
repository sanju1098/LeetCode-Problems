/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    const result = [];
    function backtrack(index, remaining, current) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        if (remaining < 0 || index === candidates.length) {
            return;
        }
        // Choose the current number
        current.push(candidates[index]);
        backtrack(index, remaining - candidates[index], current);
        current.pop();
        // Skip the current number
        backtrack(index + 1, remaining, current);
    }
    backtrack(0, target, []);
    return result;
};