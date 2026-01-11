/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
    if (matrix.length === 0) return 0;

    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights = new Array(cols).fill(0);
    let maxArea = 0;

    for (let i = 0; i < rows; i++) {
        // Build histogram
        for (let j = 0; j < cols; j++) {
            heights[j] = matrix[i][j] === "1" ? heights[j] + 1 : 0;
        }

        // Calculate largest rectangle in histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
};

function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    heights.push(0); // Sentinel

    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            const h = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * width);
        }
        stack.push(i);
    }

    heights.pop(); // Cleanup
    return maxArea;
}
