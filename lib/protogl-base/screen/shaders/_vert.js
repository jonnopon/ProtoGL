var vertShaders = {};
vertShaders['pass-through'] =
    'attribute vec2 pos;' +
    'attribute vec3 col;' +
    'varying vec3 Col;' +
    'void main() {' +
    '    Col = (1.0 / 255.0) * col;' +
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
    'uniform int resX;' +
    'uniform int resY;' +
    'void main() {' +
    '   vec2 cp = ((pos / vec2(resX, resY)) * 2.0) - 1.0;' +
    '   vec2 ccp = ((centre / vec2(resX, resY)) * 2.0) - 1.0;' +
    '	TexCoord = texCoord;' +
    '	mat4 rot = mat4(cos(angle) * scale, -sin(angle), 0.0, 0.0, sin(angle), cos(angle) * scale, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '	mat4 tr = mat4(1.0, 0.0, 0.0, ccp.x, 0.0, 1.0, 0.0, ccp.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '   mat4 tr1 = mat4(1.0, 0.0, 0.0, -ccp.x, 0.0, 1.0, 0.0, -ccp.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '   gl_Position = vec4(cp, 1.0, 1.0) * tr1 * rot * tr;' +
    '}';
;
vertShaders['2d-transform-textured-colored'] =
    'attribute vec2 pos;' +
    'attribute vec2 texCoord;' +
    'attribute vec3 col;' +
    'attribute float angle;' +
    'attribute float scale;' +
    'attribute vec2 centre;' +
    'varying vec2 TexCoord;' +
    'varying vec3 Col;' +
    'uniform int resX;' +
    'uniform int resY;' +
    'void main() {' +
    '   vec2 cp = ((pos / vec2(resX, resY)) * 2.0) - 1.0;' +
    '   vec2 ccp = ((centre / vec2(resX, resY)) * 2.0) - 1.0;' +
    '   TexCoord = texCoord;' +
    '   Col = (1.0 / 255.0) * col;' +
    '	mat4 rot = mat4(cos(angle) * scale, -sin(angle), 0.0, 0.0, sin(angle), cos(angle) * scale, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '	mat4 tr = mat4(1.0, 0.0, 0.0, ccp.x, 0.0, 1.0, 0.0, ccp.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '   mat4 tr1 = mat4(1.0, 0.0, 0.0, -ccp.x, 0.0, 1.0, 0.0, -ccp.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '   gl_Position = vec4(cp, 1.0, 1.0) * tr1 * rot * tr;' +
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
};