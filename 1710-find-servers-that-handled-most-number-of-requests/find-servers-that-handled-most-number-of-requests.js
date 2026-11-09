/**
 * @param {number} k
 * @param {number[]} arrival
 * @param {number[]} load
 * @return {number[]}
 */
var busiestServers = function (k, arrival, load) {
    const n = arrival.length;
    const handled = new Array(k).fill(0);

    // Segment Tree: tracks available servers
    class SegmentTree {
        constructor(size) {
            this.size = size;
            this.tree = new Array(size * 4).fill(0);
            this.build(1, 0, size - 1);
        }

        build(node, left, right) {
            if (left === right) {
                this.tree[node] = 1;
                return;
            }

            const mid = Math.floor((left + right) / 2);

            this.build(node * 2, left, mid);
            this.build(node * 2 + 1, mid + 1, right);

            this.tree[node] =
                this.tree[node * 2] + this.tree[node * 2 + 1];
        }

        update(node, left, right, index, value) {
            if (left === right) {
                this.tree[node] = value;
                return;
            }

            const mid = Math.floor((left + right) / 2);

            if (index <= mid) {
                this.update(node * 2, left, mid, index, value);
            } else {
                this.update(node * 2 + 1, mid + 1, right, index, value);
            }

            this.tree[node] =
                this.tree[node * 2] + this.tree[node * 2 + 1];
        }

        set(index, value) {
            this.update(1, 0, this.size - 1, index, value);
        }

        // Find first available server in [queryLeft, queryRight]
        findFirst(node, left, right, queryLeft, queryRight) {
            if (
                right < queryLeft ||
                left > queryRight ||
                this.tree[node] === 0
            ) {
                return -1;
            }

            if (left === right) {
                return left;
            }

            const mid = Math.floor((left + right) / 2);

            const result = this.findFirst(
                node * 2,
                left,
                mid,
                queryLeft,
                queryRight
            );

            if (result !== -1) {
                return result;
            }

            return this.findFirst(
                node * 2 + 1,
                mid + 1,
                right,
                queryLeft,
                queryRight
            );
        }

        find(left, right) {
            if (left > right) {
                return -1;
            }

            return this.findFirst(
                1,
                0,
                this.size - 1,
                left,
                right
            );
        }
    }

    // Min-Heap: busy servers ordered by finish time
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        size() {
            return this.heap.length;
        }

        peek() {
            return this.heap[0];
        }

        push(value) {
            this.heap.push(value);
            this.heapifyUp(this.heap.length - 1);
        }

        pop() {
            if (this.heap.length === 1) {
                return this.heap.pop();
            }

            const top = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.heapifyDown(0);

            return top;
        }

        heapifyUp(index) {
            while (index > 0) {
                const parent = Math.floor((index - 1) / 2);

                if (this.heap[parent][0] <= this.heap[index][0]) {
                    break;
                }

                [this.heap[parent], this.heap[index]] =
                    [this.heap[index], this.heap[parent]];

                index = parent;
            }
        }

        heapifyDown(index) {
            const length = this.heap.length;

            while (true) {
                let smallest = index;
                const left = index * 2 + 1;
                const right = index * 2 + 2;

                if (
                    left < length &&
                    this.heap[left][0] < this.heap[smallest][0]
                ) {
                    smallest = left;
                }

                if (
                    right < length &&
                    this.heap[right][0] < this.heap[smallest][0]
                ) {
                    smallest = right;
                }

                if (smallest === index) {
                    break;
                }

                [this.heap[index], this.heap[smallest]] =
                    [this.heap[smallest], this.heap[index]];

                index = smallest;
            }
        }
    }

    const available = new SegmentTree(k);
    const busy = new MinHeap();
    for (let i = 0; i < n; i++) {
        const currentTime = arrival[i];

        // Release servers whose tasks have completed
        while (
            busy.size() > 0 &&
            busy.peek()[0] <= currentTime
        ) {
            const [finishTime, serverId] = busy.pop();

            available.set(serverId, 1);
        }

        const preferredServer = i % k;

        // Search from preferred server to the end
        let serverId = available.find(preferredServer, k - 1);

        // Wrap around and search from server 0
        if (serverId === -1) {
            serverId = available.find(0, preferredServer - 1);
        }

        // All servers are busy, drop the request
        if (serverId === -1) {
            continue;
        }

        // Assign the request
        available.set(serverId, 0);
        handled[serverId]++;

        // Server becomes free after processing the request
        const finishTime = currentTime + load[i];
        busy.push([finishTime, serverId]);
    }

    // Find the maximum number of handled requests
    const maxHandled = Math.max(...handled);
    const result = [];
    for (let i = 0; i < k; i++) {
        if (handled[i] === maxHandled) {
            result.push(i);
        }
    }
    return result;
};