/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
    const res = [];
    const n = s.length;
    const m = words.length;
    if (m === 0) return res;

    const wLen = words[0].length;
    const totalLen = m * wLen;
    if (n < totalLen) return res;

    const freq = Object.create(null);
    for (const w of words) freq[w] = (freq[w] || 0) + 1;

    for (let i = 0; i < wLen; i++) {
        let left = i;
        let count = 0;
        let seen = Object.create(null);

        for (let right = i; right + wLen <= n; right += wLen) {
            const word = s.slice(right, right + wLen);

            if (freq[word] !== undefined) {
                seen[word] = (seen[word] || 0) + 1;
                count++;

                while (seen[word] > freq[word]) {
                    const lw = s.slice(left, left + wLen);
                    seen[lw]--;
                    left += wLen;
                    count--;
                }

                if (count === m) {
                    res.push(left);
                }
            } else {
                // Fast reset
                seen = Object.create(null);
                count = 0;
                left = right + wLen;
            }
        }
    }

    return res;
};