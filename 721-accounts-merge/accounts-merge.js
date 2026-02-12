/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
    const parent = new Map();
    const emailToName = new Map();

    // Find with path compression
    function find(x) {
        if (parent.get(x) !== x) {
            parent.set(x, find(parent.get(x)));
        }
        return parent.get(x);
    }

    // Union
    function union(x, y) {
        const rootX = find(x);
        const rootY = find(y);
        if (rootX !== rootY) {
            parent.set(rootY, rootX);
        }
    }

    // Step 1: Initialize
    for (let acc of accounts) {
        const name = acc[0];
        for (let i = 1; i < acc.length; i++) {
            const email = acc[i];
            if (!parent.has(email)) {
                parent.set(email, email);
            }
            emailToName.set(email, name);
            union(acc[1], email); // connect all emails to first email
        }
    }

    // Step 2: Group by root
    const groups = new Map();

    for (let email of parent.keys()) {
        const root = find(email);
        if (!groups.has(root)) {
            groups.set(root, []);
        }
        groups.get(root).push(email);
    }

    // Step 3: Build result
    const result = [];
    for (let [root, emails] of groups) {
        emails.sort();
        result.push([emailToName.get(root), ...emails]);
    }

    return result;
};
