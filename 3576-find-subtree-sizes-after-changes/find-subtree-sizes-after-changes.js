/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number[]}
 */
var findSubtreeSizes = function (parent, s) {
    const n = parent.length;
    const children = Array.from({ length: n }, () => []);

    for (let i = 1; i < n; i++) {
        children[parent[i]].push(i);
    }
    const newChildren = Array.from({ length: n }, () => []);
    const charStack = Array.from({ length: 26 }, () => []);

    const stack = [[0, false]];

    while (stack.length > 0) {
        const [node, isExit] = stack.pop();
        const charIndex = s.charCodeAt(node) - 97;

        if (isExit) {
            charStack[charIndex].pop();
            continue;
        }

        const ancestors = charStack[charIndex];

        const newParent = ancestors.length > 0
            ? ancestors[ancestors.length - 1]
            : parent[node];

        if (node !== 0) {
            newChildren[newParent].push(node);
        }

        ancestors.push(node);
        stack.push([node, true]);

        for (const child of children[node]) {
            stack.push([child, false]);
        }
    }

    const answer = new Array(n).fill(1);
    const order = [];
    const traversal = [0];

    while (traversal.length > 0) {
        const node = traversal.pop();
        order.push(node);

        for (const child of newChildren[node]) {
            traversal.push(child);
        }
    }

    for (let i = order.length - 1; i >= 0; i--) {
        const node = order[i];

        for (const child of newChildren[node]) {
            answer[node] += answer[child];
        }
    }

    return answer;
};
