/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function (moves) {

    // let u = 0, d = 0, l = 0, r = 0;

    // for (let m of moves) {
    //     if (m === 'U') u++;
    //     else if (m === 'D') d++;
    //     else if (m === 'L') l++;
    //     else if (m === 'R') r++;
    // }

    // return u === d && l === r;

    let x = 0, y = 0;

    for (let move of moves) {
        if (move === 'R') x++;
        else if (move === 'L') x--;
        else if (move === 'U') y++;
        else if (move === 'D') y--;
    }

    return x === 0 && y === 0;
};