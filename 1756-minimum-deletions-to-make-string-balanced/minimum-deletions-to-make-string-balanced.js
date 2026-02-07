/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function (s) {
    let bCount = 0;
    let deletions = 0;

    for (let ch of s) {
        if (ch === 'b') {
            bCount++;
        } else { // ch === 'a'
            // Either delete this 'a' (deletions + 1)
            // or delete all previous 'b's (bCount)
            deletions = Math.min(deletions + 1, bCount);
        }
    }

    return deletions;
};

{/**
    Char	bCount	deletions
    a	      0	        0
    a	      0	        0
    b	      1	        0
    a	      1	        min(1,1)=1
    b	      2	        1
    b	      3	        1
    a	      3	        min(2,3)=2
    b	      4	        2

    Output: 2
*/}