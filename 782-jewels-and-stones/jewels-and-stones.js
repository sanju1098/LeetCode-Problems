/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function (jewels, stones) {
    let count = 0;

    // Time O(n)
    // for(let i=0; i<stones.length;i++){
    //     if(jewels.includes(stones[i])){
    //         ++count;
    //     }
    // }

    // Time O(m*n) - Space O(1)
    // for(let i=0; i<stones.length;i++){
    //     for(j=0;j<jewels.length;j++){
    //         if(jewels[j] === stones[i]){
    //             count ++;
    //             break
    //         }
    //     }
    // }

    // Time O(m*n) - Space O(1) => Optimised
    let set = new Set();
    for (let i = 0; i < jewels.length; i++) {
        set.add(jewels[i])
    }
    for (let i = 0; i < stones.length; i++) {
        if (set.has(stones[i])) {
            count++;
        }
    }
    return count;
};