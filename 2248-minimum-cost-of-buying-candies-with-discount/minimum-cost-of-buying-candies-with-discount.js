/**
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function (cost) {
    cost.sort((a, b) => b - a); // descending order

    let total = 0;

    for (let i = 0; i < cost.length; i++) {
        // Every 3rd candy is free
        if ((i + 1) % 3 !== 0) {
            total += cost[i];
        }
    }

    return total;
};