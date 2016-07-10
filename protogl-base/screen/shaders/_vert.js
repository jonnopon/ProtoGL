var VERTSHADERS2D = {};
var VERTSHADERS3D = {};

// TODO: rethink structure of how shaders are stored and retrieved

/*************************************************** 3D ***************************************************/
VERTSHADERS3D["perspective-1"] = function() {
    return {
        src:    'precision mediump float;' +
        'attribute vec4 pos3D;' +
        'attribute vec4 col;' +
        'uniform mat4 transform3D;' +
        'uniform mat4 perspective;' +
        'uniform mat4 view;' +
        'varying vec4 Col;' +
        'void main() {' +
        '   Col = col;' +
        '   gl_Position = perspective * view * transform3D * pos3D;' +
        '}',
        attributes: {
            pos3D: 3,
            col: 4
        },
        dataPerVert: 7,
        globalUniforms: {
            perspective: {
                type: "mat4",
                value: GAME.renderer.perspectiveMatrix.values
            },
            view: {
                type: "mat4",
                value: function value() {
                    return GAME.renderer.getViewMatrix();
                }
            }
        },
        instanceUniforms: {
            transform3D: "mat4"
        }
    };
};

VERTSHADERS3D["lighting-1"] = function() {
    return {
        src:
            'precision mediump float;' +
            'attribute vec4 pos3D;' +
            'attribute vec4 col;' +
            'attribute vec3 normal;' +

            'uniform mat4 transform3D;' +
            // 'uniform mat4 transform3DInverseTranspose;' +
            'uniform mat4 normalMatrix;' +

            'uniform vec3 lightingDirection;' +
            'uniform vec3 directionalColor;' +
            'uniform vec3 ambientColor;' +

            'uniform mat4 perspective;' +
            'uniform mat4 view;' +

            'varying vec4 Col;' +
            // 'varying vec3 Normal;' +

            'varying vec3 vLightWeighting;' +

            'void main() {' +
            '   Col = col;' +
            '   vec3 ac = ambientColor.xyz * (1.0 / 255.0);' +
            '   vec3 dc = directionalColor.xyz * (1.0 / 255.0);' +
            '   vec3 transformedNormal = mat3(normalMatrix) * normal;' +
            '   float directionalLightWeighting = max(dot(transformedNormal, lightingDirection), 0.0);' +
            '   vLightWeighting = ac + dc * directionalLightWeighting;' +
            // '   Normal = (transform3DInverseTranspose * vec4(normal, 0)).xyz;' +
            '   gl_Position = perspective * view * transform3D * pos3D;' +
            '}',
        attributes: {
            pos3D: 3,
            col: 4,
            normal: 3
        },
        dataPerVert: 10,
        globalUniforms: {
            perspective: {
                type: "mat4",
                value: GAME.renderer.perspectiveMatrix.values
            },
            view: {
                type: "mat4",
                value: function value() {
                    return GAME.renderer.getViewMatrix();
                }
            },
            lightingDirection: {
                type: "vec3",
                value: GAME.renderer.lightDirection
            },
            directionalColor: {
                type: "vec3",
                value: GAME.renderer.directionalColor
            },
            ambientColor: {
                type: "vec3",
                value: GAME.renderer.ambientColor
            }
        },
        instanceUniforms: {
            transform3D: "mat4",
            // transform3DInverseTranspose: "mat4"
            normalMatrix: "mat4",
        }
    };
};

