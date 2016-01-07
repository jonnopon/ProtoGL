/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}
;/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;var Game = function(width, height) {
    this.width = width;
    this.height = height;
    this.renderer = new Renderer();
    this.textUtils = new TextUtils(this.renderer);
    this.textUtils.setUpFont();

    this.sman = null;
    this.eman = null;
    this.lman = null;

    this.states = {};
    this.currentState = null;
    window.keys = [];
    this.keyCodes = new KeyCodes();

    this.delta = 0;
    this.lastLoopTime = 0;

    this.initData = {};
    this.reinitData = {};
    this.initFunc = null;
    this.reinitFunc = null;

    window.onkeydown = function(event) {
        if (event.which !== game.keyCodes.f5 && event.which !== game.keyCodes.f12) {
            event.preventDefault();
            if (this.keys.indexOf(event.which) === -1) {
                this.keys.push(event.which);
            }
        }
    };

    window.onkeyup = function(event) {
        if (event.which !== game.keyCodes.f5 && event.which !== game.keyCodes.f12) {
            event.preventDefault();
            this.keys.splice(this.keys.indexOf(event.which), 1);
        }
    };

    this["run"] = function(t) {
        var game = window.game;
        game.delta = Date.now() - game.lastLoopTime;
        game.lastLoopTime = Date.now();

        if (game.clearScreen) {
            game.renderer.clearScreen(new Vec3(0, 0, 0), false);
        }
        else {
            game.clearScreen = true;
        }

        game.currentState.tick();
    };

    window.game = this;
};

Game.prototype.initManagers = function() {
    this.renderer = new Renderer();
    this.sman = new SoundManager();
    this.lman = new LevelManager(this);
    this.eman = new EntityManager(this);
}

Game.prototype.addState = function(state) {
    this.states[state.getName()] = state;
};

Game.prototype.activeState = function(name) {
    this.currentState = this.states[name];
};

Game.setSoundManager = function(sman) {
    this.sman = sman;
};

Game.setEntityManager = function(eman) {
    this.eman = eman;
};

Game.prototype.addEnt = function(e) {
    this.eman.addEnt(e);
}

Game.prototype.removeEnt = function(e) {
    this.eman.removeEnt(e);
};

Game.prototype.loadAttributes = function(data) {
    for (key in data) {
        this[key] = data[key];
    }
};

Game.prototype.addAttr = function(name, value) {
    this[name] = value;
};

Game.prototype.addMethod = function(name, body) {
    this[name] = body;
};

Game.prototype.init = function() {
    this.initFunc();
};

Game.prototype.reinit = function() {
    this.reinitFunc();
};

