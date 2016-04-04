/* jshint browser: true */

MathGraphics = {
    Points : function(points, min, max) {
        this.draw = function(width, height, context) {
            var scaleX = width / (max - min);
            var scaleY = height / (max - min);

            context.translate(Math.abs(min) * scaleX, Math.abs(min) * scaleY);

            points.forEach(function(point) {
                context.beginPath();
                context.arc(point.x * scaleX, point.y * scaleY, 2, 0, 2 * Math.PI + 1);
                context.fill();
            }.bind(this));
        };
    },
    CenteredUnitOval : function(min, max, devs) {
        this.draw = function(width, height, context) {
            var scaleX = width / (max - min);
            var scaleY = height / (max - min);

            var ellipseWidthRadius = scaleX * devs;
            var ellipseHeightRadius = scaleY * devs;

            context.beginPath();
            context.ellipse(width / 2, height / 2, ellipseWidthRadius, ellipseHeightRadius, 0, 0, 2 * Math.PI);
            context.stroke();
        };
    },
    Distribution : function(sortedArr, min, max, draw) {
        this.draw = function(width, height, context) {

            var buckets = 15;
            var increment = (max - min) / buckets;
            var xScale = width / buckets;
            var yScale = height / sortedArr.objects.length;

            context.beginPath();
            context.moveTo(0, height);

            for(var i = min; i <= max; i += increment) {
                var amount = sortedArr.getRangeCount(i, i + increment);

                var x = xScale * (i - min) / increment;
                var y = amount * yScale;

                draw(context, x, height - y, xScale, y);
            }
            context.stroke();
        };
    },
    barGraph : function(context, x, y, width, height) {
        context.fillRect(x, y, width, height);
    },
    lineGraph : function(context, x, y, width, height) {
        context.lineTo(x, y);
        context.arc(x, y, 3, 0, 2*Math.PI);
    }
};
