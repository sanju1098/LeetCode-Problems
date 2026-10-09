/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
    let open = 0;
    let insertions = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            open++;
        } else {
            // Check whether we have two consecutive ')'
            if (i + 1 < s.length && s[i + 1] === ")") {
                i++;
            } else {
                insertions++;
            }

            if (open > 0) {
                open--;
            } else {
                insertions++;
            }
        }
    }
    return insertions + open * 2;
};