var Parent = require("./Parent");
var DiedAnimal = require("./DiedAnimal");
var Evaporation = require("./Land");

module.exports = class Predator extends Parent{
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
    }

    getDirections(t1,t2,t3) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t1 || matrix[y][x] == t2 || matrix[y][x] == t3) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var fundCords = this.getDirections(0, 1, 7);
        var cord = super.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            
            let r = matrix[y][x];

            matrix[y][x] = 3;
            
            if(r == 1){
                matrix[this.y][this.x] = 1;
            }
            else if(r == 0){
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
        var fundCords = this.getDirections(2, 6);
        var cord = super.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            Evaporation(this.y, this.x);

            this.x = x;
            this.y = y;

            if(matrix[y][x] == 2){
                for (var i in grasseaterArr) {
                    if (x == grasseaterArr[i].x && y == grasseaterArr[i].y) {
                        grasseaterArr.splice(i, 1);
                        
                        this.multiply+=3;

                        this.energy+=3;
                    }
                }
            }else if(matrix[y][x] == 6){
                for (var i in diedAnimalArr) {
                    if (x == diedAnimalArr[i].x && y == diedAnimalArr[i].y) {
                        diedAnimalArr.splice(i, 1);
                        
                        this.multiply++;

                        this.energy++;
                    }
                }
            }

            if (this.multiply >= 6) {
                this.mul()
                this.multiply = 0;
            }

        }
        else {
            this.move();
            this.energy--;
            if (this.energy <= 0){
                this.die();
            }
        }
    }

    mul() {
        var fundCords = this.getDirections(1,2);
        var cord = super.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            var newPredator = new Predator(x, y);
            predatorArr.push(newPredator);

            matrix[y][x] = 3;
            this.multiply = 0;
        } 
    }

    die() {
        matrix[this.y][this.x] = 6;

        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
        var newDiedAnimal = new DiedAnimal(this.x, this.y);
        diedAnimalArr.push(newDiedAnimal);
    }
}