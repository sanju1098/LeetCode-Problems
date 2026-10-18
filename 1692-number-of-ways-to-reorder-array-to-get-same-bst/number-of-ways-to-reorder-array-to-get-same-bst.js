
/**
 * @param {number[]} nums
 * @return {number}
 */
var numOfWays = function (nums) {
    const MOD = 1000000007;
    const BIG_MOD = 1000000007n;
    const n = nums.length;

    // Precompute combinations C(n, r).
    const comb = Array.from(
        { length: n + 1 },
        () => Array(n + 1).fill(0)
    );

    for (let i = 0; i <= n; i++) {
        comb[i][0] = 1;
        comb[i][i] = 1;

        for (let j = 1; j < i; j++) {
            comb[i][j] =
                (comb[i - 1][j - 1] + comb[i - 1][j]) % MOD;
        }
    }

    function countWays(arr) {
        if (arr.length <= 2) {
            return 1;
        }

        const root = arr[0];
        const left = [];
        const right = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < root) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        const leftWays = countWays(left);
        const rightWays = countWays(right);
        const interleavings = comb[arr.length - 1][left.length];

        // BigInt prevents precision loss during multiplication.
        let result = BigInt(interleavings);
        result = (result * BigInt(leftWays)) % BIG_MOD;
        result = (result * BigInt(rightWays)) % BIG_MOD;

        return Number(result);
    }

    return (countWays(nums) - 1 + MOD) % MOD;
};