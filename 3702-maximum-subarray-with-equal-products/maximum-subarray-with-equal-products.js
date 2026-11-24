/**
 * @param {number[]} nums
 * @return {number}
 */
var maxLength = function (nums) {
    const gcd = (a, b) => {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };

    const lcm = (a, b) => {
        return (a / gcd(a, b)) * b;
    };

    let maxLen = 0;
    for (let i = 0; i < nums.length; i++) {
        let product = 1;
        let currentGcd = 0;
        let currentLcm = 1;
        for (let j = i; j < nums.length; j++) {
            const num = nums[j];
            product *= num;
            currentGcd = gcd(currentGcd, num);
            currentLcm = lcm(currentLcm, num);
            if (product === currentGcd * currentLcm) {
                maxLen = Math.max(maxLen, j - i + 1);
            }
        }
    }
    return maxLen;
};
