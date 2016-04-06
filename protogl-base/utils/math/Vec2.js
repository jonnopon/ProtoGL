var Vec2 = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;

    this.clone = function() {
        return new Vec2(this.x, this.y);
    };

    this.addVec2 = function(v) {
        this.x += v.x;
        this.y += v.y;
    };

    this.subVec2 = function(v) {
        this.x -= v.x;
        this.y -= v.y;
    };

    this.vec2Mult = function(v) {
        this.x *= v.x;
        this.y *= v.y;
    };

    this.vec2Divide = function(v) {
        this.x /= v.x;
        this.y /= v.y;
    };

    this.scale = function(factor) {
        this.x *= factor;
        this.y *= factor;
    };

    //TODO rotate? Separate x, y, z?

    this.getMagnitude = function() {
        var x2 = Math.pow(this.x, 2),
            y2 = Math.pow(this.y, 2);
        
        return Math.sqrt(x2 + y2);
    };
    
    this.getSquaredMagnitude = function() {
        var x2 = Math.pow(this.x, 2),
            y2 = Math.pow(this.y, 2);
        
        return x2 + y2;
    };

    this.negate = function() {
        this.x = -this.x;
        this.y = -this.y;
    };

    this.invert = function() {
        this.x = 1 / this.x;
        this.y = 1 / this.y;
    };

    this.normalize = function() {
        var sqMag = this.getSquaredMagnitude();
        
        if (sqMag > 0) {
            sqMag = 1 / Math.sqrt(sqMag);
            
            this.x *= sqMag;
            this.y *= sqMag;
        }
    };

    this.getVec2Dot = function(v) {
        return this.x * v.x + this.y * v.y;
    };

    this.getVec2Cross = function(v) {
        return new Vec3(
            0, 0,
            this.x * v.y - this.y * v.x
        );
    };

    this.getDistancefromVec2 = function(v) {
        var x2 = Math.pow(v.x - this.x, 2),
            y2 = Math.pow(v.y - this.y, 2);

        return Math.sqrt(x2 + y2);
    };

    this.str = function() {
        return 'vec3(' + this.x + ', ' + this.y + ', ' + this.z + ')';
    };
};