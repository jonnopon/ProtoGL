var Vec3 = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Vec3.prototype.clone = function() {
    return new Vec3(this.x, this.y, this.z);
};
Vec3.prototype.addVec3 = function(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
};
Vec3.prototype.subVec3 = function(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
};
Vec3.prototype.scalarMult = function(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
};
Vec3.prototype.vec3Mult = function(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
};
Vec3.prototype.scalarDivide = function(s) {
    this.x /= s;
    this.y /= s;
    this.z /= s;
};
Vec3.prototype.vec3Divide = function(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
};
Vec3.prototype.scale = function(factor) {
    //TODO this is the same as a scalar multiplication! hmmmmm
    this.x *= factor;
    this.y *= factor;
    this.z *= factor;
};
//TODO rotate? Separate x, y, z?
Vec3.prototype.getMagnitude = function() {
    var x2 = Math.pow(this.x, 2),
        y2 = Math.pow(this.y, 2),
        z2 = Math.pow(this.z, 2);

    return Math.sqrt(x2 + y2 + z2);
};
Vec3.prototype.getSquaredMagnitude = function() {
    var x2 = Math.pow(this.x, 2),
        y2 = Math.pow(this.y, 2),
        z2 = Math.pow(this.z, 2);

    return x2 + y2 + z2;
};
Vec3.prototype.negate = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
};
Vec3.prototype.invert = function() {
    this.x = 1 / this.x;
    this.y = 1 / this.y;
    this.z = 1 / this.z;
};
Vec3.prototype.normalize = function() {
    var sqMag = this.getSquaredMagnitude();

    if (sqMag > 0) {
        sqMag = 1 / Math.sqrt(sqMag);

        this.x *= sqMag;
        this.y *= sqMag;
        this.z *= sqMag;
    }
};
Vec3.prototype.getVec3Dot = function(v) {
    return this.x * v.x + this.y * v.y * this.z * v.z;
};
Vec3.prototype.crossWithVec3 = function(v) {
    this.x = this.y * v.z - this.z * v.y;
    this.y = this.z * v.x - this.x * v.z;
    this.z = this.x * v.y - this.y * v.x;
};
Vec3.prototype.getDistancefromVec3 = function(v) {
    var x2 = Math.pow(v.x - this.x, 2),
        y2 = Math.pow(v.y - this.y, 2),
        z2 = Math.pow(v.z - this.z, 2);

    return Math.sqrt(x2 + y2 + z2);
};
Vec3.prototype.getAngleBetweenV3 = function(v) {
    var a = this.clone();
    var b = v.clone();

    a.normalize();
    b.normalize();

    var cos = a.getVec3Dot(b);

    if (cos > 1) {
        return 0;
    }
    else {
        return Math.acos(cos);
    }
};
Vec3.prototype.str = function() {
    return 'vec3(' + this.x + ', ' + this.y + ', ' + this.z + ')';
};
Vec3.prototype.asArray = function() {
    return [this.x, this.y, this.z];
};