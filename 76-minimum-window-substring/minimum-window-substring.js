/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    const countT = new Map();

    for (const ch of t) {
        countT.set(ch, (countT.get(ch) || 0) + 1);
    }

    const window = new Map();

    let have = 0;
    const need = countT.size;

    let left = 0;

    let minLength = Infinity;
    let start = 0;

    for (let right = 0; right < s.length; right++) {
        const ch = s[right];

        window.set(ch, (window.get(ch) || 0) + 1);

        if (countT.has(ch) && window.get(ch) === countT.get(ch)) {
            have++;
        }

        while (have === need) {
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                start = left;
            }

            const leftChar = s[left];

            window.set(leftChar, window.get(leftChar) - 1);

            if (countT.has(leftChar) && window.get(leftChar) < countT.get(leftChar)) {
                have--;
            }

            left++;
        }
    }

    return minLength === Infinity ? "" : s.substring(start, start + minLength);

};