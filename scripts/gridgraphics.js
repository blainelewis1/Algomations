var GridGraphics = {
    Grid : function(grid) {
        this.draw = function(width, height, context) {
            var blockHeight = Math.floor(height / grid.length);
            var blockWidth = Math.floor(width / grid[0].length);

            //TODO: rounded rects

            for(var y = 0; y < grid.length; y++) {
                for(var x = 0; x < grid[y].length; x++) {
                    context.fillStyle = grid[y][x];
                    context.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
                }
            }

            context.fill();
        };
    }
};
