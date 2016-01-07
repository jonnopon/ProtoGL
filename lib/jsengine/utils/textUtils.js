var TextUtils = function(renderer) {
	//Used to initialise the application's font (as a texture)
	//Font file is loaded in by webglrenderer, the configuration here is untied to that process or resource
	//so it's generic
	//Expects that the texture loaded in to represent font;
	//  contains only the characters defined in the charSet array
	//  contains the characters arranged in a 1-dimensional array (a row) in the order defined in the charSet array

	//Usage:
	//  initialise object and call setUpFont in app init
	//  Use "add string" to define a new charSequence at the given origin point
	//  Before rendering, call "prepareForRendering" to convert string literals into lists of UV coordinates for OpenGL
	//  To render, call webglrenderer.renderText(), passing it the result of [this].getVerts()
	//  THIS MANAGER CLEANS AFTER RENDERING, SO IT ONLY EVER CONTAINS OR PROCESSES THIS FRAME'S TEXT

    this.renderer = renderer;

   	var texPos = -1;
   	while (texPos < 0) {
		texPos = this.renderer.createTexture('font', 'res/img/font.png');
   	}

    var frag = _getFragShader('2d-textured');
    var vert = _getVertShader('2d-transform-textured');
    renderer.addShaderProgram('textProgram', [vert, frag]);

    this.shaderProgram = 'textProgram';
    this.vbo = renderer.addVBO('textVBO');

	this.renderSettings = new RendererSettings();
	this.renderSettings.addAttribute('pos', 2);
	this.renderSettings.addAttribute('texCoord', 2);
	this.renderSettings.addAttribute('angle', 1);
	this.renderSettings.addAttribute('scale', 1);
	this.renderSettings.addAttribute('centre', 2);
	this.renderSettings.addUniform('tex', texPos);
	this.renderSettings.setTextureName('font');
	this.renderSettings.setShape(gl.TRIANGLES);

	//var posAttrib = gl.getAttribLocation(this.activeShaderProgram, 'pos');
	//gl.enableVertexAttribArray(posAttrib);
	//gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 0);
	//var texCoordAttrib = gl.getAttribLocation(this.activeShaderProgram, 'texCoord');
	//gl.enableVertexAttribArray(texCoordAttrib);
	//gl.vertexAttribPointer(texCoordAttrib, 2, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 2 * 4);
	//var angleAttrib = gl.getAttribLocation(this.activeShaderProgram, 'angle');
	//gl.enableVertexAttribArray(angleAttrib);
	//gl.vertexAttribPointer(angleAttrib, 1, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 4 * 4);
	//var scaleAttrib = gl.getAttribLocation(this.activeShaderProgram, 'scale');
	//gl.enableVertexAttribArray(scaleAttrib);
	//gl.vertexAttribPointer(scaleAttrib, 1, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 5 * 4);
	//var centreAttrib = gl.getAttribLocation(this.activeShaderProgram, 'centre');
	//gl.enableVertexAttribArray(centreAttrib);
	//gl.vertexAttribPointer(centreAttrib, 2, gl.FLOAT, false, this.activeVerts.dataPerVert * 4, 6 * 4);

	this.uvMap = {};
	this.strings = [];
	this.nextIndex = 0;
	this.charSet = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		'{', '}', '$', '&', '/', '?', '@', '\\', '[', ']', '|', '!', ';', '+', '*', '<', '>', '=', '^', ' '
					];
	this.charCount = this.charSet.length;
	this.charSize = 1 / this.charCount;

	this.init = function() {
		var preservedStrings = [];
		for (var i = 0; i < this.strings.length; i++) {
			if (this.strings[i].keep && this.strings[i].keepCount < 120) {
				preservedStrings.push(this.strings[i]);
				this.strings[i].keepCount += 1;
			}
		}
		this.strings = preservedStrings;
		this.nextIndex = this.strings.length;
	};

	this.setUpFont = function() {
		for (var i = 0; i < this.charCount; i++) {
			this.uvMap[this.charSet[i]] = {u1: i * this.charSize, u2: i * this.charSize + this.charSize, v1: 1, v2: 0};
		}
	}

	this.addString = function(charSequence, size, pos, preserve) {
		this.strings[this.nextIndex] = {text: charSequence, fontSize: size, x: pos.x, y: pos.y, keep: preserve};
		if (preserve) this.strings[this.nextIndex] = {text: charSequence, fontSize: size, x: pos.x, y: pos.y, keep: preserve, keepCount: 0};
		this.nextIndex++;
	};

	this.convertString = function(stringObj) {
        var uvList = [];
        for (var i = 0; i < stringObj.text.length; i++) {
            uvList[i] = this.uvMap[stringObj.text[i].toUpperCase()];
        }
        return uvList;
    };

	this.prepareForRendering = function() {
		this.transformedStrings = [];
		for (var i = 0; i < this.strings.length; i++) {
			var stringObj = this.strings[i];
			this.transformedStrings.push(this.convertString(stringObj));
		}
	};

	this.getVerts = function() {
		var verts = [];
		for (var i = 0; i < this.transformedStrings.length; i++) {
			var startPoint = new Vec2(this.strings[i].x, this.strings[i].y);
			var tempVerts = [];
			for (var j = 0; j < this.strings[i].text.length; j++) {
				tempVerts.push([
					startPoint.x + (this.strings[i].fontSize * j), startPoint.y, this.transformedStrings[i][j].u1, this.transformedStrings[i][j].v1, 0, 1, 0, 0,
					startPoint.x + (this.strings[i].fontSize * j) + this.strings[i].fontSize, startPoint.y, this.transformedStrings[i][j].u2, this.transformedStrings[i][j].v1, 0, 1, 0, 0,
					startPoint.x + (this.strings[i].fontSize * j) + this.strings[i].fontSize, startPoint.y + this.strings[i].fontSize, this.transformedStrings[i][j].u2, this.transformedStrings[i][j].v2, 0, 1, 0, 0,

					startPoint.x + (this.strings[i].fontSize * j) + this.strings[i].fontSize, startPoint.y + this.strings[i].fontSize, this.transformedStrings[i][j].u2, this.transformedStrings[i][j].v2, 0, 1, 0, 0,
					startPoint.x + (this.strings[i].fontSize * j), startPoint.y + this.strings[i].fontSize, this.transformedStrings[i][j].u1, this.transformedStrings[i][j].v2, 0, 1, 0, 0,
					startPoint.x + (this.strings[i].fontSize * j), startPoint.y, this.transformedStrings[i][j].u1, this.transformedStrings[i][j].v1, 0, 1, 0, 0
						        ]);
			}
			for (var k = 0; k < tempVerts.length; k++) {
				for (var l = 0; l < tempVerts[k].length; l++) {
					verts.push(tempVerts[k][l]);
				}
            }
		}
		var vertFloat32 = new Float32Array(verts.length);
		vertFloat32.set(verts, 0);
		return vertFloat32;
	};

	this.render = function() {
		if (this.strings.length == 0) {
			return;
		}

		this.prepareForRendering();
        this.renderer.addVerts('textVerts', this.getVerts(), 8);
        this.renderer.bufferVertsToVBO('textVerts', 'textVBO');
        this.renderer.bindVBO('textVBO');
        this.renderer.bindShaderProgram(this.shaderProgram);
        this.renderer.bindVerts('textVerts');

        this.renderer.render2D(true, this.renderSettings);
		this.init();
	}
};