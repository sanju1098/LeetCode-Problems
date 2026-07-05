/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    /** Sort and Split => Time - O(n log n) || Space - O(n) */
    // if (s.length !== t.length) return false;
    // return s.split("").sort().join("") === t.split("").sort().join("");

    /** Optimised Approach */
    /**Hash Map Approach
    
    s = anagram => {a:3, n:1, g:1, r:1, m:1}
    and now decremenet the Map with comparing t => Start Traversing of t and start reducing the count
    t = {a:0, n:0, g:0, r:0, m:0}

    if all the amp of t is ) then true else false
     */

    let map = {};
    if (s.length != t.length) return false

    for (let i = 0; i < s.length; i++) { // O(n)
        if (!map[s[i]]) {
            map[s[i]] = 1;
        } else { ++map[s[i]] }
    }

    for (let i = 0; i < t.length; i++) { // O(n)
        if (!map[t[i]] || map[t[i]] < 0) {
            return false
        } else { --map[t[i]] }
    }
    /** Time - O(n) + O(n) = O(n) || Space - O(1) */
    return true
};