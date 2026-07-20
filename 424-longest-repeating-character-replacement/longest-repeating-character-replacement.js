/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
    // Time - O(n²); Space - O(26) ≈ O(1)
    // let maxLength = 0;
    // for (let i = 0; i < s.length; i++) {
    //     const map = new Map();
    //     let maxFreq = 0;
    //     for (let j = i; j < s.length; j++) {
    //         map.set(s[j], (map.get(s[j]) || 0) + 1);
    //         maxFreq = Math.max(maxFreq, map.get(s[j]));
    //         const window = j - i + 1;
    //         if (window - maxFreq <= k) {
    //             maxLength = Math.max(maxLength, window);
    //         }
    //     }
    // }
    // return maxLength;
    /** Sliding Window (Optimal) -Time - O(n); Space - O(26) ≈ O(1)*/
    const map = new Map();
    let left = 0;
    let maxFreq = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        map.set(s[right], (map.get(s[right]) || 0) + 1);
        maxFreq = Math.max(maxFreq, map.get(s[right]));
        while (right - left + 1 - maxFreq > k) {
            map.set(s[left], map.get(s[left]) - 1);
            left++;
        }
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
};