/* jshint browser: true */
/* jshint -W097 */
/* global $ */

"use strict";

$(function() {
    $(window).on("resize", function() {
        $("canvas").attr("height", window.innerHeight).attr("width", window.innerWidth);
    });

    $("canvas").attr("height", window.innerHeight).attr("width", window.innerWidth);
});
