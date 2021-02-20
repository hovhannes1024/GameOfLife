const { request } = require("express");
var Parent = require("./Parent");
var Grass = require("./Grass");
module.exports = class Water extends Parent{
    constructor(x, y) {
        super(x, y);
    }
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 8) {

            var fundCords = this.getDirections(0);
            var cord = super.random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                var newGrass = new Grass(x, y);
                grassArr.push(newGrass);

                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}