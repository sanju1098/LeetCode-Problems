/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumPairRemoval = function (nums) {
    const n = nums.length;
    if (n <= 1) return 0;

    const val = nums.slice();
    const ver = new Uint32Array(n);
    const prev = new Int32Array(n);
    const next = new Int32Array(n);

    const DEAD = -2;

    for (let i = 0; i < n; i++) {
        prev[i] = i - 1;
        next[i] = i + 1 < n ? i + 1 : -1;
    }

    const heap = new TypedMinHeap(Math.max(16, n * 2));
    let removals = 0;

    const pushPair = (i, j) => {
        if (i < 0 || j < 0) return;
        if (next[i] === DEAD || next[j] === DEAD) return;
        heap.push(val[i] + val[j], i, j, ver[i], ver[j]);
    };

    let invCount = 0;
    for (let i = 0; i < n - 1; i++) {
        if (val[i] > val[i + 1]) invCount++;
        pushPair(i, i + 1);
    }

    while (heap.len && invCount > 0) {
        const top = heap.pop(); // returns reusable array [sum,i,j,vL,vR]

        const sum = top[0];
        const left = top[1] | 0;
        const right = top[2] | 0;
        const vL = top[3] | 0;
        const vR = top[4] | 0;

        if (next[left] === DEAD || next[right] === DEAD) continue;
        if (next[left] !== right) continue;
        if (ver[left] !== vL || ver[right] !== vR) continue;
        if (val[left] + val[right] !== sum) continue;

        const a = prev[left];
        const b = left;
        const c = right;
        const d = next[right];

        // we remove inversion contributions
        if (a !== -1) {
            const r = next[a];
            if (r >= 0 && val[a] > val[r]) invCount--;
        }
        {
            const r = next[b];
            if (r >= 0 && val[b] > val[r]) invCount--;
        }
        {
            const r = next[c];
            if (r >= 0 && val[c] > val[r]) invCount--;
        }

        val[left] += val[right];
        ver[left]++;
        removals++;

        next[right] = DEAD;

        next[left] = d;
        if (d !== -1) prev[d] = left;

        // we re-add inversion contributions
        if (a !== -1) {
            const r = next[a];
            if (r >= 0 && val[a] > val[r]) invCount++;
        }
        {
            const r = next[b];
            if (r >= 0 && val[b] > val[r]) invCount++;
        }

        if (a !== -1) pushPair(a, left);
        if (d !== -1) pushPair(left, d);
    }

    return removals;
}


class TypedMinHeap {
    constructor(cap) {
        this.nodeSize = 5;
        this.len = 0;
        this.cap = cap;
        this.buf = new Float64Array(cap * 5);
        this.tmp = new Float64Array(5);
    }

    push(sum, i, j, vL, vR) {
        if (this.len >= this.cap) this._grow();

        let idx = this.len++;
        let base = idx * 5;
        const b = this.buf;

        b[base] = sum;
        b[base + 1] = i;
        b[base + 2] = j;
        b[base + 3] = vL;
        b[base + 4] = vR;

        // bubble up
        while (idx > 0) {
            const p = (idx - 1) >> 1;
            const pb = p * 5;
            const sb = idx * 5;

            const sumA = b[sb], sumB = b[pb];
            if (sumA > sumB || (sumA === sumB && b[sb + 1] >= b[pb + 1])) break;

            // swap
            for (let k = 0; k < 5; k++) {
                const t = b[sb + k];
                b[sb + k] = b[pb + k];
                b[pb + k] = t;
            }

            idx = p;
        }
    }

    pop() {
        if (this.len === 0) return null;

        const out = this.tmp;
        const b = this.buf;

        // read root
        out[0] = b[0];
        out[1] = b[1];
        out[2] = b[2];
        out[3] = b[3];
        out[4] = b[4];

        const lastIdx = --this.len;
        if (lastIdx === 0) return out;

        // move last to root
        const lb = lastIdx * 5;
        b[0] = b[lb];
        b[1] = b[lb + 1];
        b[2] = b[lb + 2];
        b[3] = b[lb + 3];
        b[4] = b[lb + 4];

        // sift down
        let idx = 0;
        const len = this.len;

        while (true) {
            const l = idx * 2 + 1;
            if (l >= len) break;

            const r = l + 1;
            let s = l;

            const sb = s * 5;
            const ib = idx * 5;

            if (r < len) {
                const rb = r * 5;
                const sumL = b[sb], sumR = b[rb], sumI = b[ib];
                const betterR =
                    sumR < sumL || (sumR === sumL && b[rb + 1] < b[sb + 1]);
                if (betterR) s = r;
            }

            const sb2 = s * 5;
            const sumS = b[sb2], sumI2 = b[ib];
            if (sumS > sumI2 || (sumS === sumI2 && b[sb2 + 1] >= b[ib + 1])) break;

            // swap idx and s
            for (let k = 0; k < 5; k++) {
                const t = b[ib + k];
                b[ib + k] = b[sb2 + k];
                b[sb2 + k] = t;
            }

            idx = s;
        }

        return out;
    }

    _grow() {
        const old = this.buf;
        this.cap *= 2;
        this.buf = new Float64Array(this.cap * 5);
        this.buf.set(old);
    }
};