var socket = io();

var side = 10;

function setup(){
    noStroke();
    createCanvas(600,600);
    background("#acacac");
}

function update(matrix) {
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 0) {
                fill('#674300');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 3) {
                fill('red');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill('blue');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill('lightblue');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 6) {
                fill('lightgreen');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 7) {
                fill('orange');
                rect(j * side, i * side, side, side);
            }
        }
    }
}

setInterval(
    function (){
        socket.on('send matrix', update)
    },1000
);
