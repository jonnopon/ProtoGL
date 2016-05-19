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
var Renderer = function(gameCanvas) {
    this.vbos = {};
    this.verts = {};
    this.shaderPrograms = {};
    this.uniforms = {};
    this.textures = {};
    this.activeVBO;
    this.activeVerts;
    this.activeShaderProgram;
    this.projectionMatrix = new Mat4();
    this.projectionMatrix.setAsPerspective(Math.PI / 4, GAME.resolution.x / GAME.resolution.y, 1, 10);
    this.modelMatrix = new Mat4();
    this.viewMatrix = new Mat4();
    this.viewMatrix.translate(new Vec3(0, 0, -4));

    this.modelMatrix.setAsLookAt(new Vec3(0, 0, 0), new Vec3(0, 0, -4.5), new Vec3(0, 1, 0));
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
//
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

    // return this.shaderPrograms[name];
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
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    if (settings.textureName !== undefined) {
        gl.activeTexture(this.textures[settings.textureName].ident);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[settings.textureName].tex);
    }

    this.bindShaderProgram(settings.shaderName);
    gl.useProgram(this.activeShaderProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.activeVBO);

    if (rebuffer) {
        gl.bufferData(gl.ARRAY_BUFFER, this.activeVerts.array, gl.DYNAMIC_DRAW);
        var off = 0;

        for (var i = 0; i < settings.attributes.length; i++) {
            var attrib = settings.attributes[i];
            var attribLoc = gl.getAttribLocation(this.activeShaderProgram, attrib.name);
            gl.enableVertexAttribArray(attribLoc);
            gl.vertexAttribPointer(attribLoc, attrib.size, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, off);

            off += (attrib.size * 4);
        }
    }

    for (var j = 0; j < settings.uniforms.length; j++) {
        var name = settings.uniforms[j].name;
        var type = settings.uniforms[j].type;
        var value = settings.uniforms[j].val;
        this.uploadUniform(name, type, value);
    }

    gl.drawArrays(settings.shape, 0, this.activeVerts.array.length / this.activeVerts.dataPerVert);
};

Renderer.prototype.uploadUniform = function(name, type, value) {
    var loc = gl.getUniformLocation(this.activeShaderProgram, name);

    switch (type) {
        case "int":
            gl.uniform1i(loc, value);
            break;
        case "mat4":
            var actualValue = new Float32Array(16);
            actualValue.set(value, 0);
            gl.uniformMatrix4fv(loc, false, actualValue);
            break;
    }
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

    gl.uniformMatrix4fv(pMatrixUniformLoc, false, this.projectionMatrix.values);
    gl.uniformMatrix4fv(mMatrixUniformLoc, false, this.modelMatrix.values);
    gl.uniformMatrix4fv(vMatrixUniformLoc, false, this.viewMatrix.values);

    if (rebuffer) {
        var posAttrib = gl.getAttribLocation(this.activeShaderProgram, 'pos');
        gl.enableVertexAttribArray(posAttrib);
        gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 0);
        var colAttrib = gl.getAttribLocation(this.activeShaderProgram, 'col');
        gl.enableVertexAttribArray(colAttrib);
        gl.vertexAttribPointer(colAttrib, 3, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 3 * 4);
    }
    gl.drawArrays(gl.TRIANGLES, 0, this.activeVerts.array.length / this.activeVerts.dataPerVert);
};

Renderer.prototype.resize = function(width, height) {
    gl.viewport(0, 0, width, height);
};