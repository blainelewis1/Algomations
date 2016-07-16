WALL = 1;
GROUND = 0;

var GridGraphics = {
    Grid : function(grid) {
        this.draw = function(width, height, context) {
            var blockHeight = Math.floor(height / grid.length);
            var blockWidth = Math.floor(width / grid[0].length);

            //TODO: rounded rects

            for(var y = 0; y < grid.length; y++) {
                for(var x = 0; x < grid[y].length; x++) {
                    context.fillStyle = grid[y][x] === WALL ? "#444444" : "#CCCCCC";
                    context.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
                    //TOP, RIGHT, BOT, LEFT
                    //TOPLEFT, TOPRIGHT, BOTRIGHT, BOTRIGHT

                    var squareCorner = [false, false, false, false];

                    if(y !== 0 && grid[y - 1][x] === WALL) {
                        //TOPLEFT, TOPRIGHT aren't rounded
                        squareCorner[0] = true;
                        squareCorner[1] = true;
                    }

                    if(x !== grid[y].length - 1 && grid[y][x + 1] === WALL) {
                        squareCorner[1] = true;
                        squareCorner[2] = true;
                    }

                    if(y !== grid.length - 1 && grid[y + 1][x] === WALL) {
                        squareCorner[2] = true;
                        squareCorner[3] = true;
                    }

                    if(x !== 0 && grid[y][x - 1] === WALL) {
                        squareCorner[3] = true;
                        squareCorner[4] = true;
                    }

                    //Create an array of all the points. then if it's rounded we skip one, otherwise we don't/


                    points = [[0,0], ];
                }
            }

            context.fill();
        };
    }
};
