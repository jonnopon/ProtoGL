var gl = null;
var handleTextureLoaded = function(image, texture, ident) {
    gl.activeTexture(ident);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
};

//TODO REIMPLEMENTATIONS:
// RendererOld.prototype.createTexture = function(name, src) {
//     var ident = this.textureIdentifiers[Object.keys(this.textures).length];
//     var tex = gl.createTexture();
//     var image = new Image();
//     image.onload = function() {handleTextureLoaded(image, tex, ident);};
//     this.textures[name] = {'ident': ident, 'tex': tex};
//     image.src = src;
//
//     // return the gl texture position of the created texture
//     return Object.keys(this.textures).length - 1;
// };
// RendererOld.prototype.render = function(settings) {
//     gl.disable(gl.DEPTH_TEST);
//     gl.enable(gl.BLEND);
//     gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
//
//     if (settings.textureName !== undefined) {
//         gl.activeTexture(this.textures[settings.textureName].ident);
//         gl.bindTexture(gl.TEXTURE_2D, this.textures[settings.textureName].tex);
//     }
//
//     this.bindShaderProgram(settings.shaderName);
//     gl.useProgram(this.activeShaderProgram);
//     gl.bindBuffer(gl.ARRAY_BUFFER, this.activeVBO);
//
//     gl.bufferData(gl.ARRAY_BUFFER, this.activeVerts.array, gl.DYNAMIC_DRAW);
//     var off = 0;
//
//     for (var i = 0; i < settings.attributes.length; i++) {
//         var attrib = settings.attributes[i];
//         var attribLoc = gl.getAttribLocation(this.activeShaderProgram, attrib.name);
//         gl.enableVertexAttribArray(attribLoc);
//         gl.vertexAttribPointer(attribLoc, attrib.size, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, off);
//
//         off += (attrib.size * 4);
//     }
//
//     for (var j = 0; j < settings.uniforms.length; j++) {
//         var name = settings.uniforms[j].name;
//         var type = settings.uniforms[j].type;
//         var value = settings.uniforms[j].val;
//         this.uploadUniform(name, type, value);
//     }
//
//     gl.drawArrays(settings.shape, 0, this.activeVerts.array.length / this.activeVerts.dataPerVert);
// };

