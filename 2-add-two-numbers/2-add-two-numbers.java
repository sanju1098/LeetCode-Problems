/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode result = new ListNode(-1);
        ListNode p = result;
        int carry = 0;
        
        while(l1 != null || l2!= null)
        {
            if(l1 != null)
            {
                carry += l1.val;
                l1 = l1.next;
            }
            
            if(l2 != null)
            {
                carry += l2.val;
                l2 = l2.next;
            }
            
            p.next = new ListNode(carry%10);
            carry /= 10;
            p = p.next;
        }
        
        if(carry == 1)
            p.next = new ListNode(1);
        
        return result.next;
        
    }    
}