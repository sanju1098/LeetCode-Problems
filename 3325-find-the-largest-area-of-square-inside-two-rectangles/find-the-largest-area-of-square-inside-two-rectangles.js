/**
 * @param {number[][]} bottomLeft
 * @param {number[][]} topRight
 * @return {number}
 */
var largestSquareArea = function (bottomLeft, topRight) {
    const n = bottomLeft.length;
    let maxSide = 0; // Stores the maximum side length of a square found so far

    // Iterate through all unique pairs of rectangles
    // i from 0 to n-1, j from i+1 to n-1 ensures each pair (i, j) is considered exactly once.
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Rectangle i coordinates: (r1_x1, r1_y1) is bottom-left, (r1_x2, r1_y2) is top-right
            const r1_x1 = bottomLeft[i][0];
            const r1_y1 = bottomLeft[i][1];
            const r1_x2 = topRight[i][0];
            const r1_y2 = topRight[i][1];

            // Rectangle j coordinates: (r2_x1, r2_y1) is bottom-left, (r2_x2, r2_y2) is top-right
            const r2_x1 = bottomLeft[j][0];
            const r2_y1 = bottomLeft[j][1];
            const r2_x2 = topRight[j][0];
            const r2_y2 = topRight[j][1];

            // Calculate the bottom-left corner (int_x1, int_y1) of the potential intersection rectangle.
            // The x-coordinate is the maximum of the two rectangles' left edges.
            // The y-coordinate is the maximum of the two rectangles' bottom edges.
            const int_x1 = Math.max(r1_x1, r2_x1);
            const int_y1 = Math.max(r1_y1, r2_y1);

            // Calculate the top-right corner (int_x2, int_y2) of the potential intersection rectangle.
            // The x-coordinate is the minimum of the two rectangles' right edges.
            // The y-coordinate is the minimum of the two rectangles' top edges.
            const int_x2 = Math.min(r1_x2, r2_x2);
            const int_y2 = Math.min(r1_y2, r2_y2);

            // For a valid (non-empty, non-degenerate) intersection rectangle to exist,
            // its bottom-left x-coordinate must be strictly less than its top-right x-coordinate,
            // AND its bottom-left y-coordinate must be strictly less than its top-right y-coordinate.
            // If either condition is not met, the intersection is empty or a line/point,
            // which cannot contain a square with positive area.
            if (int_x1 < int_x2 && int_y1 < int_y2) {
                // Calculate the width and height of the intersection rectangle.
                const width = int_x2 - int_x1;
                const height = int_y2 - int_y1;

                // The largest square that can fit inside this intersection rectangle
                // will have a side length equal to the minimum of its width and height.
                const currentSide = Math.min(width, height);

                // Update `maxSide` if the `currentSide` from this intersection is larger
                // than any previous maximum side length found.
                maxSide = Math.max(maxSide, currentSide);
            }
        }
    }

    // The problem asks for the maximum *area* of a square.
    // If no valid intersection was found (or all intersections were degenerate),
    // maxSide will remain 0, and 0 * 0 = 0, which correctly indicates no such square exists.
    return maxSide * maxSide;
};
