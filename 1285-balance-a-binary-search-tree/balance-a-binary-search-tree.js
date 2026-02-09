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
var balanceBST = function (root) {
    const values = [];

    // inorder traversal to collect sorted values
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        values.push(node.val);
        inorder(node.right);
    }

    inorder(root);

    // build balanced BST from sorted array
    function build(l, r) {
        if (l > r) return null;

        const mid = Math.floor((l + r) / 2);
        const node = new TreeNode(values[mid]);
        node.left = build(l, mid - 1);
        node.right = build(mid + 1, r);
        return node;
    }

    return build(0, values.length - 1);
};