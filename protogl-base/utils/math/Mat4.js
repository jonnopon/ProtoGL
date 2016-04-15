var Mat4 = function(values) {
    this.values = values ||
        [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
};

Mat4.prototype.clone = function() {
    return new Mat4(this.values);
};
Mat4.prototype.setIdentity = function() {
    this.values = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
};
Mat4.prototype.addMat4 = function(m) {
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
Mat4.prototype.subMat4 = function(m) {
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
Mat4.prototype.invert = function() {
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
Mat4.prototype.scalarMult = function(s) {
    var newMat = [];
    for (var i = 0; i < this.values.length; i++) {
        newMat[i] = this.values[i] * s;
    }

    this.values = newMat;
};
Mat4.prototype.mat4Mult = function(m) {
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
Mat4.prototype.mat4Divide = function(m) {
    var inverseM = m.clone();
    inverseM.invert();
    this.mat4Mult(inverseM);
};
Mat4.prototype.getDeterminant = function() {
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
Mat4.prototype.translate = function(transVector) {
    var v = this.values,
        v00 = v[0], v01 = v[1], v02 = v[2], v03 = v[3],
        v10 = v[4], v11 = v[5], v12 = v[6], v13 = v[7],
        v20 = v[8], v21 = v[9], v22 = v[10], v23 = v[11],

        x = transVector.x, y = transVector.y, z = transVector.z,

        newMat = [];

    newMat[0] = v00;
    newMat[1] = v01;
    newMat[2] = v02;
    newMat[3] = v03;
    newMat[4] = v10;
    newMat[5] = v11;
    newMat[6] = v12;
    newMat[7] = v13;
    newMat[8] = v20;
    newMat[9] = v21;
    newMat[10] = v22;
    newMat[11] = v23;

    newMat[12] = v00 * x + v10 * y + v20 * z + v[12];
    newMat[13] = v01 * x + v11 * y + v21 * z + v[13];
    newMat[14] = v02 * x + v12 * y + v22 * z + v[14];
    newMat[15] = v03 * x + v13 * y + v23 * z + v[15];

    this.values = newMat;
};
Mat4.prototype.scale = function(scaleVector) {
    var x = scaleVector.z, y = scaleVector.y, z = scaleVector.z,
        newMat = [];

    newMat[0] = this.values[0] * x;
    newMat[1] = this.values[1] * x;
    newMat[2] = this.values[2] * x;
    newMat[3] = this.values[3] * x;
    newMat[4] = this.values[4] * y;
    newMat[5] = this.values[5] * y;
    newMat[6] = this.values[6] * y;
    newMat[7] = this.values[7] * y;
    newMat[8] = this.values[8] * z;
    newMat[9] = this.values[9] * z;
    newMat[10] = this.values[10] * z;
    newMat[11] = this.values[11] * z;
    newMat[12] = this.values[12];
    newMat[13] = this.values[13];
    newMat[14] = this.values[14];
    newMat[15] = this.values[15];

    this.values = newMat;
};
Mat4.prototype.rotate = function(angle, axisVector) {
    var v = this.values,
        x = axisVector.x, y = axisVector.y, z = axisVector.z,
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        v00, v01, v02, v03,
        v10, v11, v12, v13,
        v20, v21, v22, v23,
        n00, n01, n02,
        n10, n11, n12,
        n20, n21, n22,
        newMat = [];

    if (Math.abs(len) < 0.000001) {
        return;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(angle);
    c = Math.cos(angle);
    t = 1 - c;

    v00 = v[0]; v01 = v[1]; v02 = v[2]; v03 = v[3];
    v10 = v[4]; v11 = v[5]; v12 = v[6]; v13 = v[7];
    v20 = v[8]; v21 = v[9]; v22 = v[10]; v23 = v[11];

    n00 = x * x * t + c; n01 = y * x * t + z * s; n02 = z * x * t - y * s;
    n10 = x * y * t - z * s; n11 = y * y * t + c; n12 = z * y * t + x * s;
    n20 = x * z * t + y * s; n21 = y * z * t - x * s; n22 = z * z * t + c;

    newMat[0] = v00 * n00 + v10 * n01 + v20 * n02;
    newMat[1] = v01 * n00 + v11 * n01 + v21 * n02;
    newMat[2] = v02 * n00 + v12 * n01 + v22 * n02;
    newMat[3] = v03 * n00 + v13 * n01 + v23 * n02;
    newMat[4] = v00 * n10 + v10 * n11 + v20 * n12;
    newMat[5] = v01 * n10 + v11 * n11 + v21 * n12;
    newMat[6] = v02 * n10 + v12 * n11 + v22 * n12;
    newMat[7] = v03 * n10 + v13 * n11 + v23 * n12;
    newMat[8] = v00 * n20 + v10 * n21 + v20 * n22;
    newMat[9] = v01 * n20 + v11 * n21 + v21 * n22;
    newMat[10] = v02 * n20 + v12 * n21 + v22 * n22;
    newMat[11] = v03 * n20 + v13 * n21 + v23 * n22;
    newMat[12] = v[12];
    newMat[13] = v[13];
    newMat[14] = v[14];
    newMat[15] = v[15];

    this.values = newMat;
};
Mat4.prototype.setAsPerspective = function(fov, aspectRatio, near, far) {
    var f = 1.0 / Math.tan(fov / 2),
        nf = 1 / (near - far),
        newMat = [];

    newMat[0] = f / aspectRatio;
    newMat[1] = 0;
    newMat[2] = 0;
    newMat[3] = 0;
    newMat[4] = 0;
    newMat[5] = f;
    newMat[6] = 0;
    newMat[7] = 0;
    newMat[8] = 0;
    newMat[9] = 0;
    newMat[10] = (far + near) * nf;
    newMat[11] = -1;
    newMat[12] = 0;
    newMat[13] = 0;
    newMat[14] = (2 * far * near) * nf;
    newMat[15] = 0;

    this.values = newMat;
};
Mat4.prototype.setAsLookAt = function(eyeVector, center, upVector) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        ex = eyeVector.x, ey = eyeVector.y, ez = eyeVector.z,
        ux = upVector.x, uy = upVector.y, uz = upVector.z,
        cx = center.x, cy = center.y, cz = center.z,
        newMat = [];

    if (Math.abs(ex - cx) < 0.000001 &&
        Math.abs(ey - cy) < 0.000001 &&
        Math.abs(ez - cz) < 0.000001) {

        newMat = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }
    else {
        z0 = ex - cx;
        z1 = ey - cy;
        z2 = ez - cz;

        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;

        x0 = uy * z2 - uz * z1;
        x1 = uz * z0 - ux * z2;
        x2 = ux * z1 - uy * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);

        if (len === 0) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        }
        else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }

        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;

        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);

        if (len === 0) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        }
        else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }

        newMat[0] = x0;
        newMat[1] = y0;
        newMat[2] = z0;
        newMat[3] = 0;
        newMat[4] = x1;
        newMat[5] = y1;
        newMat[6] = z1;
        newMat[7] = 0;
        newMat[8] = x2;
        newMat[9] = y2;
        newMat[10] = z2;
        newMat[11] = 0;
        newMat[12] = -(x0 * ex + x1 * ey + x2 * ez);
        newMat[13] = -(y0 * ex + y1 * ey + y2 * ez);
        newMat[14] = -(z0 * ex + z1 * ey + z2 * ez);
        newMat[15] = 1;
    }

    this.values = newMat;
};
Mat4.prototype.setAsOrtho = function(left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far),
        newMat = [];

    newMat[0] = -2 * lr;
    newMat[1] = 0;
    newMat[2] = 0;
    newMat[3] = 0;
    newMat[4] = 0;
    newMat[5] = -2 * bt;
    newMat[6] = 0;
    newMat[7] = 0;
    newMat[8] = 0;
    newMat[9] = 0;
    newMat[10] = 2 * nf;
    newMat[11] = 0;
    newMat[12] = (left + right) * lr;
    newMat[13] = (top + bottom) * bt;
    newMat[14] = (far + near) * nf;
    newMat[15] = 1;

    this.values = newMat;
};
Mat4.prototype.str = function() {
    var a = this.values;
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
        a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
        a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
        a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};