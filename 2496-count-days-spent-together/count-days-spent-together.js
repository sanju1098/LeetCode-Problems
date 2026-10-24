/**
 * @param {string} arriveAlice
 * @param {string} leaveAlice
 * @param {string} arriveBob
 * @param {string} leaveBob
 * @return {number}
 */
var countDaysTogether = function (arriveAlice, leaveAlice, arriveBob, leaveBob) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function toDay(date) {
        const [month, day] = date.split("-").map(Number);

        let totalDays = day;

        for (let i = 0; i < month - 1; i++) {
            totalDays += daysInMonth[i];
        }

        return totalDays;
    }

    const start = Math.max(toDay(arriveAlice), toDay(arriveBob));
    const end = Math.min(toDay(leaveAlice), toDay(leaveBob));

    return Math.max(0, end - start + 1);
};