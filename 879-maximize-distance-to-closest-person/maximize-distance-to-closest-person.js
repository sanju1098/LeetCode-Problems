/**
 * @param {number[]} seats
 * @return {number}
 */
var maxDistToClosest = function(seats) {
    let max = 0;
    let last = -1;

    for (let i = 0; i < seats.length; i++) {
        if (seats[i] === 1) {
            if (last === -1) {
                // Handle case where empty seats are at the start
                max = i;
            } else {
                // Calculate the distance between two occupied seats
                max = Math.max(max, Math.floor((i - last) / 2));
            }
            last = i;
        }
    }

    // Handle case where empty seats are at the end
    if (seats[seats.length - 1] === 0) {
        max = Math.max(max, seats.length - 1 - last);
    }

    return max;
};
