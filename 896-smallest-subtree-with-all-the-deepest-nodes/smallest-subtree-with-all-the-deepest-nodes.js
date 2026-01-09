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
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function (root) {

    function dfs(node) {
        if (!node) return { node: null, depth: 0 };

        const left = dfs(node.left);
        const right = dfs(node.right);

        if (left.depth === right.depth) {
            return {
                node: node,
                depth: left.depth + 1
            };
        }

        if (left.depth > right.depth) {
            return {
                node: left.node,
                depth: left.depth + 1
            };
        } else {
            return {
                node: right.node,
                depth: right.depth + 1
            };
        }
    }

    return dfs(root).node;
};