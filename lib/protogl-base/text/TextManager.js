var TextManager = function(game) {
    this.renderer = game.renderer;
    this.shaderProgramName = 'textProgram';
    this.vboName = 'textVBO';
    this.textureName = 'font';

   	var texPos = -1;
    while (texPos < 0) {
        texPos = this.renderer.createTexture(this.textureName, 'res/img/font.png');
    }

    var frag = _getFragShader('2d-textured-colored');
    var vert = _getVertShader('2d-transform-textured-colored');
    this.renderer.addShaderProgram(this.shaderProgramName, [vert, frag]);

    this.renderer.addVBO(this.vboName);

	this.renderSettings = new RendererSettings();
	this.renderSettings.addAttribute('pos', 2);
	this.renderSettings.addAttribute('texCoord', 2);
    this.renderSettings.addAttribute('col', 3);
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
		'{', '}', '$', '&', '/', '?', '@', '\\', '[', ']', '|', '!', ';', '+', '*', '<', '>', '=', '^', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
					];
	this.charCount = this.charSet.length;
	this.charSize = 1 / this.charCount;

	for (var i = 0; i < this.charCount; i++) {
		this.uvMap[this.charSet[i]] = {u1: i * this.charSize, u2: i * this.charSize + this.charSize, v1: 1, v2: 0};
	}

	this.addString = function(text, align, size, pos, col, angle) {
        var alignInt = null;
        if (angle !== 0) {
            //override if you're rotating text I want to cancel the orientation because the startPos is also rotated
            //This can look weird and behave unexpectedly for anything other than left-aligned text.
            alignInt = -1;
        }
        else {
            switch (align) {
                case 'left':
                    alignInt = -1;
                    break;
                case 'center':
                    alignInt = 0;
                    break;
                case 'right':
                    alignInt = 1;
                    break;
                default:
                    //default to center-alignment
                    alignInt = 0;
            }
        }

        var lines = text.split("\\n");
        for (var i = 0; i < lines.length; i++) {
            this.strings.push(
                {
                    text: lines[i],
                    align: alignInt,
                    fontSize: size,
                    x: pos.x,
                    y: pos.y - (i * size * 1.1),
                    r: col.x,
                    g: col.y,
                    b: col.z,
                    angle: angle
                }
            );
        }
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
            var fontSize = this.strings[i].fontSize;
            var stringWidth = this.strings[i].text.length * fontSize;

            var startPoint = null;
            var stringCenter = null;
            switch (this.strings[i].align) {
                case -1:
                    startPoint = new Vec2(this.strings[i].x, this.strings[i].y - (fontSize / 2));
                    stringCenter = new Vec2(this.strings[i].x + (stringWidth / 2), this.strings[i].y + (fontSize / 2))
                    break;
                case 0:
                    startPoint = new Vec2(this.strings[i].x - (stringWidth / 2), this.strings[i].y - (fontSize / 2));
                    stringCenter = new Vec2(this.strings[i].x, this.strings[i].y + (fontSize / 2))
                    break;
                case 1:
                    startPoint = new Vec2(this.strings[i].x - stringWidth, this.strings[i].y - (fontSize / 2));
                    stringCenter = new Vec2(this.strings[i].x - (stringWidth / 2), this.strings[i].y + (fontSize / 2));
                    break;
                default:

            }

            var r = this.strings[i].r;
            var g = this.strings[i].g;
            var b = this.strings[i].b;
            var tempVerts = [];

			var angle = this.strings[i].angle;

			for (var j = 0; j < this.strings[i].text.length; j++) {
                var u1 = this.transformedStrings[i][j].u1;
                var u2 = this.transformedStrings[i][j].u2;
                var v1 = this.transformedStrings[i][j].v1;
                var v2 = this.transformedStrings[i][j].v2;
				tempVerts.push([
					startPoint.x + (fontSize * j), startPoint.y, u1, v1, r, g, b, angle, 1, stringCenter.x, stringCenter.y,
					startPoint.x + (fontSize * j) + fontSize, startPoint.y, u2, v1, r, g, b, angle, 1, stringCenter.x, stringCenter.y,
					startPoint.x + (fontSize * j) + fontSize, startPoint.y + fontSize, u2, v2, r, g, b, angle, 1, stringCenter.x, stringCenter.y,

					startPoint.x + (fontSize * j) + fontSize, startPoint.y + fontSize, u2, v2, r, g, b, angle, 1, stringCenter.x, stringCenter.y,
					startPoint.x + (fontSize * j), startPoint.y + fontSize, u1, v2, r, g, b, angle, 1, stringCenter.x, stringCenter.y,
					startPoint.x + (fontSize * j), startPoint.y, u1, v1, r, g, b, angle, 1, stringCenter.x, stringCenter.y
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
        this.renderer.addVerts('textVerts', this.getVerts(), 11);
        this.renderer.bufferVertsToVBO('textVerts', this.vboName);
        this.renderer.bindVBO(this.vboName);
        this.renderer.bindShaderProgram(this.shaderProgramName);
        this.renderer.bindVerts('textVerts');

        this.renderer.render2D(true, this.renderSettings);
		this.flushStrings();
	};
};