/* jshint browser: true */
/* jshint -W097 */
/* global $ */
/* global Graphics */
/* global Style */
/* global Frame */
/* global SortedArray */
/* global MathGraphics */

"use strict";

function PointGenerator(f, maxPoints, pointsAtATime, canvas) {
    this.generate = f;
    this.maxPoints = maxPoints;
    this.pointsAtATime = pointsAtATime;
    this.points = [];
    this.pointsXSort = new SortedArray("x");
    this.pointsYSort = new SortedArray("y");
    this.pointsDistSort = new SortedArray("dist");

    this.graphics = new Graphics(canvas, 2, 2);

    var pointsFrame = new Frame(0, 0, 1, 2, "Points", new Style({fillStyle : "rgba(150,0,0,.50)"}))
        .add(new MathGraphics.Points(this.points, f.min, f.max))
        .add(new MathGraphics.CenteredUnitOval(f.min, f.max, 2))
        .add(new MathGraphics.CenteredUnitOval(f.min, f.max, 1));

    var xDistributionFrame = new Frame(1,0,1,1, "X Distribution")
        .add(new MathGraphics.Distribution(this.pointsXSort, f.min, f.max, MathGraphics.barGraph));

    var distDistributionFrame = new Frame(1,1,1,1, "Distance from center")
        .add(new MathGraphics.Distribution(this.pointsDistSort, f.min, f.max, MathGraphics.lineGraph));

    this.graphics.addFrame(pointsFrame);
    this.graphics.addFrame(xDistributionFrame);
    this.graphics.addFrame(distDistributionFrame);
}

PointGenerator.prototype.start = function() {
    if(this.points.length > this.maxPoints) {
        return;
    }

    for(var i = 0; i < this.pointsAtATime; i++) {
        var point = this.generate();
        point.dist = Math.sqrt(point.x * point.x + point.y * point.y);
        this.points.push(point);

        this.pointsYSort.add(point);
        this.pointsXSort.add(point);
        this.pointsDistSort.add(point);
    }

    this.graphics.drawFrames();

    setTimeout(this.start.bind(this), this.interval);
};

function boxMullerNormal() {
    var U = Math.random();
    var V = Math.random();

    var X = Math.sqrt(-2 * Math.log(U)) * Math.cos(2 * Math.PI * V);
    var Y = Math.sqrt(-2 * Math.log(U)) * Math.sin(2 * Math.PI * V);

    return {x : X, y : Y};
}

function uniform() {
    return {x : Math.random(), y : Math.random()};
}

$(function() {
    var randomNormalCanvas = document.querySelector("#random-normal canvas");

    boxMullerNormal.min = -4;
    boxMullerNormal.max = 4;
    var normalGenerator = new PointGenerator(boxMullerNormal, 10000, 1, randomNormalCanvas);
    normalGenerator.start();

    var randomUniformCanvas = document.querySelector("#random-uniform canvas");

    uniform.min = 0;
    uniform.max = 1;
    var uniformGenerator = new PointGenerator(uniform, 10000, 1, randomUniformCanvas);

    uniformGenerator.start();
});
