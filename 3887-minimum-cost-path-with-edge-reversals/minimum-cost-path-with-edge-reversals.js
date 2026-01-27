/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var minCost = function(n, edges) {
    
    const graph = Array.from({ length: n }, () => []);
    for (let i = 0; i < edges.length; ++i) {
        const [u, v, w] = edges[i];
        graph[u].push([v, w]);
        graph[v].push([u, 2 * w]);
    }

    const dist = new Array(n).fill(Infinity);
    dist[0] = 0;

    // Small, fast binary min-heap storing [cost, node]
    class MinHeap {
        constructor() { 
            this.a = []; 
        }
        isEmpty() { 
            return this.a.length === 0; 
        }
        push(pair) {
            const a = this.a;
            a.push(pair);
            let i = a.length - 1;
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (a[p][0] <= a[i][0]) break;
                const tmp = a[p]; 
                a[p] = a[i]; 
                a[i] = tmp;
                i = p;
            }
        }
        pop() {
            const a = this.a;
            if (a.length === 0) return null;
            const top = a[0];
            const last = a.pop();
            if (a.length === 0) return top;
            a[0] = last;
            let i = 0, n = a.length;
            while (true) {
                let smallest = i;
                const l = (i << 1) + 1;
                const r = l + 1;
                if (l < n && a[l][0] < a[smallest][0]) smallest = l;
                if (r < n && a[r][0] < a[smallest][0]) smallest = r;
                if (smallest === i) break;
                const tmp = a[i]; 
                a[i] = a[smallest]; 
                a[smallest] = tmp;
                i = smallest;
            }
            return top;
        }
    }

    const heap = new MinHeap();
    heap.push([0, 0]); // [cost, node]

    while (!heap.isEmpty()) {
        const top = heap.pop();
        const cost = top[0];
        const node = top[1];

        // we skip if this cost is not current best
        if (cost !== dist[node]) continue;

        if (node === n - 1) return cost;

        const neigh = graph[node];
        for (let i = 0, m = neigh.length; i < m; ++i) {
            const nei = neigh[i][0];
            const w = neigh[i][1];
            const nc = cost + w;
            if (nc < dist[nei]) {
                dist[nei] = nc;
                heap.push([nc, nei]);
            }
        }
    }

    return -1;
};