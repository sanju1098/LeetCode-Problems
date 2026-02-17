/**
 * @param {number} turnedOn
 * @return {string[]}
 */
var readBinaryWatch = function (turnedOn) {
    const result = [];

    const countBits = (num) => {
        let count = 0;
        while (num > 0) {
            num = num & (num - 1);
            count++;
        }
        return count;
    };

    for (let hour = 0; hour < 12; hour++) {
        for (let min = 0; min < 60; min++) {

            if (countBits(hour) + countBits(min) === turnedOn) {

                // minute must be 2 digits
                let minuteStr = min < 10 ? "0" + min : "" + min;

                result.push(`${hour}:${minuteStr}`);
            }
        }
    }

    return result;
};
