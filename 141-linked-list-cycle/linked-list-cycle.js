/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    // Approach 1 - Hash Set - T:O(n) and S:O(n)
    const set = new Set();
    let curr = head;
    while (curr !== null) {
        if (set.has(curr)) return true;
        set.add(curr);
        curr = curr.next;
    }
    return false
};