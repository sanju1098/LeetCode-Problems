/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

    const countVowels = (word) => {
        let count = 0;
        for (let ch of word) {
            if (vowels.has(ch)) count++;
        }
        return count;
    };

    const words = s.split(" ");
    const firstWordVowelCount = countVowels(words[0]);

    const result = words.map((word, index) => {
        if (index !== 0 && countVowels(word) === firstWordVowelCount) {
            return word.split("").reverse().join("");
        }
        return word;
    });

    return result.join(" ");
};