Game.prototype.start = function() {
    this.init();
    window.game = this;
    window.requestAnimationFrame(this.run);
};;var SoundManager = function() {
    this.sounds = {};

    this.playSound = function(name) {
        new Audio(this.sounds[name]).play();
    };

    this.addSound = function(name, location) {
        this.sounds[name] = location;
    };
};;var Entity = function(pos, dimensions, game) {
    //TODO not sure what I'm doing with this yet
    //IDEALLY need attributes to determine vertex output...not sure how to do this generically
    //component based entity system?
    //ability to output vertices
	this.eman = game.eman;
	this.sman = game.sman;
    this.lman = game.lman;
	this.pos = pos;
    this.u1 = 0;
    this.u2 = 1;
    this.v1 = 0;
    this.v2 = 1;
	this.width = dimensions.x;
    this.height = dimensions.y;
    this.origWidth = this.width;
    this.origHeight = this.height;
	this.vel = new Vec2(0, 0);
	this.center = new Vec2((pos.x + (pos.x + dimensions.x)) / 2, (pos.y + (pos.y + dimensions.y)) / 2);
	this.maxDXMag = 0.05;
	this.maxDYMag = 0.05;

    this.visible = true;

	this.rotation = 0;
    this.scaler = 1;
	this.moveLeft = false;
	this.moveRight = false;
	this.moveUp = false;
	this.moveDown = false;
	this.stoppedHor = false;
	this.stoppedVer = true;

    this.noCollideLvl = false;
    this.noCollideLvlTime = 0;
    this.noCollideLvlTimer = 0;
    this.noCollideLvlPerm = false;
    this.noCollideEnt = false;
    this.noCollideEntTime = 0;
    this.noCollideEntTimer = 0;
    this.noCollideEntPerm = false;

    this.hasGravity = false;
    this.gravity = 0;
    this.blocked = false;

    this.falling = false;
    this.jumping = false;
    this.canJump = false;
    this.lastJumpTime = 0;
    this.jumpCoolDown = 0;
    this.jumpCapacity = 1;
    this.jumpCount = 0;

    this.jumpPower = 1;

    this.dataPerVert = 8; //assuming 2D pos w/ texture, rotation scale and center
    this.totalVerts = 6; //assuming triangle

    this.health = 0;
    this.damage = 0;

    this.update = function(delta) {
        if (this.nocollideLvl && !this.noCollideLvlPerm) {
            this.nocollideTimerLvl++;
            if (this.nocollideTimerLvl > this.nocollideTimeLvl) {
                this.nocollideLvl = false;
                this.nocollideTimerLvl = 0;
                this.nocollideTimeLvl = 0;
            }
        }
        if (this.nocollideEnt && !this.noCollideEntPerm) {
            this.nocollideTimerEnt++;
            if (this.nocollideTimerEnt > this.nocollideTimeEnt) {
                this.nocollideEnt = false;
                this.nocollideTimerEnt = 0;
                this.nocollideTimeEnt = 0;
            }
        }

        //gravity 
        if (this.falling) {
            var newVel = this.vel.y - (this.gravity * delta) / 100;
            if (newVel >= -this.maxDYMag) {
                 this.vel.y  = newVel;
            }
            else {
                this.vel.y = -this.maxDYMag;
            }
        }
        else {
            this.falling = !this.eman.scanDown(this);
            if (this.falling) {
                this.canJump = false;
            }
        }

        if (this.moveUp) {
            if (this.vel.y > -this.maxDYMag) {
                this.vel.y -= (this.maxDYMag / 30);
            }
            else {
                this.vel.y = -this.maxDYMag;
            }
        }
        else if (this.moveDown) {
            if (this.vel.y < this.maxDYMag) {
                this.vel.y += (this.maxDYMag / 30);
            }
            else {
                this.vel.y = this.maxDYMag;
            }
        }
        else if (this.stoppedVer) {
            if (this.vel.y > 0) {
                //moving Down
                this.vel.y -= (this.maxDYMag / 30);

                if (this.vel.y < (this.maxDYMag / 30)) {
                    this.vel.y = 0;
                    this.stoppedVer = false;
                }
            }
            else if (this.vel.y < 0) {
                //moving Up
                this.vel.y += (this.maxDYMag / 30);

                if (this.vel.y > (-this.maxDYMag / 30)) {
                    this.vel.y = 0;
                    this.stoppedVer = false;
                }
            }
        }

        //no gravity
        if (this.moveLeft) {
            if (this.vel.x > -this.maxDXMag) {
                this.vel.x -= (this.maxDXMag / 100);
            }
            else {
                this.vel.x = -this.maxDXMag;
            }
        }
        else if (this.moveRight) {
            if (this.vel.x < this.maxDXMag) {
                this.vel.x += (this.maxDXMag / 100);
            }
            else {
                this.vel.x = this.maxDXMag;
            }
        }
        else if (this.stoppedHor) {
            if (this.vel.x > 0) {
                //moving right
                this.vel.x -= (this.maxDXMag / 100);

                if (this.vel.x < (this.maxDXMag / 100)) {
                    this.vel.x = 0;
                    this.stoppedHor = false;
                }
            }
            else if (this.vel.x < 0) {
                //moving left
                this.vel.x += (this.maxDXMag / 100);

                if (this.vel.x > (-this.maxDXMag / 100)) {
                    this.vel.x = 0;
                    this.stoppedHor = false;
                }
            }
        }

        //block coordinates
        if (this.blocked) {
            //TODO make configurable
            if (this.pos.x < -0.7) {
                this.pos.x = -0.695;
                this.moveLeft = false;
                this.moveRight = false;
                this.stoppedHor = false;
                this.vel.x = 0;
            }
            else if (this.pos.x + this.width > 0.75) {
                this.pos.x = 0.745 - this.width;
                this.moveLeft = false;
                this.moveRight = false;
                this.stoppedHor = false;
                this.vel.x = 0;
            }

            if (this.pos.y < -0.85) {
                this.pos.y = -0.8;
                this.moveUp = false;
                this.moveDown = false;
                this.stoppedVer = false;
                this.vel.y = 0;
            }
            else if (this.pos.y + this.height > 0.85) {
                this.pos.y = 0.8 - this.height;
                this.moveUp = false;
                this.moveDown = false;
                this.stoppedVer = false;
                this.vel.y = 0;
            }
        }
    };

    this.jump = function(power) {
        if (this.canJump) {
            this.sman.playSound("jump");
            this.jumping = true;
            if (this.jumpCount > 1) {
                this.vel.Y *= 1.5;
            }
            else {
                this.vel.y = this.maxDYMag * ((power * 0.95) / 100);
                this.lastJumpTime = Date.now();
                this.canJump = false;
            }

            this.jumpCount++;
        }
    };

    this.land = function(yPos) {
        // this.sman.playSound("land");
        this.jumping = false;
        this.jumpCalls = 0;
        this.falling = false;
        this.vel.y = 0;
        this.pos.y = yPos;
        this.canJump = true;
        this.jumpCount = 0;
    };

    this.tick = function() {
        //TODO inheritable update for entities, extra processing in the loop
        //allows prototypal usage of update basic as well as overriding as well as "adding on top"
    };

	this.move = function(delta) {
		this.pos.x += (this.vel.x * delta) / 100;
        this.pos.y += (this.vel.y * delta) / 100;
	};

    this.die = function() {
        this.destroy();
    };

	this.rotate = function(angle) {
		this.rotation += angle;
	};

    this.visualScale = function(scale) {
        this.scaler = scale;
    };

	this.scale = function(scale) {
        this.width = this.origWidth * (scale.x >= 1 ? scale.x : 1);
        this.height = this.origHeight * (scale.y >= 1 ? scale.y : 1);

        //TODO PREP for new dimensional system
	};

    this.dealDamage = function(damage) {
        this.health -= damage;
    };

	this.destroy = function() {
		this.eman.removeEnt(this);
	};

	this.getVerts = function() {
        this.scaler = 1;
        this.center.x = (this.pos.x + (this.pos.x + this.width)) / 2;
        this.center.y = (this.pos.y + (this.pos.y + this.height)) / 2;
        //TODO use the below to make it configurable
        // return new Float32Array([
        //     this.pos.x, this.pos.y, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y,
        //     this.pos.x + this.width, this.pos.y, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y,
        //     this.pos.x + this.width, this.pos.y + this.height, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y,

        //     this.pos.x + this.width, this.pos.y + this.height, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y,
        //     this.pos.x, this.pos.y + this.height, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y,
        //     this.pos.x, this.pos.y, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y
        // ]);
        return new Float32Array([
            this.pos.x, this.pos.y, this.u1, this.v1, this.rotation, this.scaler, this.center.x, this.center.y,
            this.pos.x + this.width, this.pos.y, this.u2, this.v1, this.rotation, this.scaler, this.center.x, this.center.y,
            this.pos.x + this.width, this.pos.y + this.height, this.u2, this.v2, this.rotation, this.scaler, this.center.x, this.center.y,

            this.pos.x + this.width, this.pos.y + this.height, this.u2, this.v2, this.rotation, this.scaler, this.center.x, this.center.y,
            this.pos.x, this.pos.y + this.height, this.u1, this.v2, this.rotation, this.scaler, this.center.x, this.center.y,
            this.pos.x, this.pos.y, this.u1, this.v1, this.rotation, this.scaler, this.center.x, this.center.y
        ]);
	};

	this.moveHor = function(dir) {
		switch (dir) {
            case 0:
                this.stoppedHor = true;
                this.moveLeft = false;
                this.moveRight = false;
                break;
            case -1:
                this.moveLeft = true;
                this.moveRight = false;
                this.stoppedHor = false;
                break;
            case 1:
                this.moveRight = true;
                this.moveLeft = false;
                this.stoppedHor = false;
                break;
        }
	};

	this.moveVer = function(dir) {
		switch (dir) {
            case 0:
                this.stoppedVer = true;
                this.moveUp = false;
                this.moveDown = false;
                break;
            case -1:
                this.moveDown = true;
                this.moveUp = false;
                this.stoppedVer = false;
                break;
            case 1:
                this.moveUp = true;
                this.moveDown = false;
                this.stoppedVer = false;
                break;
        }
	};

    this.collidedWithEnt = function(e) {return;};
    this.collidedWithLvl = function(p) {return;};
};;var EntityManager = function(game) {
    //TODO make this and the level manager configurable; no assuming textures etc
    this.ents = [];
    this.renderer = game.renderer;
    this.lman = game.lman;
    this.sman = game.sman
	this.removeList = [];
	this.addList = [];
	this.verts = [];
    this.renderSettings = new RendererSettings();

    var texPos = -1;
    while (texPos < 0) {
        texPos = this.renderer.createTexture('ent', 'res/img/ent.png');
    }
    var frag = _getFragShader('2d-textured');
    var vert = _getVertShader('2d-transform-textured');
    this.renderer.addShaderProgram('entProgram', [vert, frag]);

    this.shaderProgram = 'entProgram';
    this.vbo = this.renderer.addVBO('entVBO');

    this.renderSettings.addAttribute('pos', 2);
    this.renderSettings.addAttribute('texCoord', 2);
    this.renderSettings.addAttribute('angle', 1);
    this.renderSettings.addAttribute('scale', 1);
    this.renderSettings.addAttribute('centre', 2);
    this.renderSettings.addUniform("tex", texPos);
    this.renderSettings.setShape(gl.TRIANGLES);
    this.renderSettings.setTextureName("ent");

    this.verts = null;

	this.reset = function() {
        if (this.resetCoolDown) return;
		this.ents = [this.player];
		this.removeList = [];
		this.addList = [];
		this.verts = [];
	};

	this.checkEntCollision = function(e1, e2) {
		return (
            e1.pos.x < (e2.pos.x + e2.width) 
            &&
            (e1.pos.x + e1.width) > e2.pos.x
            &&
            e1.pos.y < (e2.pos.y + e2.height)
            && (e1.pos.y + e1.height) > e2.pos.y
        );
	};
    this.checkLvlCollision = function(e, p) {
        return (
            e.pos.x < (p.pos.x + p.width)
            &&
            (e.pos.x + e.width) > p.pos.x
            &&
            e.pos.y < (p.pos.y + p.height)
            &&
            (e.pos.y + e.height) > p.pos.y
        );
    };
    this.scanDown = function(e) {
        var t = new Entity(
            new Vec2(e.pos.x + (e.width / 4), e.pos.y - (e.height - 0.1)), 
            new Vec2(e.width / 2, 0.2),
                                    this, this.lman, this.sman);
        for (i = 0; i < this.lman.pieces.length; i++) {
            if (this.checkLvlCollision(t, this.lman.pieces[i])) {
                return true;
            }
        }
    };
    this.scanRight = function(e) {
        var t = new Entity(new Vec2(e.pos.x + (e.width - 0.1), e.pos.y + (e.height / 4)),
                    new Vec2(0.2, e.height / 2), 
                                            this, this.lman, this.sman);

        for (i = 0; i < this.lman.pieces.length; i++) {
            if (this.checkLvlCollision(t, this.lman.pieces[i])) {
                return true;
            }
        }
    }

    this.addPlayer = function(p) {
        //designed to be called on game init so ents list is empty
        this.player = p;
        this.addEnt(p);
    };
	this.addEnt = function(e) {
		this.addList.push(e);
	};
	this.removeEnt = function(e) {
		this.removeList.push(e);
	};
	this.addEntList = function(e) {
		for (var i = 0; i < e.length; i++) {
			this.addList.push(e[i]);
		}
	};
	this.removeEntList = function(e) {
		for (var i = 0; i < e.length; i++) {
			this.removeList.push(e[i]);
		}
	};

	this.addEnts = function() {
		for (var i = 0; i < this.addList.length; i++) {
            this.ents.push(this.addList[i]);
        }
        this.addList = [];
	};

	this.cleanEnts = function() {
		for (var i = 0; i < this.removeList.length; i++) {
            this.ents.splice(this.ents.indexOf(this.removeList[i]), 1);
        }
        this.removeList = [];

        if (this.ents.length == 0 && this.player.health > 0) {
            this.addEnt(this.player);
        }
	};

	this.render = function() {
        var renderer = this.renderer;

        var dataPerVert = 0;
        var vertSize = 0;
        for (var j = 0; j < this.ents.length; j++) {
            dataPerVert = this.ents[j].dataPerVert;
            vertSize += dataPerVert * this.ents[j].totalVerts;
        }

        this.verts = new Float32Array(vertSize);
        var off = 0;
        for (var i = 0; i < this.ents.length; i++) {
            if (this.ents[i].visible) {
                var newVerts = this.ents[i].getVerts();
                this.verts.set(newVerts, off);
                off += newVerts.length;
            }
        }
        renderer.addVerts("entVerts", this.verts, dataPerVert);
        renderer.bufferVertsToVBO('entVerts', 'lvlVBO');
        renderer.bindVBO('lvlVBO'); 
        this.renderer.bindVerts('entVerts');
        this.renderer.bindShaderProgram('entProgram');
        this.renderer.render2D(true, this.renderSettings);
	};

	this.update = function(delta) {
		for (var i = 0; i < this.ents.length; i++) {
            this.ents[i].update(delta);
            this.ents[i].tick();
            this.ents[i].move(delta);
        }

        var lvlPieces = this.lman.pieces;
        for (i = 0; i < this.ents.length; i++) {
            for (j = i + 1; j < this.ents.length; j++) {
                if (!this.ents[i].nocollideEnt && !this.ents[j].nocollideEnt) {
                    if (this.checkEntCollision(this.ents[i], this.ents[j])) {
                        this.ents[i].collidedWithEnt(this.ents[j]);
                        this.ents[j].collidedWithEnt(this.ents[i]);
                    }
                }
            }
            for (k = 0; k < lvlPieces.length; k++) {
                if (!lvlPieces[k].noCollideEnt && !this.ents[i].noCollideLvl) {
                    if (this.checkLvlCollision(this.ents[i], lvlPieces[k])) {
                        this.ents[i].collidedWithLvl(lvlPieces[k]);
                        lvlPieces[k].collidedWithEnt(this.ents[i]);
                    }
                }
            }
        }
        if (this.addList.length > 0) {
            this.addEnts();
        }
        if (this.removeList.length > 0) {
            this.cleanEnts();
        }
	};

    this.scaleAllEntities = function(scale) {
        for (var i = 0; i < this.ents.length; i++) {
            this.ents[i].scale(scale);
        }
    };
};;var LevelManager = function(game) {
    //TODO can likely get rid of this in favour of having level pieces just be entities
    //Other than this concern, similarities between level and entity are intentional

    //TODO make this and the entity manager configurable; no assuming textures etc
    this.pieces = [];
    this.removeList = [];
    this.addList = [];
    this.renderer = game.renderer;
    this.renderSettings = new RendererSettings();

    var texPos = -1;
    while (texPos < 0) {
        texPos = this.renderer.createTexture('lvl', 'res/img/lvl.png');
    }
    var frag = _getFragShader('2d-textured');
    var vert = _getVertShader('2d-transform-textured');
    this.renderer.addShaderProgram('lvlProgram', [vert, frag]);

    this.shaderProgram = 'lvlProgram';
    this.vbo = this.renderer.addVBO('lvlVBO');

    this.renderSettings.addAttribute('pos', 2);
    this.renderSettings.addAttribute('texCoord', 2);
    this.renderSettings.addAttribute('angle', 1);
    this.renderSettings.addAttribute('scale', 1);
    this.renderSettings.addAttribute('centre', 2);
    this.renderSettings.addUniform("tex", texPos);
    this.renderSettings.setShape(gl.TRIANGLES);
    this.renderSettings.setTextureName("lvl");

    this.verts = null;

    this.reset = function() {
        this.pieces = [];
        this.removeList = [];
        this.addList = [];
        this.verts = [];
    };
    this.addPiece = function(p) {
        this.addList.push(p);
    };
    this.removePiece = function(p) {
        this.removeList.push(p);
    };
    this.addPieceList = function(p) {
        for (var i = 0; i < p.length; i++) {
            this.addList.push(p[i]);
        }
    };
    this.removePieceList = function(p) {
        for (var i = 0; i < p.length; i++) {
            this.removeList.push(p[i]);
        }
    };

    this.addPieces = function() {
        for (var i = 0; i < this.addList.length; i++) {
            this.pieces.push(this.addList[i]);
        }
        this.addList = [];
    };

    this.cleanPieces = function() {
        for (var i = 0; i < this.removeList.length; i++) {
            this.pieces.splice(this.pieces.indexOf(this.removeList[i]), 1);
        }
        this.removeList = [];
    };

    this.render = function() {
        var renderer = this.renderer;

        var dataPerVert = 0;
        var vertSize = 0;
        for (var j = 0; j < this.pieces.length; j++) {
            dataPerVert = this.pieces[j].dataPerVert;
            vertSize += dataPerVert * this.pieces[j].totalVerts;
        }

        this.verts = new Float32Array(vertSize);
        var off = 0;
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].visible) {
                var newVerts = this.pieces[i].getVerts();
                this.verts.set(newVerts, off);
                off += newVerts.length;
            }
        }
        renderer.addVerts("lvlVerts", this.verts, dataPerVert)
        renderer.bufferVertsToVBO('lvlVerts', 'lvlVBO');
        renderer.bindVBO('lvlVBO'); 
        this.renderer.bindVerts('lvlVerts');
        this.renderer.bindShaderProgram('lvlProgram');
        this.renderer.render2D(true, this.renderSettings);
    };

    this.update = function(delta) {
        for (var i = 0; i < this.pieces.length; i++) {
            this.pieces[i].update(delta);
            this.pieces[i].tick();
            this.pieces[i].move(delta);
        }
        
        if (this.addList.length > 0) {
            this.addPieces();
        }
        if (this.removeList.length > 0) {
            this.cleanPieces();
        }
    };

    this.scaleAllLevelPieces = function(scale) {
        for (var i = 0; i < this.pieces.length; i++) {
            this.pieces[i].scale(scale);
        }
    };
};;var LevelPiece = function(pos, dimensions, game) {
    Entity.prototype.constructor.call(this, pos, dimensions, game);
};;var Renderer = function() {

    //TODO need a better way of rendering; non-dependant on knowing which vars are in the shader program
    //  - that should be the application's job, or at least the job of the relevant Manager
    //Ideally, there should be two rendering methods - 2D and 3D. Everything therin variable and controllable from
    //  the outside
    this.canvas;
    this.gl;
    this.vbos = {};
    this.verts = {};
    this.shaderPrograms = {};
    this.uniforms = {};
    this.activeVBO;
    this.activeVerts;
    this.activeShaderProgram;
    this.projectionMatrix = mat4.create();
    this.projectionMatrix = mat4.perspective(this.projectionMatrix, Math.PI / 4, 640 / 480, 1, 10);
    this.modelMatrix = mat4.create();
    this.viewMatrix = mat4.identity(mat4.create());
    mat4.translate(this.viewMatrix, this.viewMatrix, [0, 0, -4]);
    mat4.lookAt(this.modelMatrix, [0, 0, 0], [0, 0, -4.5], [0, 1, 0]); //TODO optional

    this.verts['BASIC'] = {'dataPerVert':5, 'array':new Float32Array([
        -0.5, -0.5, 0, 0, 1,
        0.5, -0.5, 0, 1, 0,
        0.5, 0.5, 1, 0, 0,

        0.5, 0.5, 0, 1, 1,
        -0.5, 0.5, 1, 1, 0,
        -0.5, -0.5, 1, 1, 1
    ])};

    /* Initialise canvas + glContext */
    this.canvas = document.getElementById('gameCanvas');
    this.canvas.width = 640;
    this.canvas.height = 480;

    try {
        gl = this.canvas.getContext("webgl");
        gl.viewportWidth = this.canvas.width;
        gl.viewportHeight = this.canvas.height;
    } catch (e) {
        alert("Could not initialise WebGL - Error: \n" + e);
        return false;
    }
    if (!gl) {
        alert("Could not initialise WebGL");
        return false;
    }

    /* Initialise shaders with passthroughs */
    this.shaderPrograms['BASIC'] = this.createShaderProgram(gl, _getVertShader('pass-through'), _getFragShader('pass-through'));
    if (!this.shaderPrograms['BASIC']) {
        alert('Failed to create shader program named BASIC');
        return false;
    }
    this.activeShaderProgram = this.shaderPrograms['BASIC'];

    /* Initialise vertex buffer objects + basic data (square)*/
    this.activeVerts = this.verts['BASIC'];
    this.vbos['BASIC'] = gl.createBuffer();
    this.activeVBO = this.vbos['BASIC'];
    gl.bindBuffer(gl.ARRAY_BUFFER, this.activeVBO);
    gl.bufferData(gl.ARRAY_BUFFER, this.activeVerts.array, gl.DYNAMIC_DRAW);
    var posAttrib = gl.getAttribLocation(this.activeShaderProgram, 'pos');
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 0);
    var colAttrib = gl.getAttribLocation(this.activeShaderProgram, 'col');
    gl.enableVertexAttribArray(colAttrib);
    gl.vertexAttribPointer(colAttrib, 3, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 2 * 4);

    //initialise texture capabilities
    this.textureIdentifiers = [
        gl.TEXTURE0,
        gl.TEXTURE1,
        gl.TEXTURE2
    ];
    this.textures = {};

    return true;
};

