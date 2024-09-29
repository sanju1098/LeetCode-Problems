/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        if (haystack.charAt(i) === needle.charAt(0)) {
            // Check each character of the needle.
            for (let j = 0; j < needle.length; j++) {
                // If any character doesn't match, it's not a match.
                if (haystack.charAt(i + j) !== needle.charAt(j)) {
                    break;
                }
                // If all characters matched, return the starting index.
                if (j === needle.length - 1) {
                    return i;
                }
            }
        }
    }
    // If no match was found, return -1.
    return -1;
};