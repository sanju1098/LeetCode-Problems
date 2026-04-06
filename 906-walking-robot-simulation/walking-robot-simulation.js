/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function (commands, obstacles) {
    let x = 0, y = 0;
    let dir = 0;

    let dirs = [
        [0, 1],   // North
        [1, 0],   // East
        [0, -1],  // South
        [-1, 0]   // West
    ];

    // Store obstacles in set
    let set = new Set();
    for (let [ox, oy] of obstacles) {
        set.add(`${ox},${oy}`);
    }

    let maxDist = 0;

    for (let cmd of commands) {

        if (cmd === -1) {
            dir = (dir + 1) % 4; // right
        }
        else if (cmd === -2) {
            dir = (dir + 3) % 4; // left
        }
        else {
            // move step by step
            for (let i = 0; i < cmd; i++) {
                let nx = x + dirs[dir][0];
                let ny = y + dirs[dir][1];

                if (set.has(`${nx},${ny}`)) break;

                x = nx;
                y = ny;

                maxDist = Math.max(maxDist, x * x + y * y);
            }
        }
    }

    return maxDist;
};