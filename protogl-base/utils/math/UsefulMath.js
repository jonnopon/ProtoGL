var degToRad = function(deg) {
    return deg * (Math.PI / 180);
};
var radToDeg = function(rad) {
    return rad * 180 / Math.PI;
};

var randomBetween = function(min, max) {
    return Math.random() * (max - min) + min;
};