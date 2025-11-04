/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let temp = x;
    x=Math.abs(x)
    let rev = 0;
    while (x > 0) {
        let last = x % 10;
        rev = (10 * rev) + last;
        x = Math.floor(x / 10)
    }
    let limit = Math.pow(2,31)
    if(rev < -limit || rev > limit) return 0
    return temp < 0 ? -rev : rev
};