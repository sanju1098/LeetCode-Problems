/**
 * @param {number} n
 * @return {boolean}
 */
var canAliceWin = function (n) {
    let stonesToRemove = 10;
    let isAliceTurn = true;

    while (n >= stonesToRemove) {
        n -= stonesToRemove;
        stonesToRemove--;
        isAliceTurn = !isAliceTurn;
    }

    return !isAliceTurn;
};