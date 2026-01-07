/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxProduct = function (root) {
    const MOD = 1_000_000_007;
    let totalSum = 0;
    let maxProd = 0;

    // First DFS: compute total sum
    function getTotalSum(node) {
        if (!node) return 0;
        return node.val + getTotalSum(node.left) + getTotalSum(node.right);
    }

    totalSum = getTotalSum(root);

    // Second DFS: compute subtree sums and max product
    function dfs(node) {
        if (!node) return 0;

        const leftSum = dfs(node.left);
        const rightSum = dfs(node.right);
        const subtreeSum = node.val + leftSum + rightSum;

        const product = subtreeSum * (totalSum - subtreeSum);
        maxProd = Math.max(maxProd, product);

        return subtreeSum;
    }

    dfs(root);

    return maxProd % MOD;
};