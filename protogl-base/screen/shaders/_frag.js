var FRAGSHADERS = {};

FRAGSHADERS["colored"] =
    'precision mediump float;' +
    'varying vec3 Col;' +
    'void main() {' +
    '    gl_FragColor = vec4(Col, 1.0);' +
    '}'
;
FRAGSHADERS["textured"] =
    'precision mediump float;' +
    'varying vec2 TexCoord;' +
    'uniform sampler2D tex;' +
    'void main() {' +
    '    gl_FragColor = texture2D(tex, TexCoord);' +
    '}'
;
FRAGSHADERS["textured-colored"] =
    'precision mediump float;' +
    'varying vec2 TexCoord;' +
    'varying vec3 Col;' +
    'uniform sampler2D tex;' +
    'void main() {' +
    '   gl_FragColor = texture2D(tex, TexCoord) * vec4(Col, 1.0);' +
    '}'
;