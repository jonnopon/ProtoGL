var VERTSHADERS2D = {};
var VERTSHADERS3D = {};

// TODO: rethink structure of how shaders are stored and retrieved

/*************************************************** 2D ***************************************************/
VERTSHADERS3D["new-transform-colored"] = function() {
    return {
        src:    'precision mediump float;' +
                'attribute vec3 pos3D;' +
                'attribute vec4 col;' +
                'uniform mat4 transform3D;' +
                'uniform mat4 projection;' +
                'uniform mat4 view;' +
                'varying vec4 Col;' +
                'void main() {' +
                '   Col = col;' +
                '   gl_Position = vec4((view * projection * transform3D * vec4(pos3D, 1)).xyz, 1.0);' +
                '}',
        attributes: {
            pos3D: 3,
            col: 4
        },
        dataPerVert: 7,
        globalUniforms: {
            projection: {
                type: "mat4",
                value: GAME.renderer.projectionMatrix3D.values
            },
            view: {
                type: "mat4",
                value: GAME.renderer.viewMatrix3D.values
            }
        },
        instanceUniforms: {
            transform3D: "mat4"
        }
    };
};


VERTSHADERS2D["new-transform-colored"] = function() {
    return {
        src:'precision mediump float;' +
            'attribute vec2 pos2D;' +
            'attribute vec4 col;' +
            'uniform mat3 transform2D;' +
            'uniform mat3 projection;' +
            'uniform mat3 view;' +
            'varying vec4 Col;' +
            'void main() {' +
            '   Col = col;' +
            '   gl_Position = vec4((view * projection * transform2D * vec3(pos2D, 1)).xy, 1.0, 1.0);' +
            '}',
        attributes: {
            pos2D: 2,
            col: 4
        },
        dataPerVert: 6,
        globalUniforms: {
            projection: {
                type: "mat3",
                value: GAME.renderer.projectionMatrix2D.values
            },
            view: {
                type: "mat3",
                value: GAME.renderer.viewMatrix2D.values
            }
        },
        instanceUniforms: {
            transform2D: "mat3"
        }
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// OLD ///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
VERTSHADERS2D["colored"] = function() {
    return {
        src:    'attribute vec2 pos;' +
                // 'attribute vec4 col;' +
                'varying vec4 Col;' +
                'uniform int resX;' +
                'uniform int resY;' +
                'uniform vec4 col;' +
                'void main() {' +
                '   Col = vec4(col.xyz * (1.0 / 255.0), col.w);' +
                '   vec2 cp = ((pos / vec2(resX, resY)) * 2.0) - 1.0;' +
                '   gl_Position = vec4(cp, 1.0, 1.0);' +
                '}',
        attributes: {
            pos: 2
            // col: 4
        },
        dataPerVert: 2,
        globalUniforms: {
            resX: {
                type: "int",
                value: GAME.resolution.x
            },
            resY: {
                type: "int",
                value: GAME.resolution.y
            }
        },
        instanceUniforms: {
            col: "vec4"
        }
    }
};

///////////////////////////////////OLD/////////////////////////////////////////////////
VERTSHADERS2D["transform-colored"] = function() {
    return {
        src: 'attribute vec2 pos;' +
        'attribute vec4 col;' +
        'attribute float angle;' +
        'attribute vec2 scale;' +
        'attribute vec2 center;' +
        'uniform int resX;' +
        'uniform int resY;' +
        'varying vec4 Col;' +
        'void main() {' +
        '   vec2 cp = ((pos / vec2(resX, resY)) * 2.0) - 1.0;' +
            '   vec2 ccp = ((center / vec2(resX, resY)) * 2.0) - 1.0;' +
        '   Col = vec4(col.xyz * (1.0 / 255.0), col.w);' +
        '	mat4 rot = mat4(cos(angle) * scale.x, -sin(angle), 0.0, 0.0, sin(angle), cos(angle) * scale.x, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
        '	mat4 tr = mat4(1.0, 0.0, 0.0, ccp.x, 0.0, 1.0, 0.0, ccp.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
        '   mat4 tr1 = mat4(1.0, 0.0, 0.0, -ccp.x, 0.0, 1.0, 0.0, -ccp.y, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);' +
        '   gl_Position = vec4(cp, 1.0, 1.0) * tr1 * rot * tr;' +
        '}',
        attributes: {
            pos: 2,
            col: 4,
            angle: 1,
            scale: 2,
            center: 2
        },
        dataPerVert: 11,
        globalUniforms: {
            resX: {
                type: "int",
                value: GAME.resolution.x
            },
            resY: {
                type: "int",
                value: GAME.resolution.y
            }
        },
        instanceUniforms: {}
    };
};

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