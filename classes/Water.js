var Parent = require("./Parent");
var Grass = require("./Grass");
module.exports = class Water extends Parent{
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var xx = this.directions[i][0];
            var yy = this.directions[i][1];
            if (xx >= 0 && xx < matrix[0].length && yy >= 0 && yy < matrix.length) {
                if (matrix[yy][xx] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    
    mul() {
        this.multiply++;
        if (this.multiply >= 4) {

            var fundCords = this.getDirections(0);
            var cord = super.random(fundCords);
            if (cord) {
                var xx = cord[0];
                var yy = cord[1];

                var newGrass = new Grass(xx, yy);
                grassArr.push(newGrass);

                matrix[yy][xx] = 1;
                this.multiply = 0;
            }
        }
    }
}