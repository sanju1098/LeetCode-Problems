/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    if (prices.length < 2) return 0;

    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) { // Update the minimum price if the current price is lower
            minPrice = prices[i];
        } else {
            const profit = prices[i] - minPrice;
            maxProfit = Math.max(maxProfit, profit);
        }
    }
    return maxProfit;
};