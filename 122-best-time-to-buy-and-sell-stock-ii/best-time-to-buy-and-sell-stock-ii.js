/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let maxProfitVal = 0 // Space Complexity = O(1)
    for(i=0; i<prices.length - 1; i++){ // Time Complexity O(n)
        if(prices[i+1] > prices[i]){
            maxProfitVal += (prices[i+1] - prices[i]);
        }
    }
    return maxProfitVal;
};