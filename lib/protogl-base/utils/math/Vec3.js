var Vec3 = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    this.clone = function() {
        return new Vec3(this.x, this.y, this.z);
    };

    this.addVec3 = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    };

    this.subVec3 = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    };

    this.vec3Mult = function(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
    };

    this.vec3Divide = function(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
    };

    this.scale = function(factor) {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
    };
    
    //TODO rotate? Separate x, y, z?

    this.getMagnitude = function() {
        var x2 = Math.pow(this.x, 2),
            y2 = Math.pow(this.y, 2),
            z2 = Math.pow(this.z, 2);

        return Math.sqrt(x2 + y2 + z2);
    };

    this.getSquaredMagnitude = function() {
        var x2 = Math.pow(this.x, 2),
            y2 = Math.pow(this.y, 2),
            z2 = Math.pow(this.z, 2);

        return x2 + y2 + z2;
    };

    this.negate = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    };

    this.invert = function() {
        this.x = 1 / this.x;
        this.y = 1 / this.y;
        this.z = 1 / this.z;
    };

    this.normalize = function() {
        var sqMag = this.getSquaredMagnitude();

        if (sqMag > 0) {
            sqMag = 1 / Math.sqrt(sqMag);

            this.x *= sqMag;
            this.y *= sqMag;
            this.z *= sqMag;
        }
    };
    
    this.getVec3Dot = function(v) {
        return this.x * v.x + this.y * v.y * this.z * v.z;
    };

    this.crossWithVec3 = function(v) {
        this.x = this.y * v.z - this.z * v.y;
        this.y = this.z * v.x - this.x * v.z;
        this.z = this.x * v.y - this.y * v.x;
    };

    this.getDistancefromVec3 = function(v) {
        var x2 = Math.pow(v.x - this.x, 2),
            y2 = Math.pow(v.y - this.y, 2),
            z2 = Math.pow(v.z - this.z, 2);

        return Math.sqrt(x2 + y2 + z2);
    };

    this.getAngleBetweenV3 = function(v) {
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

    this.str = function() {
        return 'vec3(' + this.x + ', ' + this.y + ', ' + this.z + ')';
    };
};