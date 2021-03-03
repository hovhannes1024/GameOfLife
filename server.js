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
var waterCount = 30;
var grasseaterCount = 100;
var predatorCount = 120;
var lightningCount = 1;

lightningArr = [];
grassArr = [];
grasseaterArr = [];
predatorArr = [];
waterArr = [];
diedAnimalArr = [];

var speed = 1000;
season = 0;
day = 0;
var tact = 0;
var tact1 = 0;
var landArr = [];
var coordinates = [];

var Grass = require("./classes/Grass");
var Eatgrass = require("./classes/Eatgrass");
var Predator = require("./classes/Predator");
var Water = require("./classes/Water");
var Lightning = require("./classes/Lightning");
var Land = require("./classes/Land");
var Rain = require("./classes/Rain");

function random(arr){
    let a = Math.random() * arr;
    return a;
}

var data = [];
var statistics = {};

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
                    var grass = new Grass(n1, m1);
                    grassArr.push(grass);
                    grassCount--;
                }
            }
            else if(a == 2){
                if(grasseaterCount > 0 && matrix[m][n] == 0){
                    let m1 = Math.floor(random(matrix.length));
                    let n1 = Math.floor(random(matrix[m1].length));
                    matrix[m1][n1] = a;
                    var eatgrass = new Eatgrass(n1, m1);
                    grasseaterArr.push(eatgrass);
                    grasseaterCount--;
                }
            }
            else if(a == 3){
                if(predatorCount > 0 && matrix[m][n] == 0){
                    let m1 = Math.floor(random(matrix.length));
                    let n1 = Math.floor(random(matrix[m1].length));
                    matrix[m1][n1] = a;
                    var predator = new Predator(n1, m1);
                    predatorArr.push(predator);
                    predatorCount--;
                }
            }
            else if(a == 4){
                if(waterCount > 0 && matrix[m][n] == 0){
                    let m1 = Math.floor(random(matrix.length));
                    let n1 = Math.floor(random(matrix[m1].length));
                    matrix[m1][n1] = a;
                    var water = new Water(n1, m1);
                    waterArr.push(water);
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
    io.sockets.emit('send matrix', matrix);
}

function game() {
    if(day >= 30){
        day = 0;
        if(season >= 3){
            season = 0;
        }else{
            season++;
        }
    }else{
        day++;
    }
    //Summer
    if(season == 1){
        if(tact >= 3){
            let r = Math.floor(Math.random() * waterArr.length);
            let water = waterArr[r];
            if(water){
                matrix[water.y][water.x] = 7;
                waterArr.splice(r, 1);
                tact = 0;
            }
        }else{
            tact++;
        }
    }
    //Summer
    //Autumn
    if(season == 2){
        if(tact1 >= 5){
            for (let i in matrix) {        
                for (let j in matrix) {
                    if(matrix[i][j] == 0){
                        coordinates = [i, j];
                        landArr.push(coordinates);
                    }
                }
            }
            if(landArr){
                Rain(landArr);
            }
            tact1 = 0;
        }else{
            tact1++;
        }
    }
    //Autumn
    for(let i in diedAnimalArr) {
        diedAnimalArr[i].die();
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
    
    for (let i in matrix) {
        for (let j in matrix) {
            if(matrix[i][j] == 0 || matrix[i][j] == 7){
                Land(i, j);
            }
        }
    }
    statistics.Grass = grassArr.length;
    statistics.Grasseater = grasseaterArr.length;
    statistics.Predator = predatorArr.length;
    statistics.Lightning = lightningArr.length;
    statistics.Water = waterArr.length;
    statistics.Diedanimal = diedAnimalArr.length;
    data[0] = matrix;
    data[1] = statistics;
    data[2] = season;
    data[3] = speed;

    fs.writeFile("Statistics.json", JSON.stringify(statistics), function(){});

    io.sockets.emit('send data', data);
}

function toSpring(){
    season = 0;
    day = 0;
}

function toSummer(){
    season = 1;
    day = 0;
}

function toAutumn(){
    season = 2;
    day = 0;
}

function toWinter(){
    season = 3;
    day = 0;
}

function up100(){
    clearInterval(interval);
    speed += 100;
    interval = setInterval(game, speed);
}

function down100(){
    clearInterval(interval);
    if(speed >= 200){
        speed -= 100;
    }
    interval = setInterval(game, speed);
}

var interval = setInterval(game, speed);

io.on('connection', function(socket){
    createObject(matrix);
    socket.on("toSpring", toSpring);
    socket.on("toSummer", toSummer);
    socket.on("toAutumn", toAutumn);
    socket.on("toWinter", toWinter);
    socket.on("+100", up100);
    socket.on("-100", down100);
});
