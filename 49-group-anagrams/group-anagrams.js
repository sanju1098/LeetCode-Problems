/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    /**
       Approach 1: Sorted Key
       I/P => strs = ["act","pots","tops","cat","stop","hat"]
       Sorted => ["act", "opst", "opst", "act", "opst", "aht"]
       O/P => [
                ["act", "cat"],
                ["pots", "tops", "stop"]
                ["hat"]
              ]

        * Iterate each and every element, and maintain map {}
        * act => sort = act -> use this as key
        * act : {act, act} => for act and cat
        * opst : {"pots", "tops", "stop"}
        * aht : {"hat"}
 
        Time => Sort -> m log n and string n => O (n * m log n)
        Space => map and char(length of each value) => O(n*m)
    */

    // let map = {}
    // for(let i=0;i< strs.length;i++){
    //     let sort = strs[i].split("").sort().join("")

    //     if(!map[sort]){
    //         map[sort] = [strs[i]]
    //     } else { map[sort].push(strs[i])}
    // }
    // return [...Object.values(map)]

    /**
       Approach 2: Hashed Key
       I/P => strs = ["act","pots","tops","cat","stop","hat"]
       
       act => [a:1, b:0, c:1, d:0, ....., s:0, t:1, u:0....z:0]
       Like this compare the frequency and gropu the same one
       so act , cat will have same frequecy => [a:1, b:0, c:1, d:0, ....., s:0, t:1, u:0....z:0]
       similarly other ferquech and return the Object values

       O/P => [
                ["act", "cat"],
                ["pots", "tops", "stop"]
                ["hat"]
              ]
 
        Time => O (n * m)
        Space => O(n * m)
    */

    let map = {};
    for (let i = 0; i < strs.length; i++) {
        let freqArr = Array(26).fill(0);
        let s = strs[i];
        let key;

        for (let j = 0; j < s.length; j++) {
            let index = s[j].charCodeAt() - "a".charCodeAt();
            freqArr[index]++;
        }

        for (let k = 0; k < 26; k++) {
            key = key + String.fromCharCode(k) + freqArr[k];
        }
        if (!map[key]) {
            map[key] = [s];
        } else {
            map[key].push(s);
        }
    }
    return [...Object.values(map)];
};