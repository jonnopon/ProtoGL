var gl = null;

//TODO:
/*
IDEA: PIPE EVERYTHING THROUGH ENTITYMANAGER BY LITERALLY USING ENTITIES?
    EG: TEXT IS ENTITY (EITHER STRINGS OR BY CHARACTER!?)
    EG: UI PANEL IS ENTITY
    THINK ON THIS

    how to handle:
        UserInterfaceManager
        (SoundManager)

    The Renderer must be able to:
        - Set up textures (based on requirements?) (and store them?)

    TEXTURES:
        - think on it in a bit
 */

//TODO: SPLIT 2D AND 3D OR ACHIEVE BOTH IN ONE (HIGH COMPLEXITY?/REDUNDANCY?) ENGINE
var Renderer2D = function(gameCanvas) {
    this.shaderPrograms = {};
    this.activeShaderProgram = 0;
    this.vbos = {};
    this.projectionMatrix2D = new Mat3();
    this.projectionMatrix2D.setAs2DProjection(GAME.resolution.x, GAME.resolution.y);

    this.projectionMatrix3D = new Mat4();
    this.projectionMatrix3D.setAs3DProjection(GAME.resolution.x, GAME.resolution.y, 400);
    //TODO: will naturally come across perspective again soon
    // this.projectionMatrix3D.setAsPerspective(90, GAME.resolution.x / GAME.resolution.y, 0.01, 1000);
    this.viewMatrix2D = new Mat3();
    this.viewMatrix3D = new Mat4();
    this.viewMatrix3D.setAsLookAt(new Vec3(0, 0, 0), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
    
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
};
Renderer2D.prototype.clearScreen = function(col, depth) {
    gl.clearColor(col.x, col.y, col.z, 1.0);
    if (depth) {
        gl.clear(gl.DEPTH_BUFFER_BIT);
    }
    else {
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
};
Renderer2D.prototype.resize = function(width, height) {
    gl.viewport(0, 0, width, height);
};

///////////////////////////////////////////////////////////////////////////////////////////////
///SHADER STUFF
///////////////////////////////////////////////////////////////////////////////////////////////
Renderer2D.prototype.compileShader = function(type, src) {
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
Renderer2D.prototype.createShaderProgram = function(name, shaders) {
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
Renderer2D.prototype.useShaderProgram = function(name) {
    this.activeShaderProgram = this.shaderPrograms[name];
    gl.useProgram(this.shaderPrograms[name]);
};
Renderer2D.prototype.setShader = function(dataPerVert, attributes, instanceUniforms) {
    this.loadAttributes(dataPerVert, attributes);
    this.loadUniforms(instanceUniforms);
};

Renderer2D.prototype.loadAttributes = function(dataPerVert, attributes) {
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
Renderer2D.prototype.loadUniforms = function(uniforms) {
    var uniformNames = Object.keys(uniforms);
    for (var i = 0; i < uniformNames.length; i++) {
        var name = uniformNames[i];

        var value = uniforms[name].value;
        var type = uniforms[name].type;

        var loc = gl.getUniformLocation(this.activeShaderProgram, name);

        switch (type) {
            case "int":
                gl.uniform1i(loc, value);
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
Renderer2D.prototype.addVBO = function(name) {
    this.vbos[name] = gl.createBuffer();
};
Renderer2D.prototype.bufferVertsToVBO = function(verts, vboName) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbos[vboName]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.DYNAMIC_DRAW);
};
///////////////////////////////////////////////////////////////////////////////////////////////
///END VBO STUFF
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
///RENDERING
///////////////////////////////////////////////////////////////////////////////////////////////
Renderer2D.prototype.render = function(shape, vertices) {
    //TODO: make these flags (and others?) configurable from the outside
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.drawArrays(shape, 0, vertices);
};
///////////////////////////////////////////////////////////////////////////////////////////////
///END RENDERING
///////////////////////////////////////////////////////////////////////////////////////////////