var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function(req, res){
    res.redirect('index.html');
});
server.listen(3000);

var height_ = 60;
var width_ = 60;
var grassCount = 1000;
var waterCount = 20;
var grasseaterCount = 100;
var predatorCount = 120;
var lightningCount = 1;

lightningArr = [];
grassArr = [];
grasseaterArr = [];
predatorArr = [];
waterArr = [];
diedAnimalArr = [];

season = 0;
day = 0;
var tact = 0;

var Grass = require("./classes/Grass");
var Eatgrass = require("./classes/Eatgrass");
var Predator = require("./classes/Predator");
var Water = require("./classes/Water");
var Lightning = require("./classes/Lightning");
var Land = require("./classes/Land");

function random(arr){
    let a = Math.random() * arr;
    return a;
}

matrix = [];
for (var i = 0; i < height_; i++) {
    matrix.push([]);
    for (var j = 0; j < width_; j++) {
        matrix[i].push(0);
    }
}
io.sockets.emit('send matrix', matrix);

function createObject(matrix) {
    for(let m = 0; m < height_; m++){
        for(let n = 0; n < width_; n++){
            let a = Math.floor(random(6));
            if(a == 1){
                if(grassCount > 0 && matrix[m][n] == 0){
                    let m1 = Math.floor(random(matrix.length));
                    let n1 = Math.floor(random(matrix[m1].length));
                    matrix[m1][n1] = a;
                    grassCount--;
                }
            }
            else if(a == 2){
                if(grasseaterCount > 0 && matrix[m][n] == 0){
                    let m1 = Math.floor(random(matrix.length));
                    let n1 = Math.floor(random(matrix[m1].length));
                    matrix[m1][n1] = a;
                    grasseaterCount--;
                }
            }
            else if(a == 3){
                if(predatorCount > 0 && matrix[m][n] == 0){
                    let m1 = Math.floor(random(matrix.length));
                    let n1 = Math.floor(random(matrix[m1].length));
                    matrix[m1][n1] = a;
                    predatorCount--;
                }
            }
            else if(a == 4){
                if(waterCount > 0 && matrix[m][n] == 0){
                    let m1 = Math.floor(random(matrix.length));
                    let n1 = Math.floor(random(matrix[m1].length));
                    matrix[m1][n1] = a;
                    waterCount--;
                }
            }
            else if(a == 5){
                if(lightningCount > 0){
                    lightningCount--;
                    let m1 = Math.floor(random(matrix.length));
                    let n1 = Math.floor(random(matrix[m1].length));
                    var lightning = new Lightning(m1, n1);
                    lightningArr.push(lightning);
                }
            }
        }
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                grasseaterArr.push(eatgrass);
            }
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var water = new Water(x, y);
                waterArr.push(water);
            }
        }
    }
    io.sockets.emit('send matrix', matrix);
}
function game() {
    if(day >= 30){
        day = 0;
        if(season >= 3){
            season = 0
        }else{
            season++;
        }
    }else{
        day++;
    }

    for(let i in grassArr) {
        grassArr[i].mul();
    }

    for(let i in grasseaterArr) {
        grasseaterArr[i].eat();
    }

    for(let i in predatorArr) {
        predatorArr[i].eat();
    }

    for(let i in waterArr) {
        waterArr[i].mul();
    }

    for(let i in lightningArr) {
        lightningArr[i].move();
    }

    for(let i in diedAnimalArr) {
        diedAnimalArr[i].die();
    }

    for (let i in matrix) {        
        for (let j in matrix) {
            if(matrix[i][j] == 0 || matrix[i][j] == 7){
                Land(i, j);
            }
        }
    }
    //jri golorshacum
    if(season == 1){
        if(tact >= 3){
            let r = Math.floor(Math.random() * waterArr.length);
            let water = waterArr[r];
            matrix[water.y][water.x] = 7;
            waterArr.splice(r, 1);
            tact = 0;
        }else{
            tact++;
        }
    }
    //jri golorshacum
    io.sockets.emit('send matrix', matrix);
}

setInterval(game, 1000);

io.on('connection', function(socket){
    createObject(matrix);
});
