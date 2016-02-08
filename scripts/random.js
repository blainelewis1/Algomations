var ANIMATION_SPEED = 100;

var points = [];
var pointsXSort = new SortedArray("x");
var pointsYSort = new SortedArray("y");

var canvas;
var context;

canvas = document.querySelector("#random canvas");
context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var smaller = Math.min(window.innerWidth, window.innerHeight);

pointAreaWidth = smaller;
pointAreaHeight = smaller;

var SCALE = 5;

setInterval(generatePoint, ANIMATION_SPEED, boxMullerNormal);

function generatePoint(randomPoint) {
    var point = randomPoint();
    points.push(point);

    pointsYSort.add(point);
    pointsXSort.add(point);

    draw();
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawStandardDev(1, 4);
    drawStandardDev(2, 2);
    drawPoints();

    drawDistribution(pointsXSort, pointAreaWidth, canvas.height/2, canvas.width - pointAreaWidth, canvas.height / 2);
    drawDistribution(pointsYSort, pointAreaWidth, canvas.height, canvas.width - pointAreaWidth, canvas.height / 2);
}

function drawStandardDev(devs, lineWidth) {
    context.lineWidth = lineWidth;
    context.strokeStyle = "#888888";
    context.beginPath();
    context.ellipse(pointAreaWidth / 2, pointAreaHeight / 2, devs * pointAreaWidth / SCALE, devs * pointAreaHeight / SCALE, 0, 0, 2 * Math.PI);
    context.stroke();
}

function drawPoints() {
    context.save();

    context.translate(pointAreaWidth/2, pointAreaHeight/2);

    points.forEach(function(point) {
        context.beginPath();
        context.arc(point.x * pointAreaWidth / SCALE, point.y * pointAreaHeight / SCALE, 1, 0, 2 * Math.PI + 1);
        context.fill();
    });

    context.restore();
}

function drawDistribution(sortedArr, x, y, width, height) {
    context.save();
    context.translate(x, y);

    context.lineStyle = "#DDDDDD";

    var prev = -5;

    context.lineCap = "round";
    context.lineJoin = "round";

    context.moveTo(0, 0);

    var increment = 0.25;

    var max = 5;
    var min = -5;

    for(var i = min; i <= max; i += increment) {
        var amount = sortedArr.getRangeCount(prev, i); // / sortedArr.objects.length;
        var xPos = (i + max) / (Math.abs(min) + max) * width;

        var yPos = -amount / sortedArr.objects.length * height * 5;

        context.lineTo(xPos, yPos);
        prev = i;
    }

    context.stroke();
    context.restore();
}

function boxMullerNormal() {
    var U = Math.random();
    var V = Math.random();

    var X = Math.sqrt(-2 * Math.log(U)) * Math.cos(2 * Math.PI * V);
    var Y = Math.sqrt(-2 * Math.log(U)) * Math.sin(2 * Math.PI * V);

    return {x : X, y : Y};
}

function SortedArray(prop) {
    this.objects = [];
    this.prop = prop;
}

SortedArray.prototype.add = function(o) {
	var i = this.objects.length;

	while(i > 0 &&  o[this.prop] < this.objects[i - 1][this.prop]) {
		i--;
	}

	this.objects.splice(i, 0, o);
};

SortedArray.prototype.closestIndexOf = function(val) {
    var left = 0;
    var right = this.objects.length - 1;
    var mid = 0;

    while(left < right) {
        mid = Math.floor((right + left) / 2);

        if(this.objects[mid][this.prop] < val) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return mid;
};

SortedArray.prototype.getRangeCount = function(start, end) {
    return this.closestIndexOf(end) - this.closestIndexOf(start) + 1;
};

while(points.length < 100) {
    generatePoint(boxMullerNormal);
}
