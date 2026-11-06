/**
 * @param {number} n
 * @param {number[][]} logs
 * @param {number} x
 * @param {number[]} queries
 * @return {number[]}
 */
var countServers = function (n, logs, x, queries) {
    logs.sort((a, b) => a[1] - b[1]);

    const sortedQueries = queries
        .map((q, i) => [q, i])
        .sort((a, b) => a[0] - b[0]);
    const result = new Array(queries.length);
    const activeServers = new Map();
    let left = 0;
    let right = 0;
    let activeCount = 0;

    for (const [q, index] of sortedQueries) {
        const start = q - x;

        // Add logs whose time is <= query time
        while (right < logs.length && logs[right][1] <= q) {
            const serverId = logs[right][0];
            activeServers.set(
                serverId,
                (activeServers.get(serverId) || 0) + 1
            );
            if (activeServers.get(serverId) === 1) {
                activeCount++;
            }
            right++;
        }

        // Remove logs whose time is < start
        while (left < right && logs[left][1] < start) {
            const serverId = logs[left][0];
            activeServers.set(
                serverId,
                activeServers.get(serverId) - 1
            );
            if (activeServers.get(serverId) === 0) {
                activeCount--;
                activeServers.delete(serverId);
            }
            left++;
        }
        result[index] = n - activeCount;
    }
    return result;
};