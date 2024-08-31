/**
 * @param {string} s
 * @return {number}
 */
var countKeyChanges = function (s) {
    let count = 0;
    let res = s.toLowerCase()
    for (let i = 0; i < res.length - 1; i++) {
        if (res[i] != res[i + 1]) {
            count++
        }
    }
    //console.log(res, count)
    return count;

};