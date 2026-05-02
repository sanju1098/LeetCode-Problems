/**
 * @param {string} s
 * @return {number}
 */
var maxFreqSum = function (s) {
    let map = {};
    for (i = 0; i < s.length; i++) {
        map[s[i]] = !map[s[i]] ? 1 : ++map[s[i]]
    }
    let vowels = ['a', 'e', 'i', 'o', 'u']
    let maxVowels = 0;
    let maxConsonant = 0
    let mapKeys = Object.keys(map)

    for (let i = 0; i < mapKeys.length; i++) {
        if (vowels.includes(mapKeys[i])) {
            maxVowels = Math.max(maxVowels, map[mapKeys[i]])
        } else {
            maxConsonant = Math.max(maxConsonant, map[mapKeys[i]])
        }
    }
    return maxVowels + maxConsonant;
};