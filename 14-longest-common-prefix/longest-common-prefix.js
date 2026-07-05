/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let x = 0;
    while (x< strs[0].length){
        let ch = strs[0][x]

        for (let i=0; i<strs.length;i++){
            if(ch!= strs[i][x] || x === strs[i].length){
                return strs[0].substring(0,x)
            }
        }
        x++
    }
    return strs[0]
};