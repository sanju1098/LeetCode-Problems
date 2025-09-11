/**
 * @param {string[]} names
 * @return {string[]}
 */
var getFolderNames = function (names) {
    const used = new Map();
    const result = [];

    for (let name of names) {
        if (!used.has(name)) {  // name not taken yet
            result.push(name);
            used.set(name, 1); // next suffix to try will be (1)
        } else {
            let k = used.get(name);
            let newName = `${name}(${k})`;

            // keep increasing until unique
            while (used.has(newName)) {
                k++;
                newName = `${name}(${k})`;
            }

            result.push(newName);
            used.set(name, k + 1);  // next time start from k+1
            used.set(newName, 1);   // mark new name as used
        }
    }

    return result;


};