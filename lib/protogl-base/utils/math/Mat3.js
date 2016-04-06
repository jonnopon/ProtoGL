var Mat3 = function(values) {
    this.values = values ||
        [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];

    this.clone = function() {
        return new Mat3(this.values);
    };

    this.setIdentity = function() {
        this.values = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];
    };

    this.addMat3 = function(m) {
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

    this.subMat3 = function(m) {
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

    this.invert = function() {
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

    this.scalarMult = function(s) {
        var newMat = [];
        for (var i = 0; i < this.values.length; i++) {
            newMat[i] = this.values[i] * s;
        }

        this.values = newMat;
    };

    this.mat3Mult = function(m) {
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

    this.mat3Divide = function(m) {
        var inverseM = m.clone();
        inverseM.invert();
        this.mat3Mult(inverseM);
    };

    this.getDeterminant = function() {
        var v = this.values,
            v00 = v[0], v01 = v[1], v02 = v[2],
            v10 = v[3], v11 = v[4], v12 = v[5],
            v20 = v[6], v21 = v[7], v22 = v[8];

        return v00 * (v22 * v11 - v12 * v21) + v01 * (-v22 * v10 + v12 * v20) + v02 * (v21 * v10 - v11 * v20);
    };

    this.translate = function(transVector) {

    };

    this.scale = function(scaleVector) {

    };

    this.rotate = function(angle, axisVector) {

    };

    this.setAsPerspective = function(fov, aspectRatio, near, far) {


//projection?????
// function make2DProjection(width, height) {
//     return [
//         2 / width, 0, 0,
//         0, 2 / height, 0,
//         -1, 1, 1
//     ];
// }


    };

    this.setAsLookAt = function(eye, center, up) {

    };

    this.setAsOrtho = function(left, right, bottom, top, near, far) {

    };

    this.setAsFrustum = function(left, right, bottom, top, near, far) {

    };

    this.str = function() {
        var a = this.values;
        return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
                a[6] + ', ' + a[7] + ', ' + a[8] + ')';
    };
};