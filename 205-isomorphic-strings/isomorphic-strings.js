/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
    /*
    Two Map => far & boo
    mapStoT => {f:b, a:o, r:o}
    mapTtoS => {b:f, o:a, o:a}

    r:o => before mapping check if o is present in mapTtoS

    if(t[i] is in mapTtoS) && if(mapTtoS[t[i]!==s[i]) => Not Isomorphivc
    */

    let mapStoT = {}
    let mapTtoS = {}

    for (i = 0; i < s.length; i++) {
        if (!mapStoT[s[i]] && !mapTtoS[t[i]]) {
            mapStoT[s[i]] = t[i]
            mapTtoS[t[i]] = s[i]
        } else if (mapTtoS[t[i]] !== s[i] || mapStoT[s[i]] != t[i]) return false
    }
    return true
};