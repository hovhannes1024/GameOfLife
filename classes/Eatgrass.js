var Parent = require("./Parent");
var DiedAnimal = require("./DiedAnimal");
var Evaporation = require("./Land");

module.exports = class Eatgrass extends Parent{
    constructor(x, y) {
        super(x, y);
        this.energy = 3;
    }

    getDirections(t, t2) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t || matrix[y][x] == t2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var fundCords = this.getDirections(0, 7);
        var cord = super.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            let r = matrix[y][x];

            matrix[y][x] = 2;

            if(r == 0){
                matrix[this.y][this.x] = 0;
            }
            else if(r == 7){
                matrix[this.y][this.x] = 7;
            }

            this.x = x;
            this.y = y;

        }
    }

    eat() {
        var fundCords = this.getDirections(1);
        var cord = super.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            Evaporation(this.y, this.x);

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }

            if (this.multiply >= 5) {
                this.mul();
                this.multiply = 0;
            }


        }
        else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    mul() {
        var fundCords = this.getDirections(0);
        var cord = super.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            var newGrasseater = new Eatgrass(x, y);
            grasseaterArr.push(newGrasseater);

            matrix[y][x] = 2;
            this.multiply = 0;
        } 
    }

    die() {
        matrix[this.y][this.x] = 6;

        for (var i in grasseaterArr) {
            if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                grasseaterArr.splice(i, 1);
            }
        }
        var newDiedAnimal = new DiedAnimal(this.x, this.y);
        diedAnimalArr.push(newDiedAnimal);
    }
}