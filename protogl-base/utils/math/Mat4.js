/* TODO: representation of 4x4 matrices
        - Utility methods:
//            - translation
//            - scaling
//            - rotation
//            - perspective projection generation
//            - look-at matrix generation
//            - orthogonal projection generation?
//            - frustum generation?
*/

var Mat4 = function(values) {
    this.values = values ||
        [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

    this.clone = function() {
        return new Mat4(this.values);
    };

    this.setIdentity = function() {
        this.values = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    };

    this.addMat4 = function(m) {
        var cr = 4;
        var newMat = [];
        for (var i = 0; i < cr; i++) {
            for (var j = 0; j < cr; j++) {
                var pos = cr * i + j;
                newMat[pos] = this.values[pos] + m.values[pos];
            }
        }

        this.values = newMat;
    };

    this.subMat4 = function(m) {
        var cr = 4;
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
            v00 = v[0], v01 = v[1], v02 = v[2], v03 = v[3],
            v10 = v[4], v11 = v[5], v12 = v[6], v13 = v[7],
            v20 = v[8], v21 = v[9], v22 = v[10], v23 = v[11],
            v30 = v[12], v31 = v[13], v32 = v[14], v33 = v[15],

            n00 = v00 * v11 - v01 * v10,
            n01 = v00 * v12 - v02 * v10,
            n02 = v00 * v13 - v03 * v10,
            n03 = v01 * v12 - v02 * v11,
            n04 = v01 * v13 - v03 * v11,
            n05 = v02 * v13 - v03 * v12,
            n06 = v20 * v31 - v21 * v30,
            n07 = v20 * v32 - v22 * v30,
            n08 = v20 * v33 - v23 * v30,
            n09 = v21 * v32 - v22 * v31,
            n10 = v21 * v33 - v23 * v31,
            n11 = v22 * v33 - v23 * v32,

            determinant = n00 * n11 - n01 * n10 + n02 * n09 + n03 * n08 - n04 * n07 + n05 * n06;

        if (determinant === 0) {
            this.values = null;
        }
        determinant = 1 / determinant;

        var newMat = [];
        newMat[0] = (v11 * n11 - v12 * n10 + v13 * n09) * determinant;
        newMat[1] = (v02 * n10 - v01 * n11 - v03 * n09) * determinant;
        newMat[2] = (v31 * n05 - v32 * n04 + v33 * n03) * determinant;
        newMat[3] = (v22 * n04 - v21 * n05 - v23 * n03) * determinant;
        newMat[4] = (v12 * n08 - v10 * n11 - v13 * n07) * determinant;
        newMat[5] = (v00 * n11 - v02 * n08 + v03 * n07) * determinant;
        newMat[6] = (v32 * n02 - v30 * n05 - v33 * n01) * determinant;
        newMat[7] = (v20 * n05 - v22 * n02 + v23 * n01) * determinant;
        newMat[8] = (v10 * n10 - v11 * n08 + v13 * n06) * determinant;
        newMat[9] = (v01 * n08 - v00 * n10 - v03 * n06) * determinant;
        newMat[10] = (v30 * n04 - v31 * n02 + v33 * n00) * determinant;
        newMat[11] = (v21 * n02 - v20 * n04 - v23 * n00) * determinant;
        newMat[12] = (v11 * n07 - v10 * n09 - v12 * n06) * determinant;
        newMat[13] = (v00 * n09 - v01 * n07 + v02 * n06) * determinant;
        newMat[14] = (v31 * n01 - v30 * n03 - v32 * n00) * determinant;
        newMat[15] = (v20 * n03 - v21 * n01 + v22 * n00) * determinant;

        this.values = newMat;
    };

    this.scalarMult = function(s) {
        var newMat = [];
        for (var i = 0; i < this.values.length; i++) {
            newMat[i] = this.values[i] * s;
        }

        this.values = newMat;
    };

    this.mat4Mult = function(m) {
        var cr = 4, s = 0;
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

    this.mat4Divide = function(m) {
        var inverseM = m.clone();
        inverseM.invert();
        this.mat4Mult(inverseM);
    };
    
    this.getDeterminant = function() {
        var v = this.values,
            v00 = v[0], v01 = v[1], v02 = v[2], v03 = v[3],
            v10 = v[4], v11 = v[5], v12 = v[6], v13 = v[7],
            v20 = v[8], v21 = v[9], v22 = v[10], v23 = v[11],
            v30 = v[12], v31 = v[13], v32 = v[14], v33 = v[15],

            n00 = v00 * v11 - v01 * v10,
            n01 = v00 * v12 - v02 * v10,
            n02 = v00 * v13 - v03 * v10,
            n03 = v01 * v12 - v02 * v11,
            n04 = v01 * v13 - v03 * v11,
            n05 = v02 * v13 - v03 * v12,
            n06 = v20 * v31 - v21 * v30,
            n07 = v20 * v32 - v22 * v30,
            n08 = v20 * v33 - v23 * v30,
            n09 = v21 * v32 - v22 * v31,
            n10 = v21 * v33 - v23 * v31,
            n11 = v22 * v33 - v23 * v32;

        return n00 * n11 - n01 * n10 + n02 * n09 + n03 * n08 - n04 * n07 + n05 * n06;
    };

    this.translate = function(transVector) {

    };

    this.scale = function(scaleVector) {

    };

    this.rotate = function(angle, axisVector) {

    };

    this.setAsPerspective = function(fov, aspectRatio, near, far) {

    };

    this.setAsLookAt = function(eye, center, up) {

    };

    this.setAsOrtho = function(left, right, bottom, top, near, far) {

    };

    this.setAsFrustum = function(left, right, bottom, top, near, far) {

    };

    this.str = function() {
        var a = this.values;
        return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
            a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
            a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
            a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
    };
};