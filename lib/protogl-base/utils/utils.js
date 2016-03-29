var degToRad = function(deg) {
    return deg * (Math.PI / 180);
};
var radToDeg = function(rad) {
    return rad / (Math.PI / 180);
};

var matrixMultiply = function(m1, m2) {
    var a = m1.val, b = m2.val;
    var a00 = a[0*3+0];
    var a01 = a[0*3+1];
    var a02 = a[0*3+2];
    var a10 = a[1*3+0];
    var a11 = a[1*3+1];
    var a12 = a[1*3+2];
    var a20 = a[2*3+0];
    var a21 = a[2*3+1];
    var a22 = a[2*3+2];
    var b00 = b[0*3+0];
    var b01 = b[0*3+1];
    var b02 = b[0*3+2];
    var b10 = b[1*3+0];
    var b11 = b[1*3+1];
    var b12 = b[1*3+2];
    var b20 = b[2*3+0];
    var b21 = b[2*3+1];
    var b22 = b[2*3+2];

    var val = [a00 * b00 + a01 * b10 + a02 * b20,
               a00 * b01 + a01 * b11 + a02 * b21,
               a00 * b02 + a01 * b12 + a02 * b22,
               a10 * b00 + a11 * b10 + a12 * b20,
               a10 * b01 + a11 * b11 + a12 * b21,
               a10 * b02 + a11 * b12 + a12 * b22,
               a20 * b00 + a21 * b10 + a22 * b20,
               a20 * b01 + a21 * b11 + a22 * b21,
               a20 * b02 + a21 * b12 + a22 * b22];

    return new Mat3(0, 0, val);
};

var Mat3 = function(x, y, value) {
	this.val = value ? value :  [
								 1, 0, 0,
			 					 0, 1, 0,
			 					 x, y, 1
			  					];

    this.translate = function(x, y) {
        this.val[6] += x;
        this.val[7] += y;
    };
};

var Vec2 = function(x, y) {
    this.x = x;
    this.y = y;

    this.mag = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    this.normalize = function() {
        var mag = this.mag();
        return new Vec2(this.x / mag, this.y / mag);
    };
};

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

var Cube = function() {
    this.verts = [
        -1.0,-1.0,-1.0, 1.0, 0.0, 0.0,
        -1.0,-1.0, 1.0, 1.0, 0.0, 0.0, //red - FACE 1
        -1.0, 1.0, 1.0, 1.0, 0.0, 0.0,

        1.0, 1.0,-1.0, 0.0, 1.0, 0.0,
        -1.0,-1.0,-1.0, 0.0, 1.0, 0.0, //green - FACE 2
        -1.0, 1.0,-1.0, 0.0, 1.0, 0.0,

        1.0,-1.0, 1.0, 0.0, 0.0, 1.0,
        -1.0,-1.0,-1.0, 0.0, 0.0, 1.0, //blue - FACE 3
        1.0,-1.0,-1.0, 0.0, 0.0, 1.0,

        1.0, 1.0,-1.0, 0.0, 1.0, 0.0,
        1.0,-1.0,-1.0, 0.0, 1.0, 0.0, //green - FACE 2
        -1.0,-1.0,-1.0, 0.0, 1.0, 0.0,

        -1.0,-1.0,-1.0, 1.0, 0.0, 0.0,
        -1.0, 1.0, 1.0, 1.0, 0.0, 0.0,
        -1.0, 1.0,-1.0, 1.0, 0.0, 0.0, //red - FACE 1

        1.0,-1.0, 1.0, 0.0, 0.0, 1.0,
        -1.0,-1.0, 1.0, 0.0, 0.0, 1.0, //blue - FACE 3
        -1.0,-1.0,-1.0, 0.0, 0.0, 1.0,

        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, //white
        1.0,-1.0,-1.0, 1.0, 1.0, 1.0, //white - FACE 4
        1.0, 1.0,-1.0, 1.0, 1.0, 1.0, //white

        1.0,-1.0,-1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, //white - FACE 4
        1.0,-1.0, 1.0, 1.0, 1.0, 1.0,

        -1.0, 1.0, 1.0, 0.5, 0.5, 0.5, //gray
        -1.0,-1.0, 1.0, 0.5, 0.5, 0.5, //gray - FACE 5
        1.0,-1.0, 1.0, 0.5, 0.5, 0.5, //gray

        1.0, 1.0, 1.0, 0.5, 0.0, 1.0,
        1.0, 1.0,-1.0, 0.5, 0.0, 1.0, //"dark violet" - FACE 6
        -1.0, 1.0,-1.0, 0.5, 0.0, 1.0,

        1.0, 1.0, 1.0, 0.5, 0.0, 1.0,
        -1.0, 1.0,-1.0, 0.5, 0.0, 1.0, //"dark violet" - FACE 6
        -1.0, 1.0, 1.0, 0.5, 0.0, 1.0,

        1.0, 1.0, 1.0, 0.5, 0.5, 0.5,
        -1.0, 1.0, 1.0, 0.5, 0.5, 0.5, //gray - FACE 5
        1.0,-1.0, 1.0, 0.5, 0.5, 0.5,
    ];
};