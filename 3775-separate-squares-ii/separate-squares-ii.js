/**
 * @param {number[][]} squares
 * @return {number}
 */
var separateSquares = function (squares) {
    // Step 1: Create events
    const events = [];
    for (const [x, y, l] of squares) {
        events.push({ y, type: 1, x1: x, x2: x + l });
        events.push({ y: y + l, type: -1, x1: x, x2: x + l });
    }

    // Sort events by y
    events.sort((a, b) => a.y - b.y);

    // Active x-intervals
    const active = [];

    let prevY = events[0].y;
    let totalArea = 0;
    const bands = [];

    let i = 0;

    while (i < events.length) {
        const currY = events[i].y;
        const height = currY - prevY;

        if (height > 0 && active.length > 0) {
            const unionWidth = getUnionWidth(active);
            const area = unionWidth * height;
            bands.push({
                yStart: prevY,
                yEnd: currY,
                width: unionWidth,
                area
            });
            totalArea += area;
        }

        // Process all events at currY
        while (i < events.length && events[i].y === currY) {
            const { type, x1, x2 } = events[i];
            if (type === 1) {
                active.push([x1, x2]);
            } else {
                // remove interval
                for (let j = 0; j < active.length; j++) {
                    if (active[j][0] === x1 && active[j][1] === x2) {
                        active.splice(j, 1);
                        break;
                    }
                }
            }
            i++;
        }

        prevY = currY;
    }

    // Step 2: Find split line
    const target = totalArea / 2;
    let acc = 0;

    for (const band of bands) {
        if (acc + band.area >= target) {
            const remaining = target - acc;
            return band.yStart + remaining / band.width;
        }
        acc += band.area;
    }

    return 0;
};

// Helper: compute union length of x-intervals
function getUnionWidth(intervals) {
    if (intervals.length === 0) return 0;

    intervals.sort((a, b) => a[0] - b[0]);

    let total = 0;
    let [start, end] = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        const [s, e] = intervals[i];
        if (s <= end) {
            end = Math.max(end, e);
        } else {
            total += end - start;
            start = s;
            end = e;
        }
    }

    total += end - start;
    return total;
}
