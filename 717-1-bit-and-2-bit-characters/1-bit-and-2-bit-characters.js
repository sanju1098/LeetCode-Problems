/**
 * @param {number[]} bits
 * @return {boolean}
 */
var isOneBitCharacter = function (bits) {
let i = 0;
    while (i < bits.length - 1) {
        // console.log("while loop", i)
        if (bits[i] === 1) {
        // console.log("if loop", bits[i])
            i += 2; // skip next bit also since it's 2-bit character
        // console.log("if -> i+2", i)
        } else {
            i += 1; // 1-bit character
            // console.log("else loop", i+1)
        }
    }
    // console.log(i,"i")
    // console.log(bits,bits.length-1,"bits length")
    return i === bits.length - 1;
};