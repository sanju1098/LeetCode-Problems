/**
 * @param {number} width
 * @param {number} height
 */
var Robot = function (width, height) {
    this.w = width;
    this.h = height;
    this.x = 0;
    this.y = 0;
    this.dir = 0; // 0=E,1=N,2=W,3=S

    this.cycle = 2 * (width + height - 2);
};

Robot.prototype.step = function (num) {
    if (this.cycle === 0) return;

    num = num % this.cycle;

    // special case
    if (num === 0) num = this.cycle;

    while (num > 0) {
        let dx = [1, 0, -1, 0][this.dir];
        let dy = [0, 1, 0, -1][this.dir];

        let nx = this.x + dx;
        let ny = this.y + dy;

        // boundary check
        if (nx < 0 || nx >= this.w || ny < 0 || ny >= this.h) {
            this.dir = (this.dir + 1) % 4; // turn left
        } else {
            this.x = nx;
            this.y = ny;
            num--;
        }
    }
};

Robot.prototype.getPos = function () {
    return [this.x, this.y];
};

Robot.prototype.getDir = function () {
    return ["East", "North", "West", "South"][this.dir];
};

/** 
 * Your Robot object will be instantiated and called as such:
 * var obj = new Robot(width, height)
 * obj.step(num)
 * var param_2 = obj.getPos()
 * var param_3 = obj.getDir()
 */