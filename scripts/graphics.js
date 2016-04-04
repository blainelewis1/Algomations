/* jshint browser: true */
/* jshint -W097 */

/* global $ */

"use strict";

//TODO: stop cells from intersecting with each other?
function Graphics(canvas, columns, rows) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.columns = columns;
    this.rows = rows;

    $(window).resize(this.resize.bind(this));
    this.resize();

    this.defaultStyle = new Style({"lineCap" : "round", "lineJoin" : "round"});

    this.frames = [];
}

Graphics.prototype.resize = function() {
    this.cellWidth = this.canvas.width / this.columns;
    this.cellHeight = this.canvas.height / this.rows;
};

Graphics.prototype.addFrame = function(frame) {
    this.frames.push(frame);
    return this.frames.length - 1;
};

Graphics.prototype.removeFromFrame = function(index) {
    this.frames.splice(index, 0, 1);
};

Graphics.prototype.drawFrames = function(timestamp) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for(var i = 0; i < this.frames.length; i++){
        this.frames[i].draw(this.cellWidth, this.cellHeight, this.defaultStyle, this.context);
    }
};

Frame.prototype.draw = function(cellWidth, cellHeight, defaultStyle, context) {
    context.save();
    context.translate(this.x * cellWidth, this.y * cellHeight);

    //this.context.strokeRect(0, 0, this.cellWidth * frameItem.columns, this.cellHeight * frameItem.rows);
    context.font = "20px Helvetica";
    context.fillText(this.label, 5, 20);

    var style = this.style || defaultStyle;

    style.applyStyle(context);

    for(var i = 0; i < this.items.length; i++) {
        context.save();
        this.items[i].draw.bind(this)(cellWidth * this.columns, cellHeight * this.rows, context);
        context.restore();
    }

    context.closePath();
    context.restore();
};

function Frame(x, y, columns, rows, label, style) {
    this.x = x;
    this.y = y;
    this.columns = columns;
    this.rows = rows;
    this.label = label;
    this.style = style;
    this.items = [];

    return this;
}

Frame.prototype.add = function(item) {
    this.items.push(item);

    return this;
};

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
