/**
 * @param {string[]} queries
 * @param {string[]} dictionary
 * @return {string[]}
 */
var twoEditWords = function (queries, dictionary) {
    const res = [];

    const isValid = (a, b) => {
        let diff = 0;

        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                diff++;
                if (diff > 2) return false;
            }
        }

        return true;
    };

    for (let q of queries) {
        for (let d of dictionary) {
            if (isValid(q, d)) {
                res.push(q);
                break;
            }
        }
    }

    return res;
};