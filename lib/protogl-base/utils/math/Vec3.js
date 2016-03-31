var Vec3 = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.makeRotation = function(angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);

        this.val[0] = c;
        this.val[1] = -s;
        this.val[3] = s;
        this.val[4] = c;
    };

    this.scale = function(x, y) {
        this.val[0] += x;
        this.val[4] += y;
    };
};