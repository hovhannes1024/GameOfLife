var Parent = require("./Parent");
var Grass = require("./Grass");
module.exports = class DiedAnimal extends Parent{
    die(){
        if(this.multiply >= 5){
            for (var i in diedAnimalArr) {
                if (this.x == diedAnimalArr[i].x && this.y == diedAnimalArr[i].y) {
                    diedAnimalArr.splice(i, 1);
                }
            }
            matrix[this.y][this.x] = 1;
            var newGrass = new Grass(this.x, this.y);
            grassArr.push(newGrass);
        }else{
            this.multiply++;
        }
    }
}