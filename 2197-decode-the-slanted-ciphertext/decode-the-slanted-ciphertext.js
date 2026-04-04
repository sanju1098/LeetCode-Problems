/**
 * @param {string} encodedText
 * @param {number} rows
 * @return {string}
 */
var decodeCiphertext = function (encodedText, rows) {
    if (rows === 1) return encodedText;

    let n = encodedText.length;
    let cols = n / rows;

    // Step 1: build matrix
    let matrix = [];
    let idx = 0;

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = encodedText[idx++];
        }
    }

    // Step 2: read diagonals
    let result = "";

    for (let startCol = 0; startCol < cols; startCol++) {
        let i = 0, j = startCol;

        while (i < rows && j < cols) {
            result += matrix[i][j];
            i++;
            j++;
        }
    }

    // Step 3: remove trailing spaces
    return result.trimEnd();
};