/**
 * @param {number} n
 * @return {number}
 */
var mirrorDistance = function (n) {
    let rev = 0;
    let temp = n;

    while (temp > 0) {
        rev = rev * 10 + (temp % 10);
        temp = Math.floor(temp / 10);
    }

    return Math.abs(n - rev);
};