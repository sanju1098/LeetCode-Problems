/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
    s = s.split("");
    for(x=0;x<s.length;x = x + (2*k)){
        for(i=0;i<Math.floor(k/2);i++){
            let temp = s[x+i];
            s[x+i]= s[x + k-1-i];
            s[x + k-1-i] = temp;
        }
    }
    return s.join("")
};