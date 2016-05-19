var VERTSHADERS2D = {};
var VERTSHADERS3D = {};

/*************************************************** 2D ***************************************************/
VERTSHADERS2D["colored"] = {
    src:    'attribute vec2 pos;' +
            'attribute vec4 col;' +
            'varying vec4 Col;' +
            'uniform int resX;' +
            'uniform int resY;' +
            'void main() {' +
            '   Col = vec4(col.xyz * (1.0 / 255.0), col.w);' +
            '   vec2 cp = ((pos / vec2(resX, resY)) * 2.0) - 1.0;' +
            '   gl_Position = vec4(cp, 1.0, 1.0);' +
            '}',
    attributes: {
        pos: 2,
        col: 4
    },
    uniforms: {
        resX: {
            type: "int",
            path: ["GAME", "resolution", "x"]
        },
        resY: {
            type: "int",
            path: ["GAME", "resolution", "y"]
        }
    }
};
        
//TODO move the matrix creation out of the shader duh
VERTSHADERS2D["transform-colored"] = {
    src:    'attribute vec2 pos;' +
            'attribute vec4 col;' +
            'attribute float angle;' +
            'attribute float scale;' +
            'attribute vec2 centre;' +
            'uniform int resX;' +
            'uniform int resY;' +
            'varying vec4 Col;' +
            'void main() {' +
            '   vec2 cp = ((pos / vec2(resX, resY)) * 2.0) - 1.0;' +
            '   vec2 ccp = ((centre / vec2(resX, resY)) * 2.0) - 1.0;' +
            '   Col = vec4(col.xyz * (1.0 / 255.0), col.w);' +
            '	mat4 rot = mat4(cos(angle) * scale, -sin(angle), 0.0, 0.0, sin(angle), cos(angle) * scale, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
            '	mat4 tr = mat4(1.0, 0.0, 0.0, ccp.x, 0.0, 1.0, 0.0, ccp.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
            '   mat4 tr1 = mat4(1.0, 0.0, 0.0, -ccp.x, 0.0, 1.0, 0.0, -ccp.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
            '   gl_Position = vec4(cp, 1.0, 1.0) * tr1 * rot * tr;' +
            '}',
    attributes: {
        pos: 2,
        col: 4,
        angle: 1,
        scale: 1,
        centre: 2
    },
    uniforms: {
        resX: {
            type: "int",
            path: ["GAME", "resolution", "x"]
        },
        resY: {
            type: "int",
            path: ["GAME", "resolution", "y"]
        }
    }
};

//TODO move the matrix creation out of the shader duh
VERTSHADERS2D["transform-textured"] = {
    src:    'attribute vec2 pos;' +
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
            '}',
    attributes: {
        pos: 2,
        texCoord: 2,
        angle: 1,
        scale: 1,
        centre: 2
    },
    uniforms: {
        resX: {
            type: "int",
            path: ["GAME", "resolution", "x"]
        },
        resY: {
            type: "int",
            path: ["GAME", "resolution", "y"]
        }
    }
};

//TODO move the matrix creation out of the shader duh
VERTSHADERS2D["transform-textured-colored"] = {
    src: 'attribute vec2 pos;' +
    'attribute vec2 texCoord;' +
    'attribute vec4 col;' +
    'attribute float angle;' +
    'attribute float scale;' +
    'attribute vec2 centre;' +
    'varying vec2 TexCoord;' +
    'varying vec4 Col;' +
    'uniform int resX;' +
    'uniform int resY;' +
    'void main() {' +
    '   vec2 cp = ((pos / vec2(resX, resY)) * 2.0) - 1.0;' +
    '   vec2 ccp = ((centre / vec2(resX, resY)) * 2.0) - 1.0;' +
    '   TexCoord = texCoord;' +
    '   Col = vec4(col.xyz * (1.0 / 255.0), col.w);' +
    '	mat4 rot = mat4(cos(angle) * scale, -sin(angle), 0.0, 0.0, sin(angle), cos(angle) * scale, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '	mat4 tr = mat4(1.0, 0.0, 0.0, ccp.x, 0.0, 1.0, 0.0, ccp.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '   mat4 tr1 = mat4(1.0, 0.0, 0.0, -ccp.x, 0.0, 1.0, 0.0, -ccp.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
    '   gl_Position = vec4(cp, 1.0, 1.0) * tr1 * rot * tr;' +
    '}',
    attributes: {
        pos: 2,
        texCoord: 2,
        col: 4,
        angle: 1,
        scale: 1,
        centre: 2
    },
    uniforms: {
        resX: {
            type: "int",
            path: ["GAME", "resolution", "x"]
        },
        resY: {
            type: "int",
            path: ["GAME", "resolution", "y"]
        }
    }
};

/*************************************************** 3D ***************************************************/
VERTSHADERS3D["transform"] =
    'attribute vec3 pos;' +
    'attribute vec4 col;' +
    'uniform mat4 modelMatrix;' +
    'uniform mat4 viewMatrix;' +
    'uniform mat4 projectionMatrix;' +
    'varying vec4 Col;' +
    'void main(void) {' +
    '   Col = vec4(col.xyz * (1.0 / 255.0), col.w);' +
    '   gl_Position =  projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);' +
    '}'
;
VERTSHADERS3D["textured"] =
    'attribute vec2 pos;' +
    'attribute vec4 col;' +
    'attribute vec2 texCoord;' +
    'uniform mat4 modelViewMatrix;' +
    'uniform mat4 projectionMatrix;' +
    'varying vec4 Col;' +
    'varying vec2 TexCoord;' +
    'void main(void) {' +
    '   Col = vec4(col.xyz * (1.0 / 255.0), col.w);' +
    '   TexCoord = texCoord;' +
    '   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);' +
    '}'
;