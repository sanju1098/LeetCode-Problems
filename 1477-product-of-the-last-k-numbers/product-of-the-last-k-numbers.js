var ProductOfNumbers = function () {
    this.prefix = [1];
};

/** 
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function (num) {
    if (num === 0) {
        this.prefix = [1];
    } else {
        const last = this.prefix[this.prefix.length - 1];
        this.prefix.push(last * num);
    }
};

/** 
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function (k) {
    const n = this.prefix.length;

    if (k >= n) {
        return 0;
    }

    return this.prefix[n - 1] / this.prefix[n - 1 - k];
};

/** 
 * Your ProductOfNumbers object will be instantiated and called as such:
 * var obj = new ProductOfNumbers()
 * obj.add(num)
 * var param_2 = obj.getProduct(k)
 */