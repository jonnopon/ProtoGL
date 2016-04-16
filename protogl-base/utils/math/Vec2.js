var Vec2 = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Vec2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
};
Vec2.prototype.clone = function() {
    return new Vec2(this.x, this.y);
};
Vec2.prototype.addVec2 = function(v) {
    this.x += v.x;
    this.y += v.y;
};
Vec2.prototype.subVec2 = function(v) {
    this.x -= v.x;
    this.y -= v.y;
};
Vec2.prototype.scalarMult = function(s) {
    this.x *= s;
    this.y *= s;
};
Vec2.prototype.vec2Mult = function(v) {
    this.x *= v.x;
    this.y *= v.y;
};
Vec2.prototype.scalarDivide = function(s) {
    this.x /= s;
    this.y /= s;
};
Vec2.prototype.vec2Divide = function(v) {
    this.x /= v.x;
    this.y /= v.y;
};
Vec2.prototype.scale = function(factor) {
    //TODO this is the same as a scalar multiplication! hmmmmm
    this.x *= factor;
    this.y *= factor;
};
//TODO Separate x, y, z?
Vec2.prototype.rotate = function(angle) {
    var ca = Math.cos(angle);
    var sa = Math.sin(angle);

    this.x = ca * this.x - sa * this.y;
    this.y = sa * this.x + ca * this.y;
};
Vec2.prototype.getMagnitude = function() {
    var x2 = Math.pow(this.x, 2),
        y2 = Math.pow(this.y, 2);

    return Math.sqrt(x2 + y2);
};
Vec2.prototype.getSquaredMagnitude = function() {
    var x2 = Math.pow(this.x, 2),
        y2 = Math.pow(this.y, 2);

    return x2 + y2;
};
Vec2.prototype.negate = function() {
    this.x = -this.x;
    this.y = -this.y;
};
Vec2.prototype.invert = function() {
    this.x = 1 / this.x;
    this.y = 1 / this.y;
};
Vec2.prototype.normalize = function() {
    var sqMag = this.getSquaredMagnitude();

    if (sqMag > 0) {
        sqMag = 1 / Math.sqrt(sqMag);

        this.x *= sqMag;
        this.y *= sqMag;
    }
};
Vec2.prototype.getVec2Dot = function(v) {
    return this.x * v.x + this.y * v.y;
};
Vec2.prototype.getVec2Cross = function(v) {
    return new Vec3(
        0, 0,
        this.x * v.y - this.y * v.x
    );
};
Vec2.prototype.getDistancefromVec2 = function(v) {
    var x2 = Math.pow(v.x - this.x, 2),
        y2 = Math.pow(v.y - this.y, 2);

    return Math.sqrt(x2 + y2);
};
Vec2.prototype.getAngleBetweenVec2 = function(v) {
    return Math.atan2(v.y - this.y, v.x - this.x);
};
Vec2.prototype.str = function() {
    return 'vec3(' + this.x + ', ' + this.y + ', ' + this.z + ')';
};