/**
 * @param {string} moves
 * @return {number}
 */
var furthestDistanceFromOrigin = function (moves) {
    let L = 0, R = 0, blank = 0;

    for (let ch of moves) {
        if (ch === 'L') L++;
        else if (ch === 'R') R++;
        else blank++;
    }

    return Math.abs(R - L) + blank;
};