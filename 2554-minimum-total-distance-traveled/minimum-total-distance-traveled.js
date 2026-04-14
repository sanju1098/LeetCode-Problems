/**
 * @param {number[]} robot
 * @param {number[][]} factory
 * @return {number}
 */
var minimumTotalDistance = function (robot, factory) {
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);

    const n = robot.length;
    const m = factory.length;

    const dp = Array.from({ length: m + 1 }, () =>
        new Array(n + 1).fill(Infinity)
    );

    dp[0][0] = 0;

    for (let j = 1; j <= m; j++) {
        let [pos, limit] = factory[j - 1];

        for (let i = 0; i <= n; i++) {
            dp[j][i] = dp[j - 1][i]; // skip this factory

            let cost = 0;

            // assign k robots to this factory
            for (let k = 1; k <= limit && k <= i; k++) {
                cost += Math.abs(robot[i - k] - pos);
                dp[j][i] = Math.min(
                    dp[j][i],
                    dp[j - 1][i - k] + cost
                );
            }
        }
    }

    return dp[m][n];
}