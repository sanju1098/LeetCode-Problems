/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
var assignTasks = function(servers, tasks) {
    const n = servers.length;
    const m = tasks.length;

    const ans = new Array(m);

    class MinHeap {
        constructor(compare) {
            this.heap = [];
            this.compare = compare;
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

                if (this.compare(this.heap[index], this.heap[parent]) >= 0) {
                    break;
                }

                [this.heap[index], this.heap[parent]] =
                    [this.heap[parent], this.heap[index]];

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
                    this.compare(this.heap[left], this.heap[smallest]) < 0
                ) {
                    smallest = left;
                }

                if (
                    right < length &&
                    this.compare(this.heap[right], this.heap[smallest]) < 0
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

    // Available servers: weight, then index
    const available = new MinHeap((a, b) =>
        a.weight - b.weight || a.index - b.index
    );

    // Busy servers: freeTime, then weight, then index
    const busy = new MinHeap((a, b) =>
        a.freeTime - b.freeTime ||
        a.weight - b.weight ||
        a.index - b.index
    );

    // Initially, all servers are free
    for (let i = 0; i < n; i++) {
        available.push({
            weight: servers[i],
            index: i
        });
    }

    let currentTime = 0;

    for (let j = 0; j < m; j++) {
        // Time must never move backwards
        currentTime = Math.max(currentTime, j);

        // Release all servers that are free by currentTime
        while (
            busy.size() > 0 &&
            busy.peek().freeTime <= currentTime
        ) {
            const server = busy.pop();
            available.push(server);
        }

        // If no server is available, jump to the earliest free time
        if (available.size() === 0) {
            currentTime = busy.peek().freeTime;

            // Release all servers becoming free at this time
            while (
                busy.size() > 0 &&
                busy.peek().freeTime <= currentTime
            ) {
                const server = busy.pop();
                available.push(server);
            }
        }

        // Select the server with minimum weight and index
        const server = available.pop();

        ans[j] = server.index;

        // Assign the task and update server's free time
        busy.push({
            freeTime: currentTime + tasks[j],
            weight: server.weight,
            index: server.index
        });
    }

    return ans;
};