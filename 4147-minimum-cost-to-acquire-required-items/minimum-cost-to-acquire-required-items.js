/**
 * @param {number} cost1
 * @param {number} cost2
 * @param {number} costBoth
 * @param {number} need1
 * @param {number} need2
 * @return {number}
 */
var minimumCost = function (cost1, cost2, costBoth, need1, need2) {
    const bothCount = Math.min(need1, need2);

    // Option 1: Buy type 3 items for shared requirements
    const costOption1 =
        bothCount * costBoth +
        (need1 - bothCount) * cost1 +
        (need2 - bothCount) * cost2;

    // Option 2: Buy type 3 items to satisfy the larger requirement,
    // even if the smaller requirement gets exceeded
    const costOption2 = Math.max(need1, need2) * costBoth;

    // Option 3: Buy only individual items
    const costOption3 = need1 * cost1 + need2 * cost2;

    return Math.min(costOption1, costOption2, costOption3);
};