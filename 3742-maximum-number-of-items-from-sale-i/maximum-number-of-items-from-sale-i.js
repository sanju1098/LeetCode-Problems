/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function (items, budget) {
    const n = items.length;
    const free = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i !== j && items[j][0] % items[i][0] === 0) {
                free[i]++;
            }
        }
    }

    const sorted = items
        .map(([factor, price], index) => ({
            price,
            reward: 1 + free[index]
        }))
        .sort((a, b) => b.price - a.price);

    const NEG_INF = -Infinity;

    let dp = new Array(budget + 1).fill(NEG_INF);
    dp[0] = 0;

    let answer = 0;
    let i = 0;

    while (i < n) {
        const price = sorted[i].price;
        const nextDp = dp.slice();
        const hasMin = new Array(budget + 1).fill(NEG_INF);
        while (i < n && sorted[i].price === price) {
            const reward = sorted[i].reward;

            for (let cost = budget; cost >= price; cost--) {
                if (hasMin[cost - price] !== NEG_INF) {
                    hasMin[cost] = Math.max(
                        hasMin[cost],
                        hasMin[cost - price] + reward
                    );
                }

                if (dp[cost - price] !== NEG_INF) {
                    hasMin[cost] = Math.max(
                        hasMin[cost],
                        dp[cost - price] + reward
                    );
                }

                if (nextDp[cost - price] !== NEG_INF) {
                    nextDp[cost] = Math.max(
                        nextDp[cost],
                        nextDp[cost - price] + reward
                    );
                }
            }
            i++;
        }

        for (let cost = 0; cost <= budget; cost++) {
            if (hasMin[cost] !== NEG_INF) {
                const extraCopies = Math.floor(
                    (budget - cost) / price
                );
                answer = Math.max(
                    answer,
                    hasMin[cost] + extraCopies
                );
            }
        }
        dp = nextDp;
    }
    return answer;
};
