/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    /**
         * Approach 1: Brute Force (O(n²))
         * For every element, multiply all the other elements except itself.
         */
    // const result = [];
    // for (let i = 0; i < nums.length; i++) {
    //     let product = 1;
    //     for (let j = 0; j < nums.length; j++) {
    //         if (i !== j) {
    //             product *= nums[j];
    //         }
    //     }
    //     result.push(product);
    // }
    // return result;

    /**
     * Optimal Solution (O(n), No Division)
     * Instead of multiplying everything every time:
     *
     * First store the product of all elements to the left.
     * Then multiply it with the product of all elements to the right.
     *
     * nums = [1,2,4,6]
     * Left Products => [1,1,2,8]
     * Right Products => [48,24,6,1]
     *
     * Multiply => [48,24,12,8]
     */

    const n = nums.length;
    const result = new Array(n).fill(1);

    // Left products
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    // Right products
    let postfix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= postfix;
        postfix *= nums[i];
    }

    return result;
};