var TextManager = function(game) {
    this.renderer = game.renderer;
    this.shaderProgramName = 'textProgram';
    this.vboName = 'textVBO';
    this.textureName = 'font';

   	var texPos = -1;
    while (texPos < 0) {
        texPos = this.renderer.createTexture(this.textureName, 'res/img/font.png');
    }

    var frag = _getFragShader('2d-textured');
    var vert = _getVertShader('2d-transform-textured');
    this.renderer.addShaderProgram(this.shaderProgramName, [vert, frag]);

    this.renderer.addVBO(this.vboName);

	this.renderSettings = new RendererSettings();
	this.renderSettings.addAttribute('pos', 2);
	this.renderSettings.addAttribute('texCoord', 2);
	this.renderSettings.addAttribute('angle', 1);
	this.renderSettings.addAttribute('scale', 1);
	this.renderSettings.addAttribute('centre', 2);
	this.renderSettings.addUniform('tex', texPos);
	this.renderSettings.setTextureName(this.textureName);
	this.renderSettings.setShape(gl.TRIANGLES);

	this.uvMap = {};
	this.strings = [];
	this.charSet = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		'{', '}', '$', '&', '/', '?', '@', '\\', '[', ']', '|', '!', ';', '+', '*', '<', '>', '=', '^', ' '
					];
	this.charCount = this.charSet.length;
	this.charSize = 1 / this.charCount;

	for (var i = 0; i < this.charCount; i++) {
		this.uvMap[this.charSet[i]] = {u1: i * this.charSize, u2: i * this.charSize + this.charSize, v1: 1, v2: 0};
	}

	// this.init = function() {
	// 	for (var i = 0; i < this.strings.length; i++) {
	// 		if (this.strings[i].keep && this.strings[i].keepCount < 120) {
	// 			preservedStrings.push(this.strings[i]);
	// 			this.strings[i].keepCount += 1;
	// 		}
	// 	}
	// 	this.strings = preservedStrings;
	// 	this.nextIndex = this.strings.length;
	// };
	// this.setUpFont = function() {
	// }

	this.addString = function(charSequence, size, pos, preserve) {
		this.strings.push({text: charSequence, fontSize: size, x: pos.x, y: pos.y, keep: preserve});
	};

	this.flushStrings = function() {
		this.strings = [];
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
        this.renderer.bufferVertsToVBO('textVerts', this.vboName);
        this.renderer.bindVBO(this.vboName);
        this.renderer.bindShaderProgram(this.shaderProgramName);
        this.renderer.bindVerts('textVerts');

        this.renderer.render2D(true, this.renderSettings);
		this.flushStrings();
	};
};