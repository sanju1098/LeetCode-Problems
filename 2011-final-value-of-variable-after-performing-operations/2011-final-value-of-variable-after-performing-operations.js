/**
 * @param {string[]} operations
 * @return {number}
 */
var finalValueAfterOperations = function(operations) {
     let X = 0;
    operations.map(x => x.includes('++') ? X =X+1 : X=X-1);
    return X;
    
};