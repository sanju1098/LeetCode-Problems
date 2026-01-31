/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
    let left = 0;
    let right = letters.length - 1;
    let ans = letters[0]; // default wrap-around

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (letters[mid] > target) {
            ans = letters[mid];
            right = mid - 1; // try to find smaller valid char
        } else {
            left = mid + 1;
        }
    }

    return ans;
};