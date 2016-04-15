var FRAGSHADERS = {};

FRAGSHADERS["colored"] =
    'precision mediump float;' +
    'varying vec4 Col;' +
    'void main() {' +
    '   gl_FragColor = Col;' +
    '}'
;
FRAGSHADERS["textured"] =
    'precision mediump float;' +
    'varying vec2 TexCoord;' +
    'uniform sampler2D tex;' +
    'void main() {' +
    '   gl_FragColor = texture2D(tex, TexCoord);' +
    '}'
;
FRAGSHADERS["textured-colored"] =
    'precision mediump float;' +
    'varying vec2 TexCoord;' +
    'varying vec4 Col;' +
    'uniform sampler2D tex;' +
    'void main() {' +
    '   gl_FragColor = texture2D(tex, TexCoord) * Col;' +
    '}'
;