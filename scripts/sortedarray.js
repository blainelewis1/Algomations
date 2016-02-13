/* jshint -W097 */

"use strict";

function SortedArray(prop) {
    this.objects = [];
    this.prop = prop;
}

SortedArray.prototype.add = function(o) {
	this.objects.splice(this.closestIndexOf(o), 0, o);
};

SortedArray.prototype.valueOf = function(o, noprop) {
    if(!this.prop) {
        return o;
    } else {
        return o[this.prop];
    }
};

SortedArray.prototype.valueAt = function(i) {
    return this.valueOf(this.objects[i]);
};

SortedArray.prototype.closestIndexOf = function(val, noprop) {
    if(!noprop) {
        val = this.valueOf(val, noprop);
    }

    var left = 0;
    var right = this.objects.length - 1;

    var mid = 0;


    while(left < right) {
        mid = Math.floor((right + left) / 2);

        if(this.valueAt(mid) < val) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    if ((right == left) && (this.valueAt(left) == val)) {
        return left;
    }

    return mid;
};

SortedArray.prototype.getRangeCount = function(start, end) {
    return this.closestIndexOf(end, true) - this.closestIndexOf(start, true) + 1;
};
