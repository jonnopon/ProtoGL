var FRAGSHADERS = {
    colored: 'precision mediump float;' +
    'varying vec4 Col;' +
    'void main() {' +
    '   gl_FragColor = vec4(Col.xyz * (1.0 / 255.0), Col.w);' +
    '}'

    // textured: 'precision mediump float;' +
    // 'varying vec2 TexCoord;' +
    // 'uniform sampler2D tex;' +
    // 'void main() {' +
    // '   gl_FragColor = texture2D(tex, TexCoord);' +
    // '}',
    // texturedColored: 'precision mediump float;' +
    // 'varying vec2 TexCoord;' +
    // 'varying vec4 Col;' +
    // 'uniform sampler2D tex;' +
    // 'void main() {' +
    // '   gl_FragColor = texture2D(tex, TexCoord) * Col;' +
    // '}',
    // lighting1: 'precision mediump float;' +
    //     'varying vec4 Col;' +
    //     'varying vec3 Normal;' +
    //     'uniform vec3 reverseLightDirection;' +
    //     'void main() {' +
    //     '   vec3 normal = normalize(Normal);' +
    //     '   float light = dot(normal, reverseLightDirection);' +
    //     '   gl_FragColor = vec4(Col.xyz * 1.0 / 255.0), Col.w);' +
    //     '   gl_FragColor.rgb *= light;' +
    //     '}'
};
FRAGSHADERS["lighting-1"] = function() {
    return {
        src: 'precision mediump float;' +
            'varying vec4 Col;' +
            'varying vec3 vLightWeighting;' +
            // 'varying vec3 Normal;' +
            // 'uniform vec3 reverseLightDirection;' +
            'void main() {' +
            // '   vec3 normal = normalize(Normal);' +
            // '   float light = dot(normal, reverseLightDirection);' +
            // '   gl_FragColor = vec4(Col.xyz * (1.0 / 255.0), Col.w);' +
            // '   gl_FragColor.rgb *= light;' +
            '   gl_FragColor = vec4((Col.xyz * vLightWeighting) * (1.0 / 255.0), Col.w);' +
            '}',
        globalUniforms: {
            // reverseLightDirection: {
            //     type: "vec3",
            //     value: GAME.renderer.reverseLight.asArray() //TODO??
            // }
        },
        instanceUniforms: {
            
        }
    }
};

FRAGSHADERS["point-lighting"] = function() {
    return {
        src:
            'precision mediump float;' +
            'varying vec4 Col;' +
            'varying vec3 Normal;' +
            'uniform vec3 reverseLightDirection;' +
            'void main() {' +
            '   vec3 normal = normalize(Normal);' +
            '   float light = dot(normal, reverseLightDirection);' +
            '   gl_FragColor = vec4(Col.xyz * (1.0 / 255.0), Col.w);' +
            '   gl_FragColor.rgb *= light;' +
            '}',
        globalUniforms: {
            reverseLightDirection: {
                type: "vec3",
                value: GAME.renderer.reverseLight.asArray() //TODO??
            }
        },
        instanceUniforms: {

        }
    }
};

FRAGSHADERS["point-lighting-per-fragment"] = function() {
    return {
        src:
            'precision mediump float;' +
            'varying vec4 Pos3D;' +
            'varying vec3 transformedNormal;' +
            'varying vec4 Col;' +

            'uniform vec3 ambientColor;' +
            'uniform vec3 pointLightPos;' +
            'uniform vec3 pointLightCol;' +

            'void main() {' +
            '   vec3 ac = ambientColor * (1.0 / 255.0);' +
            '   vec3 pc = pointLightCol * (1.0 / 255.0);' +
            '   vec4 col = vec4(Col.xyz * (1.0 / 255.0), Col.w);' +

            '   vec3 lightDirection = normalize(pointLightPos - Pos3D.xyz);' +
            '   float directionalLightWeighting = max(dot(normalize(transformedNormal), lightDirection), 0.0);' +
            '   vec3 lightWeighting = ac + pc * directionalLightWeighting;' +

            '   gl_FragColor = vec4(col.xyz * lightWeighting, col.w);' +
            '}',
        globalUniforms: {
            pointLightPos: {
                type: "vec3",
                value: GAME.renderer.pointLightPosition
            },
            pointLightCol: {
                type: "vec3",
                value: GAME.renderer.pointLightColor
            },
            ambientColor: {
                type: "vec3",
                value: GAME.renderer.ambientColor
            }
        },
        instanceUniforms: {

        }
    }
};