var handleTextureLoaded = function(image, texture, ident) {
    gl.activeTexture(ident);
    //gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
};

Renderer.prototype.createTexture = function(name, src) {
    var ident = this.textureIdentifiers[Object.keys(this.textures).length];
    var tex = gl.createTexture();
    var image = new Image();
    image.onload = function() {handleTextureLoaded(image, tex, ident);};
    this.textures[name] = {'ident': ident, 'tex': tex};
    image.src = src;

    // return the gl texture position of the created texture
    return Object.keys(this.textures).length - 1;
};

Renderer.prototype.addVerts = function(name, vertArray, dataPerVert) {
    this.verts[name] = {'dataPerVert':dataPerVert, 'array':new Float32Array(vertArray)};
};

Renderer.prototype.addVBO = function(name) {
    this.vbos[name] = gl.createBuffer();
};

Renderer.prototype.bufferVertsToVBO = function(vertName, vboName) {
    var prevBuffer = this.activeVBO;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbos[vboName]);
    gl.bufferData(gl.ARRAY_BUFFER, this.verts[vertName].array, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, prevBuffer);
};

Renderer.prototype.bindVBO = function(name) {
    this.activeVBO = this.vbos[name];
};

Renderer.prototype.bindVerts = function(name) {
    this.activeVerts = this.verts[name];
};