VERTSHADERS3D["point-lighting"] = function() {
    return {
        src:
        'precision mediump float;' +
        'attribute vec4 pos3D;' +
        'attribute vec4 col;' +
        'attribute vec3 normal;' +

        'uniform mat4 transform3D;' +
        // 'uniform mat4 transform3DInverseTranspose;' +
        'uniform mat4 normalMatrix;' +

        // 'uniform vec3 lightingDirection;' +
        // 'uniform vec3 directionalColor;' +
        'uniform vec3 ambientColor;' +
        'uniform vec3 pointLightPosition;' +
        'uniform vec3 pointLightColor;' +

        'uniform mat4 perspective;' +
        'uniform mat4 view;' +

        'varying vec4 Col;' +
        // 'varying vec3 Normal;' +

        'varying vec3 vLightWeighting;' +

        'void main() {' +
        '   Col = col;' +
        '   vec3 ac = ambientColor * (1.0 / 255.0);' +
        // '   vec3 dc = directionalColor.xyz * (1.0 / 255.0);' +
        '   vec3 pc = pointLightColor * (1.0 / 255.0);' +

        '   vec4 mvPosition = view * transform3D * pos3D;' +
        '   gl_Position = perspective * mvPosition;' +

        '   vec3 lightDirection = normalize(pointLightPosition - mvPosition.xyz);' +
        '   vec3 transformedNormal = mat3(normalMatrix) * normal;' +
        '   float directionalLightWeighting = max(dot(transformedNormal, lightDirection), 0.0);' +
        '   vLightWeighting = ac + pc * directionalLightWeighting;' +

        // '   vec3 transformedNormal = mat3(normalMatrix) * normal;' +
        // '   float directionalLightWeighting = max(dot(transformedNormal, lightingDirection), 0.0);' +
        // '   vLightWeighting = ac + dc * directionalLightWeighting;' +
        // '   Normal = (transform3DInverseTranspose * vec4(normal, 0)).xyz;' +
        // '   gl_Position = perspective * view * transform3D * pos3D;' +
        '}',
        attributes: {
            pos3D: 3,
            col: 4,
            normal: 3
        },
        dataPerVert: 10,
        globalUniforms: {
            perspective: {
                type: "mat4",
                value: GAME.renderer.perspectiveMatrix.values
            },
            view: {
                type: "mat4",
                value: function value() {
                    return GAME.renderer.getViewMatrix();
                }
            },
            pointLightPosition: {
                type: "vec3",
                value: GAME.renderer.pointLightPosition
            },
            pointLightColor: {
                type: "vec3",
                value: GAME.renderer.pointLightColor
            },
            ambientColor: {
                type: "vec3",
                value: GAME.renderer.ambientColor
            }
        },
        instanceUniforms: {
            transform3D: "mat4",
            // transform3DInverseTranspose: "mat4"
            normalMatrix: "mat4",
        }
    };
};

VERTSHADERS3D["point-lighting-per-fragment"] = function() {
    return {
        src:
        'precision mediump float;' +
        'attribute vec4 pos3D;' +
        'attribute vec4 col;' +
        'attribute vec3 normal;' +

        'uniform mat4 transform3D;' +
        'uniform mat3 normalMatrix;' +

        'uniform mat4 perspective;' +
        'uniform mat4 view;' +

        'varying vec4 Pos3D;' +
        'varying vec3 transformedNormal;' +
        'varying vec4 Col;' +

        'void main() {' +
        '   Col = col;' +
        '   Pos3D = view * transform3D * pos3D;' +
        '   gl_Position = perspective * Pos3D;' +
        '   transformedNormal = normalMatrix * normal;' +
        '}',
        attributes: {
            pos3D: 3,
            col: 4,
            normal: 3
        },
        dataPerVert: 10,
        globalUniforms: {
            perspective: {
                type: "mat4",
                value: GAME.renderer.perspectiveMatrix.values
            },
            view: {
                type: "mat4",
                value: function value() {
                    return GAME.renderer.getViewMatrix();
                }
            }
        },
        instanceUniforms: {
            transform3D: "mat4",
            normalMatrix: "mat3"
        }
    };
};

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
                value: function value() {
                    return GAME.renderer.getViewMatrix();
                }
            }
        },
        instanceUniforms: {
            transform3D: "mat4"
        }
    };
};

/*************************************************** 2D ***************************************************/
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
                value: function value() {
                    return GAME.renderer.getViewMatrix();
                }
            }
        },
        instanceUniforms: {
            transform2D: "mat3"
        }
    }
};

VERTSHADERS2D["new-transform-textured-colored"] = function() {
    return {
        src:
        'precision mediump float;' +
        'attribute vec2 pos2D;' +
        'attribute vec4 col;' +
        'attribute vec2 texCoord;' +
        'uniform mat3 transform2D;' +
        'uniform mat3 projection;' +
        'uniform mat3 view;' +
        'varying vec4 Col;' +
        'varying vec2 TexCoord;' +
        'void main() {' +
        '   TexCoord = texCoord;' +
        '   Col = col;' +
        '   gl_Position = vec4((view * projection * transform2D * vec3(pos2D, 1)).xy, 1.0, 1.0);' +
        '}',
        attributes: {
            pos2D: 2,
            col: 4,
            texCoord: 2
        },
        dataPerVert: 8,
        globalUniforms: {
            projection: {
                type: "mat3",
                value: GAME.renderer.projectionMatrix2D.values
            },
            //TODO: MIGHT NOT WANT VIEW OR PROJECTION FOR TEXT/UI? SEPARATE SHADERS? HMM
            view: {
                type: "mat3",
                value: function value() {
                    return GAME.renderer.getViewMatrix();
                }
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