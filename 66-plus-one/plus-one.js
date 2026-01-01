/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    // Traverse from last digit to first
    for (let i = digits.length - 1; i >= 0; i--) {

        if (digits[i] < 9) { // if last digit is not 9 then lastDigit => (i + 1)
            digits[i] += 1;
            return digits;
        }
        // else if digit is 9 → becomes 0,
        digits[i] = 0;
        //  carry (1) continues
        // and loop runs again with last second digit 
        // that gets added by 1 ((i-1)+1)
    }

    // If  all digits are 9 => [9] → [1,0], [9,9] → [1,0,0]
    digits.unshift(1);
    return digits;
};