"use strict";

var vector = function(initX, initY) {
    var x = initX;
    var y = initY;

    return {
        getX: function () { return x; },
        getY: function () { return y; },

        addX: function (dx) { x += dx; },
        addY: function (dy) { y += dy; },

        setX: function (newX) { x = newX; },
        setY: function (newY) { y = newY; }
    };
};