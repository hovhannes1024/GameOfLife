module.exports = function land(y1, x1){
    var dry = true;

    x1 = parseInt(x1);
    y1 = parseInt(y1);

    var directions = [
        [x1 - 5, y1 - 5],
        [x1 - 4, y1 - 5],
        [x1 - 3, y1 - 5], 
        [x1 - 2, y1 - 5], 
        [x1 - 1, y1 - 5], 
        [x1, y1 - 5],
        [x1 + 1, y1 - 5], 
        [x1 + 2, y1 - 5],
        [x1 + 3, y1 - 5],
        [x1 + 4, y1 - 5],
        [x1 + 5, y1 - 5],

        [x1 - 5, y1 - 4],
        [x1 - 4, y1 - 4],
        [x1 - 3, y1 - 4],
        [x1 - 2, y1 - 4],
        [x1 - 1, y1 - 4],
        [x1, y1 - 4],
        [x1 + 1, y1 - 4],
        [x1 + 2, y1 - 4],
        [x1 + 3, y1 - 4],
        [x1 + 4, y1 - 4],
        [x1 + 5, y1 - 4],

        [x1 - 5, y1 - 3],
        [x1 - 4, y1 - 3],
        [x1 - 3, y1 - 3], 
        [x1 - 2, y1 - 3], 
        [x1 - 1, y1 - 3], 
        [x1, y1 - 3], 
        [x1 + 1, y1 - 3], 
        [x1 + 2, y1 - 3], 
        [x1 + 3, y1 - 3],
        [x1 + 4, y1 - 3],
        [x1 + 5, y1 - 3],

        [x1 - 5, y1 - 2],
        [x1 - 4, y1 - 2],
        [x1 - 3, y1 - 2], 
        [x1 - 2, y1 - 2], 
        [x1 - 1, y1 - 2], 
        [x1, y1 - 2], 
        [x1 + 1, y1 - 2], 
        [x1 + 2, y1 - 2], 
        [x1 + 3, y1 - 2],
        [x1 + 4, y1 - 2],
        [x1 + 5, y1 - 2],

        [x1 - 5, y1 - 1],
        [x1 - 4, y1 - 1],
        [x1 - 3, y1 - 1], 
        [x1 - 2, y1 - 1], 
        [x1 - 1, y1 - 1], 
        [x1, y1 - 1], 
        [x1 + 1, y1 - 1], 
        [x1 + 2, y1 - 1], 
        [x1 + 3, y1 - 1],
        [x1 + 4, y1 - 1],
        [x1 + 5, y1 - 1],

        [x1 - 5, y1],
        [x1 - 4, y1],
        [x1 - 3, y1],     
        [x1 - 2, y1], 
        [x1 - 1, y1],
        [x1 + 1, y1],
        [x1 + 2, y1],
        [x1 + 3, y1],
        [x1 + 4, y1],
        [x1 + 5, y1],

        [x1 - 5, y1 + 1],
        [x1 - 4, y1 + 1],
        [x1 - 3, y1 + 1], 
        [x1 - 2, y1 + 1], 
        [x1 - 1, y1 + 1], 
        [x1, y1 + 1], 
        [x1 + 1, y1 + 1], 
        [x1 + 2, y1 + 1], 
        [x1 + 3, y1 + 1],
        [x1 + 4, y1 + 1],
        [x1 + 5, y1 + 1],

        [x1 - 5, y1 + 2],
        [x1 - 4, y1 + 2],
        [x1 - 3, y1 + 2], 
        [x1 - 2, y1 + 2], 
        [x1 - 1, y1 + 2], 
        [x1, y1 + 2], 
        [x1 + 1, y1 + 2], 
        [x1 + 2, y1 + 2], 
        [x1 + 3, y1 +2 ],
        [x1 + 4, y1 + 2],
        [x1 + 5, y1 + 2],

        [x1 - 5, y1 + 3],
        [x1 - 4, y1 + 3],
        [x1 - 3, y1 + 3], 
        [x1 - 2, y1 + 3], 
        [x1 - 1, y1 + 3], 
        [x1, y1 + 3], 
        [x1 + 1, y1 + 3], 
        [x1 + 2, y1 + 3], 
        [x1 + 3, y1 + 3],
        [x1 + 4, y1 + 3],
        [x1 + 5, y1 + 3],

        [x1 - 5, y1 + 4],
        [x1 - 4, y1 + 4],
        [x1 - 3, y1 + 4], 
        [x1 - 2, y1 + 4], 
        [x1 - 1, y1 + 4], 
        [x1, y1 + 4],
        [x1 + 1, y1 + 4], 
        [x1 + 2, y1 + 4],
        [x1 + 3, y1 + 4],
        [x1 + 4, y1 + 4],
        [x1 + 5, y1 + 4],
        
        [x1 - 5, y1 + 5],
        [x1 - 4, y1 + 5],
        [x1 - 3, y1 + 5], 
        [x1 - 2, y1 + 5], 
        [x1 - 1, y1 + 5], 
        [x1, y1 + 5],
        [x1 + 1, y1 + 5], 
        [x1 + 2, y1 + 5],
        [x1 + 3, y1 + 5],
        [x1 + 4, y1 + 5],
        [x1 + 5, y1 + 5]
    ];
    function getDirections() {
        var found = [];
        for (var i in directions) {
            var x = directions[i][0];
            var y = directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(directions[i]);
            }
        }
        return found;
    }

    if(season == 1){
        var fundCords = getDirections();

        for(let i in fundCords){
            var y2 = parseInt(fundCords[i][1]);
            var x2 = parseInt(fundCords[i][0]);
            if(matrix[y2][x2] == 4){
                dry = false;
            }
        }
        if(dry == true){
            matrix[y1][x1] = 7;
        }else{
            matrix[y1][x1] = 0;
        }
    }else{
        matrix[y1][x1] = 0;
    }
}