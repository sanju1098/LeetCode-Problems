/**
 * @param {number[]} positions
 * @param {number[]} healths
 * @param {string} directions
 * @return {number[]}
 */
var survivedRobotsHealths = function (positions, healths, directions) {
    let n = positions.length;

    let robots = [];
    for (let i = 0; i < n; i++) {
        robots.push({
            pos: positions[i],
            health: healths[i],
            dir: directions[i],
            idx: i
        });
    }

    // Sort by position
    robots.sort((a, b) => a.pos - b.pos);

    let stack = [];

    for (let robot of robots) {
        if (robot.dir === 'R') {
            stack.push(robot);
        } else {
            // moving left → collision
            while (stack.length && stack[stack.length - 1].dir === 'R') {
                let top = stack[stack.length - 1];

                if (top.health < robot.health) {
                    stack.pop();
                    robot.health -= 1;
                } else if (top.health > robot.health) {
                    top.health -= 1;
                    robot.health = 0;
                    break;
                } else {
                    // equal
                    stack.pop();
                    robot.health = 0;
                    break;
                }
            }

            if (robot.health > 0) {
                stack.push(robot);
            }
        }
    }

    // Sort back to original order
    stack.sort((a, b) => a.idx - b.idx);

    return stack.map(r => r.health);
};