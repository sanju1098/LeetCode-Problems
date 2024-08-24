/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    const charCount = {};

    // First pass: count the occurrences of each character
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        charCount[char] = (charCount[char] || 0) + 1;
    }

    console.log(s)

    // Second pass: find the first character that has a count of 1
    for (let i = 0; i < s.length; i++) {
        if (charCount[s[i]] === 1) {
            return i;
        }
    }

    // If no unique character is found, return -1
    return -1;
    
};