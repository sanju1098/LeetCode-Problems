class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int max = 0;
        int current = 0;
        for (int i : nums) {
            if (i == 1) {
                current++;
            } else {
                if (current > max) {
                    max = current;
                }
                if (max >= nums.length / 2) {
                    return max;
                }
                current = 0;
            }
        }
        return Math.max(max, current);
    }
}