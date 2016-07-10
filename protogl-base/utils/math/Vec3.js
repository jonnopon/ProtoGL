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
Vec3.prototype.rotateX = function(origin, angle) {
    // var or = [], r=[];

    //translate to origin
    var ori = [
        this.x - origin.x,
        this.y - origin.y,
        this.z - origin.z
    ];
    //Translate point to the origin
    // p[0] = a[0] - b[0];
    // p[1] = a[1] - b[1];
    // p[2] = a[2] - b[2];

    //perform rotation
    var rot = [
        ori[0],
        ori[1] * Math.cos(angle) + ori[2] * Math.sin(angle),
        ori[1] * Math.sin(angle) + ori[2] * Math.cos(angle)
    ];
    //perform rotation
    // r[0] = p[0];
    // r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
    // r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

    //translate back
    this.x = rot[0] + origin.x;
    this.y = rot[1] + origin.y;
    this.z = rot[2] + origin.z;
    //
    // //translate to correct position
    // out[0] = r[0] + b[0];
    // out[1] = r[1] + b[1];
    // out[2] = r[2] + b[2];
    //
    // return out;
};
Vec3.prototype.rotateY = function(origin, angle) {
    // var p = [], r=[];

    //translate to origin
    var ori = [
        this.x - origin.x,
        this.y - origin.y,
        this.z - origin.z
    ];
    //Translate point to the origin
    // p[0] = a[0] - b[0];
    // p[1] = a[1] - b[1];
    // p[2] = a[2] - b[2];

    //perform rotation
    var rot = [
        ori[2] * Math.sin(angle) + ori[0] * Math.cos(angle),
        ori[1],
        ori[2] * Math.cos(angle) + ori[0] * Math.sin(angle)
    ];
    //perform rotation
    // r[0] = p[0];
    // r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
    // r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

    //translate back
    this.x = rot[0] + origin.x;
    this.y = rot[1] + origin.y;
    this.z = rot[2] + origin.z;
    //
    // //translate to correct position
    // out[0] = r[0] + b[0];
    // out[1] = r[1] + b[1];
    // out[2] = r[2] + b[2];
    //
    // return out;
};
Vec3.prototype.rotateZ = function(origin, angle) {
    // var p = [], r=[];

    //translate to origin
    var ori = [
        this.x - origin.x,
        this.y - origin.y,
        this.z - origin.z
    ];
    //Translate point to the origin
    // p[0] = a[0] - b[0];
    // p[1] = a[1] - b[1];
    // p[2] = a[2] - b[2];

    //perform rotation
    var rot = [
        ori[0] * Math.cos(angle) - ori[1] * Math.sin(angle),
        ori[0] * Math.sin(angle) + ori[1] * Math.cos(angle),
        ori[2]
    ];
    //perform rotation
    // r[0] = p[0];
    // r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
    // r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

    //translate back
    this.x = rot[0] + origin.x;
    this.y = rot[1] + origin.y;
    this.z = rot[2] + origin.z;
    //
    // //translate to correct position
    // out[0] = r[0] + b[0];
    // out[1] = r[1] + b[1];
    // out[2] = r[2] + b[2];
    //
    // return out;
};
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
    // var sqMag = this.getSquaredMagnitude();
    var mag = this.getMagnitude();

    if (mag > 0.00001) {
        this.x = this.x / mag;
        this.y = this.y / mag;
        this.z = this.z / mag;
    }
    else {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    // if (sqMag > 0) {
    //     sqMag = 1 / Math.sqrt(sqMag);
    //
    //     this.x *= sqMag;
    //     this.y *= sqMag;
    //     this.z *= sqMag;
    // }
};
Vec3.prototype.getVec3Dot = function(v) {
    return this.x * v.x + this.y * v.y * this.z * v.z;
};
Vec3.prototype.crossWithVec3 = function(v) {
    this.x = this.y * v.z - this.z * v.y;
    this.y = this.z * v.x - this.x * v.z;
    this.z = this.x * v.y - this.y * v.x;
};
Vec3.prototype.getDistanceFromVec3 = function (v) {
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