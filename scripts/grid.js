var grid = [];

function GridGenerator(width, height, interval, canvas) {
    this.grid = [];

    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.interval = interval;

    this.graphics = new Graphics(canvas, 1, 1);

    for(var y = 0; y < height; y++) {
        var row = [];

        for(var x = 0; x < width; x++){
            row.push("#FFFFFF");
        }

        this.grid.push(row);
    }

    var gridFrame = new Frame(0, 0, 1, 1, "")
        .add(new GridGraphics.Grid(this.grid));
    this.graphics.addFrame(gridFrame);

    this.graphics.drawFrames();
}

GridGenerator.prototype.start = function() {
    if(this.x >= this.width && this.y >= this.height - 1) {
        return;
    }

    if(this.x == this.width) {
        this.x = 0;
        this.y++;
    }

    this.grid[this.y][this.x] = Math.random() > 0.5 ? "#444444": "#CCCCCC";

    this.x++;

    this.graphics.drawFrames();
    setTimeout(this.start.bind(this), this.interval);
};

$(function() {
    var canvas = document.querySelector("#grid canvas");
    var uniformRandomGenerator = new GridGenerator(20, 10, 10, canvas);
    uniformRandomGenerator.start();
});
