var TextManager = function() {
    this.renderer = GAME.renderer;
    this.shaderProgramName = 'textProgram';
    this.vboName = 'textVBO';
    this.textureName = 'font';
    this.counter = 0;

   	var texPos = -1;
    while (texPos < 0) {
        texPos = this.renderer.createTexture(this.textureName, 'res/img/font.png');
    }

    var vert = VERTSHADERS2D["transform-textured-colored"];
    var frag = FRAGSHADERS["textured-colored"];
    var textShader = {
        name: "textShader",
        vertSrc: vert.src,
        fragSrc: frag,
        attributes: vert.attributes,
        uniforms: vert.uniforms
    };
    GAME.addShader(textShader);

    this.renderer.addVBO(this.vboName);
    
    var config = new RenderSettings();
    config.setShader(textShader.name);
    config.setShape(gl.TRIANGLES);
    config.setTextureName(this.textureName);
    config.addAttributes(textShader.attributes);
    config.addUniforms(textShader.uniforms);
    
    this.renderSettings = config;

	this.uvMap = {};
	this.strings = [];
	this.charSet = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '(', ')', '[', ']', '+', '-', '*', '/', '!', '?', '\'', '"', '#', '£', '$', '&', '%', '^', ',', '.', ':', ';', '<', '>', '_',
        ' ', '~', '~'
					];
	this.charCount = this.charSet.length;
	this.charSize = 1 / this.charCount;

	for (var i = 0; i < this.charCount; i++) {
		this.uvMap[this.charSet[i]] = {u1: i * this.charSize, u2: i * this.charSize + this.charSize, v1: 1, v2: 0};
	}
};

TextManager.prototype.addString = function(text, align, size, pos, col, angle, persist, flashing, flashFrames, flashCol, flashScale) {
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
        var str = {
            text: lines[i],
            align: alignInt,
            fontSize: size,
            x: pos.x,
            y: pos.y - (i * size * 1.1),
            r: col.x,
            g: col.y,
            b: col.z,
            a: col.w,
            angle: angle,
            persist: persist
            
        }
        if (flashing) {
            str.flashing = flashing,
            str.flashFrames = flashFrames;
            str.lastFlash = 0,
            str.flashR = flashCol.x,
            str.flashG = flashCol.y,
            str.flashB = flashCol.z,
            str.flashA = flashCol.w,
            str.flashScale = flashScale;
            str.on = false;
            str.frames = 0;
        }
        
        this.strings.push(str);
    }
};
TextManager.prototype.flushStrings = function() {
    newStrings = [];
    for (var i = 0; i < this.strings.length; i++) {
        if (this.strings[i].persist) {
            newStrings.push(this.strings[i]);
        }
    }
    this.strings = newStrings;
};
TextManager.prototype.flushPersistentStrings = function() {
    this.strings = [];
};
TextManager.prototype.convertString = function(stringObj) {
    var uvList = [];
    for (var i = 0; i < stringObj.text.length; i++) {
        uvList[i] = this.uvMap[stringObj.text[i].toUpperCase()];
    }
    return uvList;
};
TextManager.prototype.prepareForRendering = function() {
    this.transformedStrings = [];
    for (var i = 0; i < this.strings.length; i++) {
        var stringObj = this.strings[i];
        this.transformedStrings.push(this.convertString(stringObj));
    }
};
TextManager.prototype.constructVerts = function() {
    var verts = [];
    for (var i = 0; i < this.transformedStrings.length; i++) {
        var s = this.strings[i];
        var flashes = s.flashing || false;

        var r = s.r;
        var g = s.g;
        var b = s.b;
        var a = s.a;
        var fontSize = s.fontSize;

        if (flashes) {
            if (s.frames % s.flashFrames === 0 || s.frames - s.lastFlash === s.flashFrames) {
                s.on = !s.on;
                s.lastFlash = s.frames;
            }
            s.frames++;

            if (s.on) {
                r = s.flashR;
                g = s.flashG;
                b = s.flashB;
                a = s.flashA;
                fontSize *= s.flashScale;
            }
        }

        var stringWidth = s.text.length * fontSize;
        var startPoint = null;
        var stringCenter = null;

        switch (s.align) {
            case -1:
                startPoint = new Vec2(s.x, s.y - (fontSize / 2));
                stringCenter = new Vec2(s.x + (stringWidth / 2), s.y + (fontSize / 2))
                break;
            case 0:
                startPoint = new Vec2(s.x - (stringWidth / 2), s.y - (fontSize / 2));
                stringCenter = new Vec2(s.x, s.y + (fontSize / 2))
                break;
            case 1:
                startPoint = new Vec2(s.x - stringWidth, s.y - (fontSize / 2));
                stringCenter = new Vec2(s.x - (stringWidth / 2), s.y + (fontSize / 2));
                break;
        }
        var tempVerts = [];

        var angle = this.strings[i].angle;

        for (var j = 0; j < this.strings[i].text.length; j++) {
            var u1 = this.transformedStrings[i][j].u1;
            var u2 = this.transformedStrings[i][j].u2;
            var v1 = this.transformedStrings[i][j].v1;
            var v2 = this.transformedStrings[i][j].v2;
            tempVerts.push([
                startPoint.x + (fontSize * j), startPoint.y, u1, v1, r, g, b, a, angle, 1, stringCenter.x, stringCenter.y,
                startPoint.x + (fontSize * j) + fontSize, startPoint.y, u2, v1, r, g, b, a, angle, 1, stringCenter.x, stringCenter.y,
                startPoint.x + (fontSize * j) + fontSize, startPoint.y + fontSize, u2, v2, r, g, b, a, angle, 1, stringCenter.x, stringCenter.y,

                startPoint.x + (fontSize * j) + fontSize, startPoint.y + fontSize, u2, v2, r, g, b, a, angle, 1, stringCenter.x, stringCenter.y,
                startPoint.x + (fontSize * j), startPoint.y + fontSize, u1, v2, r, g, b, a, angle, 1, stringCenter.x, stringCenter.y,
                startPoint.x + (fontSize * j), startPoint.y, u1, v1, r, g, b, a, angle, 1, stringCenter.x, stringCenter.y
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
TextManager.prototype.render = function() {
    if (this.strings.length == 0) {
        return;
    }

    this.prepareForRendering();
    this.renderer.addVerts('textVerts', this.constructVerts(), 12);
    this.renderer.bufferVertsToVBO('textVerts', this.vboName);
    this.renderer.bindVBO(this.vboName);
    this.renderer.bindShaderProgram(this.shaderProgramName);
    this.renderer.bindVerts('textVerts');

    this.renderer.render2D(true, this.renderSettings);
    this.flushStrings();
};