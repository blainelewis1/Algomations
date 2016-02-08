/* jshint browser: true */
/* jshint -W097 */


"use strict";

function Graphics(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.frameItems = [];

    requestAnimationFrame(this.drawFrame.bind(this));
}

Graphics.prototype.addToFrame = function(f) {
    this.frameItems.push(f);
    return this.frameItems.length - 1;
};

Graphics.prototype.drawFrame = function(timestamp) {
    for(var i = 0; i < this.frameItems.length; i++){
        this.frameItems[i].bind(this)();
    }

    requestAnimationFrame(this.drawFrame.bind(this));
};

Graphics.prototype.drawPoints = function(points, x, y, width, height, scaleX, scaleY) {
    return function() {
        this.context.save();

        this.context.translate(width / 2, height / 2);

        points.forEach(function(point) {
            context.beginPath();
            context.arc(point.x * width / scaleX, point.y * height / scaleY, 1, 0, 2 * Math.PI + 1);
            context.fill();
        });

        this.context.restore();
    }.bind(this);
};
