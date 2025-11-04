/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    let temp = x
    let rev = 0;
    if (x < 0) return false
    while (x>0) {
        let rem = x % 10;
        rev = (rev * 10) + rem
        x = Math.floor(x / 10)
    }
    if(rev === temp) return true
    return false
};