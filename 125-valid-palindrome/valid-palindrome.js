/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    const str = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    // .replace(/[^a-z0-9]/g, '') --> replace all characters that are not lowercase letters or digits with an empty string. 
    // This effectively removes all non-alphanumeric characters.
    return str === str.split('').reverse().join('')
};