/**
 * @param {number[][]} intervals
 * @return {number}
 */
var intersectionSizeTwo = function (intervals) {
    intervals.sort((a, b) => {
        if (a[1] === b[1]) return b[0] - a[0];
        return a[1] - b[1];
    });

    let S = [];   // store selected numbers (only last 2 needed)

    for (let [start, end] of intervals) {

        // Count how many of S fall inside [start, end]
        let count = 0;
        if (S.length > 0 && S[S.length - 1] >= start) count++;
        if (S.length > 1 && S[S.length - 2] >= start) count++;

        // If already 2 numbers inside → continue
        if (count >= 2) continue;

        // Need 1 or 2 more numbers
        if (count === 1) {
            // Only 1 is inside → add 1 more (largest possible)
            let last = S[S.length - 1];
            let newNum = end;      // choose largest
            if (newNum === last) newNum = end - 1; // avoid duplicate
            S.push(newNum);
        } else {
            // No numbers inside → add 2 numbers: end-1 and end
            S.push(end - 1);
            S.push(end);
        }
    }

    return S.length;
};