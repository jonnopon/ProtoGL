var Vec4 = function(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;
};

Vec4.prototype.clone = function() {
    return new Vec4(this.x, this.y, this.z, this.w);
};
Vec4.prototype.addVec4 = function(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
};
Vec4.prototype.subVec4 = function(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
};
Vec4.scalarMult = function(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    this.w *= s;
};
Vec4.prototype.vec4Mult = function(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    this.w *= v.w;
};
Vec4.scalarDivide = function(s) {
    this.x /= s;
    this.y /= s;
    this.z /= s;
    this.w /= s;
};
Vec4.prototype.vec4Divide = function(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    this.w /= v.w;
};
Vec4.prototype.scale = function(factor) {
    //TODO this is the same as a scalar multiplication! hmmmmm
    this.x *= factor;
    this.y *= factor;
    this.z *= factor;
    this.w *= factor;
};
//TODO rotate? Does that even make sense for a Vec4?
Vec4.prototype.getMagnitude = function() {
    var x2 = Math.pow(this.x, 2),
        y2 = Math.pow(this.y, 2),
        z2 = Math.pow(this.z, 2),
        w2 = Math.pow(this.w, 2);

    return Math.sqrt(x2 + y2 + z2 + w2);
};
Vec4.prototype.getSquaredMagnitude = function() {
    var x2 = Math.pow(this.x, 2),
        y2 = Math.pow(this.y, 2),
        z2 = Math.pow(this.z, 2),
        w2 = Math.pow(this.w, 2);

    return x2 + y2 + z2 + w2;
};
Vec4.prototype.negate = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
};
Vec4.prototype.invert = function() {
    this.x = 1 / this.x;
    this.y = 1 / this.y;
    this.z = 1 / this.z;
    this.w = 1 / this.w;
};
Vec4.prototype.normalize = function() {
    var sqMag = this.getSquaredMagnitude();

    if (sqMag > 0) {
        sqMag = 1 / Math.sqrt(sqMag);

        this.x *= sqMag;
        this.y *= sqMag;
        this.z *= sqMag;
        this.w *= sqMag;
    }
};
Vec4.prototype.getVec4Dot = function(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
};
Vec4.prototype.getDistanceFromVec4 = function(v) {
    var x2 = Math.pow(v.x - this.x, 2),
        y2 = Math.pow(v.y - this.y, 2),
        z2 = Math.pow(v.z - this.z, 2),
        w2 = Math.pow(v.w - this.w, 2);

    return Math.sqrt(x2 + y2 + z2 + w2);
};
Vec4.prototype.str = function() {
    return 'vec4(' + this.x + ', ' + this.y + ', ' + this.z + ',' + this.w + ')';
};
Vec4.prototype.asArray = function() {
    return [this.x, this.y, this.z, this.w];
};