var fragShaders = {};
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

fragShaders['2d-textured-colored'] =
    'precision mediump float;' +
    'varying vec2 TexCoord;' +
    'varying vec3 Col;' +
    'uniform sampler2D tex;' +
    'void main() {' +
    '   gl_FragColor = texture2D(tex, TexCoord) * vec4(Col, 1.0);' +
    '}'
;


var _addFragShader = function(name, src) {
    fragshaders[name] = src;
};

var _getFragShader = function(name) {
    return fragShaders[name];
};