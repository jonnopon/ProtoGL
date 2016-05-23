var Mat3 = function(values) {
    this.values = values ||
        [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];
};

Mat3.prototype.clone = function() {
    return new Mat3(this.values);
};
Mat3.prototype.setIdentity = function() {
    this.values = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ];
};
Mat3.prototype.addMat3 = function(m) {
    var cr = 3;
    var newMat = [];
    for (var i = 0; i < cr; i++) {
        for (var j = 0; j < cr; j++) {
            var pos = cr * i + j;
            newMat[pos] = this.values[pos] + m.values[pos];
        }
    }

    this.values = newMat;
};
Mat3.prototype.subMat3 = function(m) {
    var cr = 3;
    var newMat = [];
    for (var i = 0; i < cr; i++) {
        for (var j = 0; j < cr; j++) {
            var pos = cr * i + j;
            newMat[pos] = this.values[pos] - m.values[pos];
        }
    }

    this.values = newMat;
};
Mat3.prototype.invert = function() {
    var v = this.values,
        v00 = v[0], v01 = v[1], v02 = v[2],
        v10 = v[3], v11 = v[4], v12 = v[5],
        v20 = v[6], v21 = v[7], v22 = v[8],

        n01 = v22 * v11 - v12 * v21,
        n11 = -v22 * v10 + v12 * v20,
        n21 = v21 * v10 - v11 * v20,

        determinant = v00 * n01 + v01 * n11 + v02 * n21,

        newMat = [];

    if (determinant === 0) {
        this.values = null;
    }
    determinant = 1 / determinant;

    newMat[0] = n01 * determinant;
    newMat[1] = (-v22 * v01 + v02 * v21) * determinant;
    newMat[2] = (v12 * v01 - v02 * v11) * determinant;
    newMat[3] = n11 * determinant;
    newMat[4] = (v22 * v00 - v02 * v20) * determinant;
    newMat[5] = (-v12 * v00 + v02 * v10) * determinant;
    newMat[6] = n21 * determinant;
    newMat[7] = (-v21 * v00 + v01 * v20) * determinant;
    newMat[8] = (v11 * v00 - v01 * v10) * determinant;

    this.values = newMat;
};
Mat3.prototype.scalarMult = function(s) {
    var newMat = [];
    for (var i = 0; i < this.values.length; i++) {
        newMat[i] = this.values[i] * s;
    }

    this.values = newMat;
};
Mat3.prototype.mat3Mult = function(m) {
    var cr = 3, s = 0;
    var newMat = [];
    for (var i = 0; i < cr; i++) {
        for (var j = 0; j < cr; j++) {
            for (var k = 0; k < cr; k++) {
                s += this.values[cr * i + k] * m.values[cr * k + j];
            }
            newMat[cr * i + j] = s;
            s = 0;
        }
    }

    this.values = newMat;
};
Mat3.prototype.mat3Divide = function(m) {
    var inverseM = m.clone();
    inverseM.invert();
    this.mat3Mult(inverseM);
};
Mat3.prototype.getDeterminant = function() {
    var v = this.values,
        v00 = v[0], v01 = v[1], v02 = v[2],
        v10 = v[3], v11 = v[4], v12 = v[5],
        v20 = v[6], v21 = v[7], v22 = v[8];

    return v00 * (v22 * v11 - v12 * v21) + v01 * (-v22 * v10 + v12 * v20) + v02 * (v21 * v10 - v11 * v20);
};
Mat3.prototype.translate = function(transVector) {
    var v = this.values,
        v00 = v[0], v01 = v[1], v02 = v[2],
        v10 = v[3], v11 = v[4], v12 = v[5],
        v20 = v[6], v21 = v[7], v22 = v[8],

        x = transVector.x, y = transVector.y,

        newMat = [];

    newMat[0] = v00;
    newMat[1] = v01;
    newMat[2] = v02;
    newMat[3] = v10;
    newMat[4] = v11;
    newMat[5] = v12;

    newMat[6] = x * v00 + y * v10 + v20;
    newMat[7] = x * v01 + y * v11 + v21;
    newMat[8] = x * v02 + y * v12 + v22;

    this.values = newMat;
};
Mat3.prototype.scale = function(scaleVector) {
    var x = scaleVector.x, y = scaleVector.y,
        newMat = [];

    newMat[0] = x * this.values[0];
    newMat[1] = x * this.values[1];
    newMat[2] = x * this.values[2];
    newMat[3] = y * this.values[3];
    newMat[4] = y * this.values[4];
    newMat[5] = y * this.values[5];
    newMat[6] = this.values[6];
    newMat[7] = this.values[7];
    newMat[8] = this.values[8];

    this.values = newMat;
};
Mat3.prototype.rotate = function(angle) {
    var v = this.values,
        v00 = v[0], v01 = v[1], v02 = v[2],
        v10 = v[3], v11 = v[4], v12 = v[5],
        v20 = v[6], v21 = v[7], v22 = v[8],

        s = Math.sin(angle), c = Math.cos(angle),

        newMat = [];

    newMat[0] = c * v00 + s * v10;
    newMat[1] = c * v01 + s * v11;
    newMat[2] = c * v02 + s * v12;

    newMat[3] = c * v10 - s * v00;
    newMat[4] = c * v11 - s * v01;
    newMat[5] = c * v12 - s * v02;

    newMat[6] = v20;
    newMat[7] = v21;
    newMat[8] = v22;

    this.values = newMat;
};
Mat3.prototype.setAs2DProjection = function(width, height) {
    //Y 0 IS AT TOP
    this.values = [
        2 / width, 0, 0,
        0,  -2 / height, 0,
        -1, 1, 1
    ];
};
Mat3.prototype.str = function() {
    var a = this.values;
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
        a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
        a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};