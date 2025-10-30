/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    const pattern = /^[+-]?((\d+\.\d*)|(\.\d+)|(\d+))([eE][+-]?\d+)?$/;
    return pattern.test(s.trim());
};