var Renderer = function(gameCanvas) {
    this.camera = null;
    this.shaderPrograms = {};
    this.activeShaderProgram = 0;
    this.vbos = {};
    this.textures = {};
    this.lastConfig = {};
    this.projectionMatrix2D = new Mat3();
    this.projectionMatrix2D.setAs2DProjection(GAME.resolution.x, GAME.resolution.y);

    this.projectionMatrix3D = new Mat4();
    this.projectionMatrix3D.setAs3DProjection(GAME.resolution.x, GAME.resolution.y, 400);

    // this.reverseLight = new Vec3(-1, 0.7, 1);
    // this.reverseLight = new Vec3(0, 0, 1);
    this.ambientColor = new Vec3(100, 100, 100);
    this.directionalColor = new Vec3(255, 255, 255);
    

    this.lightDirection = new Vec3(0, 0, -1);
    this.lightDirection.normalize();
    this.lightDirection.scale(-1);

    //TODO: REDUCE BACK DOWN TO DIRECTIONAL + AMBIENT LIGHT,
    //REIMPLEMENT POINTS AND THEN PER-FRAGMENT
    //MAYBE USE THIS AS AN OPPORTUNITY TO LOOK AT YOUR WHOLE "COMPUTE MATRIX" THING
    this.pointLightPosition = new Vec3(-500, 250, 0);
    this.pointLightColor = new Vec3(255, 255, 0);
    
    
    
    
    // this.reverseLight.normalize();

    //TODO: will naturally come across perspective again soon

    //TODO: PROBLEM: FOR SOME REASON: GAME.RESOLUTION.X / 2, GAME.RESOLUTION.Y / 2 IS AT THE TOP RIGHT
    //(THIS COULD ALSO BE A VIEW PROBLEM)
    this.perspectiveMatrix = new Mat4();
    this.perspectiveMatrix.setAsPerspective(90, GAME.resolution.x / GAME.resolution.y, 0.1, 10000000);

    //TODO: TO BE ABSTRACTED INTO A CAMERA
    // this.viewMatrix = null;
    this.viewMatrix2D = null;
    this.viewMatrix3D = null;
    // this.viewMatrix3D.setAsLookAt(new Vec3(0, 0, 0), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
    
    //create gl context
    try {
        gl = gameCanvas.getContext("webgl");
    } catch (e) {
        alert("Could not initialise WebGL - Error: \n" + e);
        return false;
    }
    if (!gl) {
        alert("Could not initialise WebGL");
        return false;
    }

    //initialise texture capabilities
    this.textureIdentifiers = [
        gl.TEXTURE0,
        gl.TEXTURE1,
        gl.TEXTURE2
    ];
};
Renderer.prototype.clearScreen = function(col, depth) {
    // gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    // gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.clearColor(col.x, col.y, col.z, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clear(gl.DEPTH_BUFFER_BIT);
};
Renderer.prototype.resize = function(width, height) {
    gl.viewport(0, 0, width, height);
};
///////////////////////////////////////////////////////////////////////////////////////////////
///CAMERA STUFF
///////////////////////////////////////////////////////////////////////////////////////////////
Renderer.prototype.addCamera = function(camera) {
    this.camera = camera;

    if (this.camera instanceof Camera3D) {
        this.viewMatrix3D = new Mat4();
    }
    else {
        this.viewMatrix2D = new Mat3();
    }

    GAME.addEntity(this.camera.e);
};
Renderer.prototype.updateViewMatrix = function() {
    this.camera.update();

    if (this.camera instanceof Camera3D) {
        this.viewMatrix3D = this.camera.getViewMatrix().clone();
        this.viewMatrix3D.invert();
    }
    else {
        this.viewMatrix2D = this.camera.getViewMatrix().clone();
        this.viewMatrix2D.invert();
    }
};
Renderer.prototype.getViewMatrix = function() {
    return this.viewMatrix2D || this.viewMatrix3D;
};
///////////////////////////////////////////////////////////////////////////////////////////////
///END CAMERA STUFF
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
///TEXTURE STUFF
///////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////
///END TEXTURE STUFF
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
///SHADER STUFF
///////////////////////////////////////////////////////////////////////////////////////////////
Renderer.prototype.compileShader = function(type, src) {
    var shader = gl.createShader(type);
    if (!shader) {
        alert("unable to create shader");
        return null;
    }

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        alert("Failed to compile shader: " + error);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
};
Renderer.prototype.createShaderProgram = function(name, shaders) {
    var vertexShader = this.compileShader(gl.VERTEX_SHADER, shaders.vert);
    var fragmentShader = this.compileShader(gl.FRAGMENT_SHADER, shaders.frag);
    
    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = gl.getProgramInfoLog(program);
        alert("Failed to link program: " + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    
    this.shaderPrograms[name] = program;
};
//TODO COMBINE THE TWO BELOW METHODS?
Renderer.prototype.useShaderProgram = function(name) {
    this.activeShaderProgram = this.shaderPrograms[name];
    gl.useProgram(this.shaderPrograms[name]);
};
Renderer.prototype.setShader = function(dataPerVert, attributes, instanceUniforms) {
    this.loadAttributes(dataPerVert, attributes);
    this.loadUniforms(instanceUniforms);
};

Renderer.prototype.loadAttributes = function(dataPerVert, attributes) {
    var attributeNames = Object.keys(attributes);
    var off = 0;
    for (var i = 0; i < attributeNames.length; i++) {
        var name = attributeNames[i];

        var size = attributes[name];

        var attribLoc = gl.getAttribLocation(this.activeShaderProgram, name);
        gl.enableVertexAttribArray(attribLoc);
        gl.vertexAttribPointer(attribLoc, size, gl.FLOAT, false, dataPerVert * 4, off);

        off += (size * 4);
    }
};
Renderer.prototype.loadUniforms = function(uniforms) {
    var uniformNames = Object.keys(uniforms);
    for (var i = 0; i < uniformNames.length; i++) {
        var name = uniformNames[i];

        var value = uniforms[name].value;
        var type = uniforms[name].type;

        if (typeof value === "function") {
            //TODO THIS IS BAD - ASSUMES MATRIX TYPE
            value = value().values;
        }
        else if (value instanceof Vec3) {
            value = value.asArray();
        }

        var loc = gl.getUniformLocation(this.activeShaderProgram, name);

        switch (type) {
            case "int":
                gl.uniform1i(loc, value);
                break;
            case "vec3":
                // gl.uniform3fv()
                gl.uniform3fv(loc, value);
                break;
            case "vec4":
                gl.uniform4fv(loc, value);
                break;
            case "mat3":
                gl.uniformMatrix3fv(loc, false, value);
                break;
            case "mat4":
                gl.uniformMatrix4fv(loc, false, value);
                break;
        }
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////
///END SHADER STUFF
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
///VBO STUFF
///////////////////////////////////////////////////////////////////////////////////////////////
Renderer.prototype.addVBO = function(name) {
    this.vbos[name] = gl.createBuffer();
};
Renderer.prototype.bindVBO = function(name) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbos[name]);
};
Renderer.prototype.bufferVerts = function(verts) {
    // gl.bindBuffer(gl.ARRAY_BUFFER, this.vbos[vboName]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.DYNAMIC_DRAW);
};
///////////////////////////////////////////////////////////////////////////////////////////////
///END VBO STUFF
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
///RENDERING
///////////////////////////////////////////////////////////////////////////////////////////////
// Renderer.prototype.render = function(shape, vertices) {
//     //TODO: make these flags (and others?) configurable from the outside
//     gl.disable(gl.DEPTH_TEST);
//     gl.enable(gl.BLEND);
//     gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
//
//     gl.drawArrays(shape, 0, vertices);
// };
angle = 0;
Renderer.prototype.renderWithConfig = function(config) {
    //TODO GIVEN THE BUG AT THE BOTTOM, THIS WHOLE THING NEEDS A RE-DO

    // this.pointLightPosition.y += 0.1;
    // this.pointLightPosition.x = Math.cos(angle) * 50;
    // this.pointLightPosition.z = Math.sin(angle) * 50;
    // angle += degToRad(0.01);


    //flags
    //TODO: if transparency/textures?

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    this.updateViewMatrix();

    //TODO: this may end up being handled by the vertex provider
    if (config.vboName !== this.lastConfig.vboName) {
        //vertices + vbo

        this.bindVBO(config.vboName);
        // this.bufferVertsToVBO()
    }

    if (config.shaderProgramName !== this.lastConfig.shaderProgramName) {
        this.useShaderProgram(config.shaderProgramName);
        this.loadAttributes(config.dataPerVert, config.attributes);
    }
    this.loadUniforms(config.vertGlobalUniforms);
    this.loadUniforms(config.fragGlobalUniforms);

    //texture

    //TODO: this may end up being handled by the vertex provider
    // if (config.instanceUniforms !== this.lastConfig.instanceUniforms) {
    //  NEED A LOADUNIFORMS FLAG ON CONFIG?
        this.loadUniforms(config.vertInstanceUniforms);
        this.loadUniforms(config.fragInstanceUniforms);
    // }

    //TODO: this may end up being handled by the vertex provider
    // if (config.verts !== this.lastConfig.verts) {
    //  NEED A BUFFER FLAG ON CONFIG?
        this.bufferVerts(config.verts);
    // }

    //draw w/ shape and numOfVertices
    gl.drawArrays(config.glShape, 0, config.numVerts);

    // this.lastConfig = config; //TODO THIS CAUSES A BUG WHEN IT SHOULD BE THE FIX?
};
///////////////////////////////////////////////////////////////////////////////////////////////
///END RENDERING
///////////////////////////////////////////////////////////////////////////////////////////////
