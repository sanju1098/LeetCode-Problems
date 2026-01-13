/**
 * @param {number[][]} squares
 * @return {number}
 */
var separateSquares = function (squares) {
    let low = Infinity;
    let high = -Infinity;

    for (const [x, y, l] of squares) {
        low = Math.min(low, y);
        high = Math.max(high, y + l);
    }

    const areaDiff = (H) => {
        let below = 0;
        let above = 0;

        for (const [x, y, l] of squares) {
            const bottom = y;
            const top = y + l;

            if (H >= top) {
                below += l * l;
            } else if (H <= bottom) {
                above += l * l;
            } else {
                below += (H - bottom) * l;
                above += (top - H) * l;
            }
        }

        return below - above;
    };

    // Binary search
    for (let i = 0; i < 60; i++) {
        const mid = (low + high) / 2;
        if (areaDiff(mid) < 0) {
            low = mid;
        } else {
            high = mid;
        }
    }

    return low;
};