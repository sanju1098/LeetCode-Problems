/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (!digits.length) return [];

    const phoneMap = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
    };

    let result = [""];

    for (let digit of digits) {
        let temp = [];
        let letters = phoneMap[digit]; 
        for (let combination of result) {
            for (let letter of letters) {
                temp.push(combination + letter);
            }
        }

        result = temp; 
    }

    return result;
};