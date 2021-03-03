var Water = require("./Water");
module.exports = function rain(Arr){
    let r = Math.floor(Math.random() * Arr.length);
    var y = parseInt(Arr[r][0]);
    var x = parseInt(Arr[r][1]);
    var water = new Water(x, y);
    waterArr.push(water);
    matrix[y][x] = 4;
}