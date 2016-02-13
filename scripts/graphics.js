/* jshint browser: true */
/* jshint -W097 */

/* global $ */

"use strict";

//TODO: add titles to the cells?
//TODO: stop cells from intersecting with each other?
function Graphics(canvas, columns, rows) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.columns = columns;
    this.rows = rows;

    $(window).resize(this.resize.bind(this));
    this.resize();

    this.defaultStyle = new Style({"lineCap" : "round", "lineJoin" : "round"});

    this.frameItems = [];

    requestAnimationFrame(this.drawFrameItems.bind(this));
}

Graphics.prototype.resize = function() {
    this.cellWidth = this.canvas.width / this.columns;
    this.cellHeight = this.canvas.height / this.rows;
};

Graphics.prototype.addToFrame = function(x, y, columns, rows, label, f, style) {
    this.frameItems.push(new GridItem(x, y, columns, rows, label, f, style));
    return this.frameItems.length - 1;
};

Graphics.prototype.removeFromFrame = function(index) {
    this.frameItems.splice(index, 0, 1);
};

Graphics.prototype.drawFrameItems = function(timestamp) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for(var i = 0; i < this.frameItems.length; i++){
        this.drawFrameItem(this.frameItems[i]);
    }

    requestAnimationFrame(this.drawFrameItems.bind(this));
};

Graphics.prototype.drawFrameItem = function(frameItem) {
    this.context.save();
    this.context.translate(frameItem.x * this.cellWidth, frameItem.y * this.cellHeight);

    this.context.strokeRect(0, 0, this.cellWidth * frameItem.columns, this.cellHeight * frameItem.rows);
    this.context.font = "20px Helvetica";
    this.context.fillText(frameItem.label, 5, 20);

    var style = frameItem.style || this.defaultStyle;

    style.applyStyle(this.context);
    frameItem.draw.bind(this)(this.cellWidth * frameItem.columns, this.cellHeight * frameItem.rows);

    this.context.restore();
};

Graphics.prototype.drawPoints = function(points, min, max) {
    return function(width, height) {
        //calculate the scale
        var scaleX = width / (max - min);
        var scaleY = height / (max - min);

        //Translate min to the top left.
        this.context.translate(Math.abs(min) * scaleX, Math.abs(min) * scaleY);

        points.forEach(function(point) {
            this.context.beginPath();
            this.context.arc(point.x * scaleX, point.y * scaleY, 2, 0, 2 * Math.PI + 1);
            this.context.fill();
        }.bind(this));
    };
};

Graphics.prototype.drawCenteredUnitOval = function(max, min, devs) {
    return function(width, height) {
        var scaleX = width / (max - min);
        var scaleY = height / (max - min);

        var ellipseWidth = scaleX * devs / ((max - min) / 2);
        var ellipseHeight = scaleY * devs / ((max - min) / 2);


        this.context.beginPath();
        this.context.ellipse(width / 2, height / 2, ellipseWidth, ellipseHeight, 0, 0, 2 * Math.PI);
        this.context.stroke();
    };
};

Graphics.prototype.drawDistribution = function(sortedArr, min, max, increment) {
    return function(width, height) {
        this.context.translate(0, height);

        var prev = min;
        for(var i = min; i <= max; i += increment) {
            var amount = sortedArr.getRangeCount(prev, i);
            var x = (i + max) / (Math.abs(min) + max) * width;

            var y = -amount / sortedArr.objects.length * height * 5;

            if(prev === min) {
                this.context.moveTo(x, y);
            }

            this.context.lineTo(x, y);
            prev = i;
        }

        this.context.stroke();
    };
};


function GridItem(x, y, columns, rows, label, draw, style) {
    this.x = x;
    this.y = y;
    this.columns = columns;
    this.rows = rows;
    this.draw = draw;
    this.label = label;
    this.style = style;
}

function Style(props) {
    this.props = props;

    return this;
}

Style.prototype.applyStyle = function(context) {
    for(var prop in this.props) {
        if(this.props.hasOwnProperty(prop)){
            context[prop] = this.props[prop];
        }
    }
};
