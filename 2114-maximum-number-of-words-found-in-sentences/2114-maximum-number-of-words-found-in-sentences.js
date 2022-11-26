/**
 * @param {string[]} sentences
 * @return {number}
 */
var mostWordsFound = function(sentences) {
    let spaceSplit = sentences.map((test)=>(test.split(",")));
    let newSplit = spaceSplit.map(test=>test.toString());
    let newSplit2 = newSplit.map(test=>test.split(" ").length);
    return (Math.max.apply(0, newSplit2));
    
};