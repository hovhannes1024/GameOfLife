var socket = io();

var side = 10;
var stats = {};

function setup(){
    noStroke();
    createCanvas(600,600);
    background("#acacac");
}

function update(data) {
    stats = data[1];

    document.getElementById("grassCount").innerText = stats.Grass;
    document.getElementById("eatGrassCount").innerText = stats.Grasseater;
    document.getElementById("predatorCount").innerText = stats.Predator;
    document.getElementById("waterCount").innerText = stats.Water;
    document.getElementById("diedAnimalCount").innerText = stats.Diedanimal;
    document.getElementById("lightningCount").innerText = stats.Lightning;
    
    document.getElementById("speed").innerText = data[3];

    if(data[2] == 0){
        document.getElementById("season").innerText = "Spring";
    }else if(data[2] == 1){
        document.getElementById("season").innerText = "Summer";
    }else if(data[2] == 2){
        document.getElementById("season").innerText = "Autumn";
    }else if(data[2] == 3){
        document.getElementById("season").innerText = "Winter";
    }

    for (var i = 0; i < data[0].length; i++) {
        for (var j = 0; j < data[0][i].length; j++) {
            if (data[0][i][j] == 1) {
                fill("green");
            }
            else if (data[0][i][j] == 2) {
                fill("yellow");
            }
            else if (data[0][i][j] == 0) {
                fill('#674300');
            }
            else if (data[0][i][j] == 3) {
                fill('red');
            }
            else if (data[0][i][j] == 4) {
                fill('blue');
            }
            else if (data[0][i][j] == 5) {
                fill('#0095ff');
            }
            else if (data[0][i][j] == 6) {
                fill('#5a075a');
            }
            else if (data[0][i][j] == 7) {
                fill('#9b6500');
            }
            else if (data[0][i][j] == 8) {
                fill('#lightblue');
            }
            rect(j * side, i * side, side, side);
        }
    }
}

socket.on('send data', update);

function toSpring(){
    socket.emit("toSpring");
}

function toSummer(){
    socket.emit("toSummer");
}

function toAutumn(){
    socket.emit("toAutumn");
}

function toWinter(){
    socket.emit("toWinter");
}

function up100(){
    socket.emit("+100");
}

function down100(){
    socket.emit("-100");
}

