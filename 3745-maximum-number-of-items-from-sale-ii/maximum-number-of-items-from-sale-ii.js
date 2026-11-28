/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function (items, budget) {
    const n = items.length;
    const freq = new Array(n + 1).fill(0);

    for (const [factor] of items) {
        freq[factor]++;
    }
    const bonusCount = new Array(n + 1).fill(0);

    for (let factor = 1; factor <= n; factor++) {
        let count = 0;

        for (let multiple = factor; multiple <= n; multiple += factor) {
            count += freq[multiple];
        }
        bonusCount[factor] = count - 1;
    }

    let minPrice = Infinity;

    for (const [factor, price] of items) {
        minPrice = Math.min(minPrice, price);
    }

    const groups = new Map();

    for (const [factor, price] of items) {
        const capacity = bonusCount[factor];

        if (capacity === 0 || price > 2 * minPrice) {
            continue;
        }

        groups.set(
            price,
            (groups.get(price) || 0) + capacity
        );
    }

    const sortedPrices = [...groups.keys()].sort((a, b) => a - b);

    let remainingBudget = budget;
    let bonusCopies = 0;
    let answer = Math.floor(budget / minPrice);

    for (const price of sortedPrices) {
        const capacity = groups.get(price);

        const affordable = Math.floor(remainingBudget / price);
        const take = Math.min(capacity, affordable);

        bonusCopies += take;
        remainingBudget -= take * price;
        const totalItems =
            bonusCopies * 2 +
            Math.floor(remainingBudget / minPrice);

        answer = Math.max(answer, totalItems);

        if (take < capacity) {
            break;
        }
    }
    return answer;
};