Renderer.prototype.bindShaderProgram = function(name) {
    this.activeShaderProgram = this.shaderPrograms[name];
};

Renderer.prototype.addShaderProgram = function(name, shaders) {
    /* Usage:
        in application, _get[Vert|Frag]Shader(String <name>) to get your shaders from vert and frag shaders
        compile them into an array EG [VERT_SHADER, FRAG_SHADER, ...others]
        pass that array into this function to create a new shader program with a given name
     */
    //TODO the splice may be incorrect
    this.shaderPrograms[name] = this.createShaderProgram(gl, shaders[0], shaders[1], shaders.splice(2, shaders.length));
    if (!this.shaderPrograms[name]) {
        alert("Could not create shader program named " + name);
    }
};
Renderer.prototype.getShaderProgram = function(name) {
    return this.shaderPrograms[name];
};

Renderer.prototype.createShaderProgram = function(gl, vshader, fshader, extras) {
    var vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, fshader);
    //TODO extras

    if (!vertexShader || !fragmentShader) {
        return null;
    }
    var program = gl.createProgram();
    if (!program) {
        return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = gl.getProgramInfoLog(program);
        alert('Failed to link program: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    return program;
};

Renderer.prototype.compileShader = function(gl, type, source) {
    var shader = gl.createShader(type);
    if (shader == null) {
        alert('unable to create shader');
        return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        alert('Failed to compile shader: ' + error);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
};

Renderer.prototype.clearScreen = function(col, depth) {
    gl.clearColor(col.x, col.y, col.z, 1.0);
    if (depth) {
        gl.clear(gl.DEPTH_BUFFER_BIT);
    }
    else {
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
};

Renderer.prototype.render2D = function(rebuffer, settings) {
    gl.disable(gl.DEPTH_TEST);

    if (settings.textureName !== null) {
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.activeTexture(this.textures[settings.textureName].ident);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[settings.textureName].tex);
    }
    else {
        gl.disable(gl.BLEND);
    }

    gl.useProgram(this.activeShaderProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.activeVBO);

    if (rebuffer) {
        gl.bufferData(gl.ARRAY_BUFFER, this.activeVerts.array, gl.DYNAMIC_DRAW);
        var off = 0;

        for (var i = 0; i < settings.attributes.length; i++) {
            var attrib = settings.attributes[i];
            var attribLoc = gl.getAttribLocation(this.activeShaderProgram, attrib.name);
            gl.enableVertexAttribArray(attribLoc);
            gl.vertexAttribPointer(attribLoc, attrib.length, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, off);

            off += (attrib.length * 4);
        }
    }

    for (var j = 0; j < settings.uniforms.length; j++) {
        var name = settings.uniforms[j].name;
        var value = settings.uniforms[j].val;
        gl.uniform1i(gl.getUniformLocation(this.activeShaderProgram, name), value); //TODO currently assumes all uniforms are of type 1i
    }

    gl.drawArrays(settings.shape, 0, this.activeVerts.array.length / this.activeVerts.dataPerVert);
};

Renderer.prototype.render3D = function(rebuffer) {
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.useProgram(this.activeShaderProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.activeVBO);

    var pMatrixUniformLoc = gl.getUniformLocation(this.activeShaderProgram, 'projectionMatrix');
    var mMatrixUniformLoc = gl.getUniformLocation(this.activeShaderProgram, 'modelMatrix');
    var vMatrixUniformLoc = gl.getUniformLocation(this.activeShaderProgram, 'viewMatrix');

    gl.uniformMatrix4fv(pMatrixUniformLoc, false, this.projectionMatrix);
    gl.uniformMatrix4fv(mMatrixUniformLoc, false, this.modelMatrix);
    gl.uniformMatrix4fv(vMatrixUniformLoc, false, this.viewMatrix);

    if (rebuffer) {
        var posAttrib = gl.getAttribLocation(this.activeShaderProgram, 'pos');
        gl.enableVertexAttribArray(posAttrib);
        gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 0);
        var colAttrib = gl.getAttribLocation(this.activeShaderProgram, 'col');
        gl.enableVertexAttribArray(colAttrib);
        gl.vertexAttribPointer(colAttrib, 3, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 3 * 4);
    }
    gl.drawArrays(gl.TRIANGLES, 0, this.activeVerts.array.length / this.activeVerts.dataPerVert);
};;var RendererSettings = function() {
    this.attributes = [];
    this.uniforms = [];
    this.shape = gl.TRIANGLES;
    this.textures = [];
};
RendererSettings.prototype.addAttribute = function(name, length) {
    this.attributes.push({'name': name, 'length': length});
};
RendererSettings.prototype.addUniform = function(name, val) {
    this.uniforms.push({'name': name, 'val': val});
};
RendererSettings.prototype.setShape = function(shape) {
    this.shape = shape;
};
RendererSettings.prototype.setTextureName = function(name) {
    this.textureName = name;
};;var fragShaders = {};
fragShaders['pass-through'] =
    'precision mediump float;' +
    'varying vec3 Col;' +
    'void main() {' +
    '    gl_FragColor = vec4(Col, 1.0);' +
    '}'
;
fragShaders['2d-textured'] =
    'precision mediump float;' +
    'varying vec2 TexCoord;' +
    'uniform sampler2D tex;' +
    'void main() {' +
    '    gl_FragColor = texture2D(tex, TexCoord);' +
    '}'
;


var _addFragShader = function(name, src) {
    fragshaders[name] = src;
};

var _getFragShader = function(name) {
    return fragShaders[name];
};;var vertShaders = {};
vertShaders['pass-through'] =
    'attribute vec2 pos;' +
    'attribute vec3 col;' +
    'varying vec3 Col;' +
    'void main() {' +
    '    Col = col;' +
    '    gl_Position = vec4(pos, 1.0, 1.0);' +
    '}'
;
vertShaders['3d'] =
    'attribute vec3 pos;' +
    'attribute vec3 col;' +
    'uniform mat4 modelMatrix;' +
    'uniform mat4 viewMatrix;' +
    'uniform mat4 projectionMatrix;' +
    'varying vec3 Col;' +
    'void main(void) {' +
    '   Col = col;' +
    '   gl_Position =  projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);' +
    '}'
;
vertShaders['3d-textured'] =
    'attribute vec2 pos;' +
    'attribute vec3 col;' +
    'attribute vec2 texCoord;' +
    'uniform mat4 modelViewMatrix;' +
    'uniform mat4 projectionMatrix;' +
    'varying vec3 Col;' +
    'varying vec2 TexCoord;' +
    'void main(void) {' +
    '   Col = col;' +
    '   TexCoord = texCoord;' +
    '   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);' +
    '}'
;
vertShaders['2d-transform-textured'] =
    'attribute vec2 pos;' +
    'attribute vec2 texCoord;' +
    'attribute float angle;' +
    'attribute float scale;' +
    'attribute vec2 centre;' +
    'varying vec2 TexCoord;' +
    'void main() {' +
    '	 TexCoord = texCoord;' +
    '	 mat4 rot = mat4(cos(angle) * scale, -sin(angle), 0.0, 0.0, sin(angle), cos(angle) * scale, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '	 mat4 tr = mat4(1.0, 0.0, 0.0, centre.x, 0.0, 1.0, 0.0, centre.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '   mat4 tr1 = mat4(1.0, 0.0, 0.0, -centre.x, 0.0, 1.0, 0.0, -centre.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '   gl_Position = vec4(pos, 1.0, 1.0) * tr1 * rot * tr;' +
    '}';
;
vertShaders['2d-transform-color'] =
    'attribute vec2 pos;' +
    'attribute vec3 col;' +
    'attribute float angle;' +
    'attribute float scale;' +
    'attribute vec2 centre;' +
    'varying vec3 Col;' +
    'void main() {' +
    '   Col = col;' +
    '	mat4 rot = mat4(cos(angle) * scale, -sin(angle), 0.0, 0.0, sin(angle), cos(angle) * scale, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '	mat4 tr = mat4(1.0, 0.0, 0.0, centre.x, 0.0, 1.0, 0.0, centre.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '   mat4 tr1 = mat4(1.0, 0.0, 0.0, -centre.x, 0.0, 1.0, 0.0, -centre.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '   gl_Position = vec4(pos, 1.0, 1.0) * tr1 * rot * tr;' +
    '}'
;

var _addVertShader = function(name, src) {
    vertShaders[name] = src;
};

var _getVertShader = function(name) {
    return vertShaders[name];
};;var KeyCodes = function() {
    //Characters;
    this.q = 81;
    this.w = 87;
    this.e = 69;
    this.r = 82;
    this.t = 84;
    this.y = 89;
    this.u = 85;
    this.i = 73;
    this.o = 79;
    this.p = 80;
    this.a = 65;
    this.s = 83;
    this.d = 68;
    this.f = 70;
    this.g = 71;
    this.h = 72;
    this.j = 74;
    this.k = 75;
    this.l = 76;
    this.z = 90;
    this.x = 88;
    this.c = 67;
    this.v = 86;
    this.b = 66;
    this.n = 78;
    this.m = 77;

    
    //Numbers
    this.num1 = 49;
    this.num2 = 50;
    this.num3 = 51;
    this.num4 = 52;
    this.num5 = 53;
    this.num6 = 54;
    this.num7 = 55;
    this.num8 = 56;
    this.num9 = 57;
    this.num0 = 48;
    
    //Numpad
    this.numPad8 = 38;
    this.numPad4 = 37;
    this.numPad6 = 39;
    this.numPad5 = 12;
    
    //arrows
    this.leftArrow = 37;
    this.rightArrow = 39;
    this.upArrow = 38;
    this.downArrow = 40;
    
    //Misc
    this.space = 32;
    this.enter = 13;
    this.leftShift = 16;
    this.rightShift = 16;
    this.leftCtrl = 17;
    this.rightCtrl = 17;
    this.esc = 27;
    this.f5 = 116;
    this.f12 = 123;
};;var State = function(name) {
    this.name = name;
    this.func = null;
    this.funcArgs = null;
};

State.prototype.tick = function() {
    if (this.func == null) {
        alert("borked");
        return;
    }

    this.func.apply(this, this.funcArgs);
    window.requestAnimationFrame(window.game.run);
};

State.prototype.setFunc = function(func) {
    this.func = func;
    this.funcArgs = Array.prototype.slice.call(arguments, 1);

};

State.prototype.getName = function() {
    return this.name;
};;var TextUtils = function(renderer) {
	//Used to initialise the application's font (as a texture)
	//Font file is loaded in by webglrenderer, the configuration here is untied to that process or resource
	//so it's generic
	//Expects that the texture loaded in to represent font;
	//  contains only the characters defined in the charSet array
	//  contains the characters arranged in a 1-dimensional array (a row) in the order defined in the charSet array

	//Usage:
	//  initialise object and call setUpFont in app init
	//  Use "add string" to define a new charSequence at the given origin point
	//  Before rendering, call "prepareForRendering" to convert string literals into lists of UV coordinates for OpenGL
	//  To render, call webglrenderer.renderText(), passing it the result of [this].getVerts()
	//  THIS MANAGER CLEANS AFTER RENDERING, SO IT ONLY EVER CONTAINS OR PROCESSES THIS FRAME'S TEXT

    this.renderer = renderer;

   	var texPos = -1;
   	while (texPos < 0) {
		texPos = this.renderer.createTexture('font', 'res/img/font.png');
   	}

    var frag = _getFragShader('2d-textured');
    var vert = _getVertShader('2d-transform-textured');
    renderer.addShaderProgram('textProgram', [vert, frag]);

    this.shaderProgram = 'textProgram';
    this.vbo = renderer.addVBO('textVBO');

	this.renderSettings = new RendererSettings();
	this.renderSettings.addAttribute('pos', 2);
	this.renderSettings.addAttribute('texCoord', 2);
	this.renderSettings.addAttribute('angle', 1);
	this.renderSettings.addAttribute('scale', 1);
	this.renderSettings.addAttribute('centre', 2);
	this.renderSettings.addUniform('tex', texPos);
	this.renderSettings.setTextureName('font');
	this.renderSettings.setShape(gl.TRIANGLES);

	//var posAttrib = gl.getAttribLocation(this.activeShaderProgram, 'pos');
	//gl.enableVertexAttribArray(posAttrib);
	//gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 0);
	//var texCoordAttrib = gl.getAttribLocation(this.activeShaderProgram, 'texCoord');
	//gl.enableVertexAttribArray(texCoordAttrib);
	//gl.vertexAttribPointer(texCoordAttrib, 2, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 2 * 4);
	//var angleAttrib = gl.getAttribLocation(this.activeShaderProgram, 'angle');
	//gl.enableVertexAttribArray(angleAttrib);
	//gl.vertexAttribPointer(angleAttrib, 1, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 4 * 4);
	//var scaleAttrib = gl.getAttribLocation(this.activeShaderProgram, 'scale');
	//gl.enableVertexAttribArray(scaleAttrib);
	//gl.vertexAttribPointer(scaleAttrib, 1, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 5 * 4);
	//var centreAttrib = gl.getAttribLocation(this.activeShaderProgram, 'centre');
	//gl.enableVertexAttribArray(centreAttrib);
	//gl.vertexAttribPointer(centreAttrib, 2, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 6 * 4);

	this.uvMap = {};
	this.strings = [];
	this.nextIndex = 0;
	this.charSet = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		'{', '}', '$', '&', '/', '?', '@', '\\', '[', ']', '|', '!', ';', '+', '*', '<', '>', '=', '^', ' '
					];
	this.charCount = this.charSet.length;
	this.charSize = 1 / this.charCount;

	this.init = function() {
		var preservedStrings = [];
		for (var i = 0; i < this.strings.length; i++) {
			if (this.strings[i].keep && this.strings[i].keepCount < 120) {
				preservedStrings.push(this.strings[i]);
				this.strings[i].keepCount += 1;
			}
		}
		this.strings = preservedStrings;
		this.nextIndex = this.strings.length;
	};

	this.setUpFont = function() {
		for (var i = 0; i < this.charCount; i++) {
			this.uvMap[this.charSet[i]] = {u1: i * this.charSize, u2: i * this.charSize + this.charSize, v1: 1, v2: 0};
		}
	}

	this.addString = function(charSequence, size, pos, preserve) {
		this.strings[this.nextIndex] = {text: charSequence, fontSize: size, x: pos.x, y: pos.y, keep: preserve};
		if (preserve) this.strings[this.nextIndex] = {text: charSequence, fontSize: size, x: pos.x, y: pos.y, keep: preserve, keepCount: 0};
		this.nextIndex++;
	};

	this.convertString = function(stringObj) {
        var uvList = [];
        for (var i = 0; i < stringObj.text.length; i++) {
            uvList[i] = this.uvMap[stringObj.text[i].toUpperCase()];
        }
        return uvList;
    };

	this.prepareForRendering = function() {
		this.transformedStrings = [];
		for (var i = 0; i < this.strings.length; i++) {
			var stringObj = this.strings[i];
			this.transformedStrings.push(this.convertString(stringObj));
		}
	};

	this.getVerts = function() {
		var verts = [];
		for (var i = 0; i < this.transformedStrings.length; i++) {
			var startPoint = new Vec2(this.strings[i].x, this.strings[i].y);
			var tempVerts = [];
			for (var j = 0; j < this.strings[i].text.length; j++) {
				tempVerts.push([
					startPoint.x + (this.strings[i].fontSize * j), startPoint.y, this.transformedStrings[i][j].u1, this.transformedStrings[i][j].v1, 0, 1, 0, 0,
					startPoint.x + (this.strings[i].fontSize * j) + this.strings[i].fontSize, startPoint.y, this.transformedStrings[i][j].u2, this.transformedStrings[i][j].v1, 0, 1, 0, 0,
					startPoint.x + (this.strings[i].fontSize * j) + this.strings[i].fontSize, startPoint.y + this.strings[i].fontSize, this.transformedStrings[i][j].u2, this.transformedStrings[i][j].v2, 0, 1, 0, 0,

					startPoint.x + (this.strings[i].fontSize * j) + this.strings[i].fontSize, startPoint.y + this.strings[i].fontSize, this.transformedStrings[i][j].u2, this.transformedStrings[i][j].v2, 0, 1, 0, 0,
					startPoint.x + (this.strings[i].fontSize * j), startPoint.y + this.strings[i].fontSize, this.transformedStrings[i][j].u1, this.transformedStrings[i][j].v2, 0, 1, 0, 0,
					startPoint.x + (this.strings[i].fontSize * j), startPoint.y, this.transformedStrings[i][j].u1, this.transformedStrings[i][j].v1, 0, 1, 0, 0
						        ]);
			}
			for (var k = 0; k < tempVerts.length; k++) {
				for (var l = 0; l < tempVerts[k].length; l++) {
					verts.push(tempVerts[k][l]);
				}
            }
		}
		var vertFloat32 = new Float32Array(verts.length);
		vertFloat32.set(verts, 0);
		return vertFloat32;
	};

	this.render = function() {
		if (this.strings.length == 0) {
			return;
		}

		this.prepareForRendering();
        this.renderer.addVerts('textVerts', this.getVerts(), 8);
        this.renderer.bufferVertsToVBO('textVerts', 'textVBO');
        this.renderer.bindVBO('textVBO');
        this.renderer.bindShaderProgram(this.shaderProgram);
        this.renderer.bindVerts('textVerts');

        this.renderer.render2D(true, this.renderSettings);
		this.init();
	}
};;var Mat3 = function(x, y, value) {
	this.val = value ? value :  [
								 1, 0, 0,
			 					 0, 1, 0,
			 					 x, y, 1
			  					];
};

Mat3.prototype.translate = function(x, y) {
	this.val[6] += x;
	this.val[7] += y;
};

var Vec2 = function(x, y) {
    this.x = x;
    this.y = y;
};

Vec2.prototype.mag = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vec2.prototype.normalize = function() {
	var mag = this.mag();
	return new Vec2(this.x / mag, this.y / mag);
}

var Vec3 = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

Mat3.prototype.makeRotation = function(angle) {
	var c = Math.cos(angle);
  	var s = Math.sin(angle);

  	this.val[0] = c;
  	this.val[1] = -s;
  	this.val[3] = s;
  	this.val[4] = c;
};

Mat3.prototype.scale = function(x, y) {
	this.val[0] += x;
	this.val[4] += y;
};

function matrixMultiply(m1, m2) {
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
}

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
};;var init = function() {
    //Construct the Abstract Game object, setting its width and height
    var game = new Game(640, 480);

    //STEP 1: define game initial attributes in dictionary
    var gameData = {
        "ents": [],
        "points": 0,
        "level": null
    };

    //STEP 2: define which attributes should reinitialise on game reset
    var gameReinitData = {
        "ents": [],
        "points": 0,
        "level": null
    };

    //STEP 3: define game init function
    ///this refers to game since this method will be injected
    var initFunc = function() {
        this.loadAttributes(this.initData);
        this.initManagers();
        this.sman.addSound("coin-chunkpass", "res/snd/coin.wav");

        this.textUtils.init();
        this.textUtils.setUpFont();

        this.eman.addPlayer(new Player(new Vec2(-0.8, 0.5), this)); //TODO

        this.level = new Level(this); //TODO
    };

    ///STEP 4: define game reinit function
    //this refers to game since this method will be injected
    var reinitFunc = function() {
        this.loadAttributes(this.reinitData);
        this.initManagers();
        this.sman.addSound("coin-chunkpass", "res/snd/coin.wav");

        this.textUtils.init();
        this.textUtils.setUpFont();
        
        this.eman.addPlayer(new Player(new Vec2(-0.5, 0.5), this)); //TODO

        this.level = new Level(this); //TODO
        this.activeState("menu");
    }

    //STEP 6: attach init and reinit data to the Game object
    game.addAttr("initData", gameData);
    game.addAttr("reinitData", gameReinitData);

    //STEP 7: attach init func and reinit func to Game object
    game.addMethod("initFunc", initFunc);
    game.addMethod("reinitFunc", reinitFunc);

    //STEP 8: define global utility methods for Game
    //this refers to game since this method will be injected
    var addPoints = function(p) {
        this.points += p;
    };

    ///STEP 9: attach utility methods to Game object by name
    game.addMethod("addPoints", addPoints);

    //STEP 10: define Game State function bodies describing the frame of each state
    //a state function can take any number of params as long as denoted in assignment to Game
    ///for this simple game, just passing the Game object
    var menuFunc = function(args) {
        var game = args[0];
        game.renderer.clearScreen(new Vec3(0, 0, 0), false);

        game.textUtils.addString("Crappy Font Simulator", 0.125, new Vec2(-0.98, 0.75), false);
        game.textUtils.addString("ProtoGL Demo", 0.115, new Vec2(-0.98, 0.5), false);
        game.textUtils.addString("Space to Start", 0.095, new Vec2(-0.98, 0.3), false);


        if (window.keys.indexOf(game.keyCodes.space) > -1 && !game.menuTimeout) {
            game.activeState("game");
        }

        game.eman.render();
        game.lman.render();
        game.eman.update(game.delta);
        game.lman.update(game.delta);
        game.textUtils.render();
    };

    var gameFunc = function(args) {
        var game = args[0];
        var player = game.eman.player;

        game.renderer.clearScreen(new Vec3(0, 0, 0), false);
        game.textUtils.addString("Points " + game.points, 0.1, new Vec2(-0.98, 0.85), false);

        if (window.keys.indexOf(game.keyCodes.w) > -1) {
            // game.eman.player.jump(90);
        }

        if (window.keys.indexOf(game.keyCodes.a) > -1) {
            // game.eman.player.moveHor(-1);
        }
        else if (window.keys.indexOf(game.keyCodes.d) > -1) {
            // game.eman.player.moveHor(1);
        }
        else {
            // game.eman.player.moveHor(0);
        }

        if (window.keys.indexOf(game.keyCodes.space) > -1) {
            // game.eman.player.slowDescent();
        }
        else {
            // game.eman.player.resetDescent();
        }

        if (game.eman.player.dead) {
            game.activeState("dead");
        }

        if (window.keys.indexOf(game.keyCodes.p) > -1) {
            game.activeState("pause");
        }

        game.eman.render();
        game.lman.render();
        game.lman.update(game.delta);
        game.level.update(game.delta);
        game.eman.update(game.delta);
        game.textUtils.render();
    };

    var pauseFunc = function(args) {
        var game = args[0];
        game.renderer.clearScreen(new Vec3(0, 0, 0), false);

        game.textUtils.addString("Paused", 0.125, new Vec2(-0.98, 0.8), false);
        game.textUtils.addString("Space to resume", 0.1, new Vec2(-0.98, 0.65), false);

        if (window.keys.indexOf(game.keyCodes.space) > -1) {
            game.activeState("game");
        }

        game.eman.render();
        game.lman.render();
        game.textUtils.render();
    };

    var deadFunc = function(args) {
        var game = args[0];
        game.renderer.clearScreen(new Vec3(0, 0, 0), false);

        game.textUtils.addString("Points " + game.points, 0.1, new Vec2(-0.98, 0.85), false);
        game.textUtils.addString("DEAD", 0.1, new Vec2(-0.98, 0.7), false);
        game.textUtils.addString("Space to restart", 0.1, new Vec2(-0.98, 0.5), false);

        game.eman.render();
        game.lman.render();
        game.textUtils.render();

        if (window.keys.indexOf(game.keyCodes.space) > -1) {
            game.reinit();
        }
    };

    //STEP 11: construct States with names and function bodies
    var menuState = new State("menu");
    var gameState = new State("game");
    var pauseState = new State("pause");
    var deadState = new State("dead");
    menuState.setFunc(menuFunc, [game]);
    gameState.setFunc(gameFunc, [game]);
    pauseState.setFunc(pauseFunc, [game]);
    deadState.setFunc(deadFunc, [game]);

    //STEP 12: attach States to Game object
    game.addState(menuState);
    game.addState(gameState);
    game.addState(deadState);
    game.addState(pauseState);

    //STEP 13: choose an initially active state
    game.activeState("menu");

    //STEP 14: start the game
    game.start();
};;var Player = function(pos, game) {
    this.game = game;

    var dimensions = new Vec2(0.125, 0.125);
    Entity.prototype.constructor.call(this, pos, dimensions, game);

    this.health = 3;
    this.maxDXMag = 0;
    // this.maxDYMag = 0.175;
    // this.origMaxDYMag = 0.175;
    // this.origX = pos.x;
    // this.origY = pos.y;

    // this.hasGravity = true;
    // this.falling = true;
    // this.gravity = 0.0325;

    // this.canJump = true;
    // this.jumpCapacity = 2;
    // this.jumpCoolDown = 0.5

    this.dead = false;

    this.u1 = 0;
    this.u2 = 0.5;
    this.v1 = 1;
    this.v2 = 0;

    this.collidedWithEnt = function(e) {

    };

    this.collidedWithLvl = function(e) {

    };

    this.tick = function() {

    };
};;var Level = function(game) {
    this.game = game;
    this.sman = game.sman;

    this.update = function(delta) {
        
    };

};