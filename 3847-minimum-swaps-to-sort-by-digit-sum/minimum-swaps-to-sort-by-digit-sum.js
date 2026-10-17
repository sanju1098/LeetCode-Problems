
/**
 * @param {number[]} nums
 * @return {number}
 */
var minSwaps = function (nums) {
    const digitSum = (num) => {
        let sum = 0;

        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }

        return sum;
    };

    const n = nums.length;

    const arr = nums.map(num => ({
        value: num,
        sum: digitSum(num)
    }));

    arr.sort((a, b) => {
        if (a.sum !== b.sum) {
            return a.sum - b.sum;
        }
        return a.value - b.value;
    });

    const originalIndex = new Map();

    nums.forEach((num, i) => {
        originalIndex.set(num, i);
    });

    const visited = new Array(n).fill(false);
    let swaps = 0;

    for (let i = 0; i < n; i++) {
        if (visited[i] || originalIndex.get(arr[i].value) === i) {
            visited[i] = true;
            continue;
        }

        let cycleLength = 0;
        let j = i;

        while (!visited[j]) {
            visited[j] = true;
            j = originalIndex.get(arr[j].value);
            cycleLength++;
        }

        if (cycleLength > 1) {
            swaps += cycleLength - 1;
        }
    }
    return swaps;
};
