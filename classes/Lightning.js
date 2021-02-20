var Parent = require("./Parent");
module.exports = class Lightning extends Parent{
    getDirections() {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    destroy() {
        let cord = this.getDirections();
        for (let i in cord) {
            let x1 = cord[i][0];
            let y1 = cord[i][1];
            matrix[y1][x1] = 0;
            for (let j in waterArr) {
                if (x1 == waterArr[j].x && y1 == waterArr[j].y || this.x == waterArr[j].x && this.y == waterArr[j].y) {
                    waterArr.splice(j, 1);
                }
            }
            for (let j in predatorArr) {
                if (x1 == predatorArr[j].x && y1 == predatorArr[j].y || this.x == predatorArr[j].x && this.y == predatorArr[j].y) {
                    predatorArr.splice(j, 1);
                }
            }
            for (let j in grasseaterArr) {
                if (x1 == grasseaterArr[j].x && y1 == grasseaterArr[j].y || this.x == grasseaterArr[j].x && this.y == grasseaterArr[j].y) {
                    grasseaterArr.splice(j, 1);
                }
            }
            for (let j in grassArr) {
                if (x1 == grassArr[j].x && y1 == grassArr[j].y || this.x == grassArr[j].x && this.y == grassArr[j].y) {
                    grassArr.splice(j, 1);
                }
            }
        }
    }
    move() {
        if(this.multiply == 0){
            matrix[this.y][this.x] = 0;
        }

        this.multiply++;

        if(this.multiply >= 5) {
            let y = Math.floor(Math.random() * matrix.length);
            let x = Math.floor(Math.random() * matrix[y].length);
            matrix[y][x] = 5;
            this.x = x;
            this.y = y;
            this.destroy();
            this.multiply = 0;
        }
    }
}
