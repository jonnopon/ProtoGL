var handleTextureLoaded = function(image, texture, ident) {
    gl.activeTexture(ident);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
};
var gl = null;
var Renderer = function(gameCanvas) {
    this.createTexture = function(name, src) {
        var ident = this.textureIdentifiers[Object.keys(this.textures).length];
        var tex = gl.createTexture();
        var image = new Image();
        image.onload = function() {handleTextureLoaded(image, tex, ident);};
        this.textures[name] = {'ident': ident, 'tex': tex};
        image.src = src;

        // return the gl texture position of the created texture
        return Object.keys(this.textures).length - 1;
    };

    this.addVerts = function(name, vertArray, dataPerVert) {
        this.verts[name] = {'dataPerVert':dataPerVert, 'array':new Float32Array(vertArray)};
    };

    this.addVBO = function(name) {
        this.vbos[name] = gl.createBuffer();
    };

    this.bufferVertsToVBO = function(vertName, vboName) {
        var prevBuffer = this.activeVBO;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbos[vboName]);
        gl.bufferData(gl.ARRAY_BUFFER, this.verts[vertName].array, gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, prevBuffer);
    };

    this.bindVBO = function(name) {
        this.activeVBO = this.vbos[name];
    };

    this.bindVerts = function(name) {
        this.activeVerts = this.verts[name];
    };

    this.bindShaderProgram = function(name) {
        this.activeShaderProgram = this.shaderPrograms[name];
    };

    this.addShaderProgram = function(name, shaders) {
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
    };
    this.getShaderProgram = function(name) {
        return this.shaderPrograms[name];
    };

    this.createShaderProgram = function(gl, vshader, fshader, extras) {
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

    this.compileShader = function(gl, type, source) {
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

    this.clearScreen = function(col, depth) {
        gl.clearColor(col.x, col.y, col.z, 1.0);
        if (depth) {
            gl.clear(gl.DEPTH_BUFFER_BIT);
        }
        else {
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
    };

    this.render2D = function(rebuffer, settings) {
        gl.disable(gl.DEPTH_TEST);

        if (settings.textureName !== null) {
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            gl.activeTexture(this.textures[settings.textureName].ident);
            gl.bindTexture(gl.TEXTURE_2D, this.textures[settings.textureName].tex);
        }
        else {
            gl.disable(gl.BLEND);
        }

        gl.useProgram(this.activeShaderProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.activeVBO);

        if (rebuffer) {
            gl.bufferData(gl.ARRAY_BUFFER, this.activeVerts.array, gl.DYNAMIC_DRAW);
            var off = 0;

            for (var i = 0; i < settings.attributes.length; i++) {
                var attrib = settings.attributes[i];
                var attribLoc = gl.getAttribLocation(this.activeShaderProgram, attrib.name);
                gl.enableVertexAttribArray(attribLoc);
                gl.vertexAttribPointer(attribLoc, attrib.length, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, off);

                off += (attrib.length * 4);
            }
        }

        for (var j = 0; j < settings.uniforms.length; j++) {
            var name = settings.uniforms[j].name;
            var value = settings.uniforms[j].val;
            gl.uniform1i(gl.getUniformLocation(this.activeShaderProgram, name), value); //TODO currently assumes all uniforms are of type 1i
        }

        gl.drawArrays(settings.shape, 0, this.activeVerts.array.length / this.activeVerts.dataPerVert);
    };

    this.render3D = function(rebuffer) {
        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.useProgram(this.activeShaderProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.activeVBO);

        var pMatrixUniformLoc = gl.getUniformLocation(this.activeShaderProgram, 'projectionMatrix');
        var mMatrixUniformLoc = gl.getUniformLocation(this.activeShaderProgram, 'modelMatrix');
        var vMatrixUniformLoc = gl.getUniformLocation(this.activeShaderProgram, 'viewMatrix');

        gl.uniformMatrix4fv(pMatrixUniformLoc, false, this.projectionMatrix);
        gl.uniformMatrix4fv(mMatrixUniformLoc, false, this.modelMatrix);
        gl.uniformMatrix4fv(vMatrixUniformLoc, false, this.viewMatrix);

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

    this.resize = function(width, height) {
        gl.viewport(0, 0, width, height);
    };

    this.vbos = {};
    this.verts = {};
    this.shaderPrograms = {};
    this.uniforms = {};
    this.activeVBO;
    this.activeVerts;
    this.activeShaderProgram;
    this.projectionMatrix = mat4.create();
    this.projectionMatrix = mat4.perspective(this.projectionMatrix, Math.PI / 4, gameCanvas.clientWidth / gameCanvas.clientHeight, 1, 10);
    this.modelMatrix = mat4.create();
    this.viewMatrix = mat4.identity(mat4.create());
    mat4.translate(this.viewMatrix, this.viewMatrix, [0, 0, -4]);
    mat4.lookAt(this.modelMatrix, [0, 0, 0], [0, 0, -4.5], [0, 1, 0]); //TODO optional

    this.verts['BASIC'] = {'dataPerVert':5, 'array':new Float32Array([
        -0.5, -0.5, 0, 0, 1,
        0.5, -0.5, 0, 1, 0,
        0.5, 0.5, 1, 0, 0,

        0.5, 0.5, 0, 1, 1,
        -0.5, 0.5, 1, 1, 0,
        -0.5, -0.5, 1, 1, 1
    ])};

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

    /* Initialise shaders with passthroughs */
    this.shaderPrograms['BASIC'] = this.createShaderProgram(gl, _getVertShader('pass-through'), _getFragShader('pass-through'));
    if (!this.shaderPrograms['BASIC']) {
        alert('Failed to create shader program named BASIC');
        return false;
    }
    this.activeShaderProgram = this.shaderPrograms['BASIC'];

    /* Initialise vertex buffer objects + basic data (square)*/
    this.activeVerts = this.verts['BASIC'];
    this.vbos['BASIC'] = gl.createBuffer();
    this.activeVBO = this.vbos['BASIC'];
    gl.bindBuffer(gl.ARRAY_BUFFER, this.activeVBO);
    gl.bufferData(gl.ARRAY_BUFFER, this.activeVerts.array, gl.DYNAMIC_DRAW);
    var posAttrib = gl.getAttribLocation(this.activeShaderProgram, 'pos');
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 0);
    var colAttrib = gl.getAttribLocation(this.activeShaderProgram, 'col');
    gl.enableVertexAttribArray(colAttrib);
    gl.vertexAttribPointer(colAttrib, 3, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 2 * 4);

    //initialise texture capabilities
    this.textureIdentifiers = [
        gl.TEXTURE0,
        gl.TEXTURE1,
        gl.TEXTURE2
    ];
    this.textures = {};

    return true;
};