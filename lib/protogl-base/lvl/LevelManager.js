var LevelManager = function(game) {
    //TODO can likely get rid of this in favour of having level pieces just be entities
    //Other than this concern, similarities between level and entity are intentional

    //TODO make this and the entity manager configurable; no assuming textures etc
    this.pieces = [];
    this.removeList = [];
    this.addList = [];
    this.renderer = game.renderer;
    this.renderSettings = new RendererSettings();

    var texPos = -1;
    while (texPos < 0) {
        texPos = this.renderer.createTexture('lvl', 'res/img/lvl.png');
    }
    var frag = _getFragShader('2d-textured');
    var vert = _getVertShader('2d-transform-textured');
    this.renderer.addShaderProgram('lvlProgram', [vert, frag]);

    this.shaderProgram = 'lvlProgram';
    this.vbo = this.renderer.addVBO('lvlVBO');

    this.renderSettings.addAttribute('pos', 2);
    this.renderSettings.addAttribute('texCoord', 2);
    this.renderSettings.addAttribute('angle', 1);
    this.renderSettings.addAttribute('scale', 1);
    this.renderSettings.addAttribute('centre', 2);
    this.renderSettings.addUniform("tex", texPos);
    this.renderSettings.setShape(gl.TRIANGLES);
    this.renderSettings.setTextureName("lvl");

    this.verts = null;

    this.reset = function() {
        this.pieces = [];
        this.removeList = [];
        this.addList = [];
        this.verts = [];
    };
    this.addPiece = function(p) {
        this.addList.push(p);
    };
    this.removePiece = function(p) {
        this.removeList.push(p);
    };
    this.addPieceList = function(p) {
        for (var i = 0; i < p.length; i++) {
            this.addList.push(p[i]);
        }
    };
    this.removePieceList = function(p) {
        for (var i = 0; i < p.length; i++) {
            this.removeList.push(p[i]);
        }
    };

    this.addPieces = function() {
        for (var i = 0; i < this.addList.length; i++) {
            this.pieces.push(this.addList[i]);
        }
        this.addList = [];
    };

    this.cleanPieces = function() {
        for (var i = 0; i < this.removeList.length; i++) {
            this.pieces.splice(this.pieces.indexOf(this.removeList[i]), 1);
        }
        this.removeList = [];
    };

    this.render = function() {
        var renderer = this.renderer;

        var dataPerVert = 0;
        var vertSize = 0;
        for (var j = 0; j < this.pieces.length; j++) {
            dataPerVert = this.pieces[j].dataPerVert;
            vertSize += dataPerVert * this.pieces[j].totalVerts;
        }

        this.verts = new Float32Array(vertSize);
        var off = 0;
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].visible) {
                var newVerts = this.pieces[i].getVerts();
                this.verts.set(newVerts, off);
                off += newVerts.length;
            }
        }
        renderer.addVerts("lvlVerts", this.verts, dataPerVert)
        renderer.bufferVertsToVBO('lvlVerts', 'lvlVBO');
        renderer.bindVBO('lvlVBO'); 
        this.renderer.bindVerts('lvlVerts');
        this.renderer.bindShaderProgram('lvlProgram');
        this.renderer.render2D(true, this.renderSettings);
    };

    this.update = function(delta) {
        for (var i = 0; i < this.pieces.length; i++) {
            this.pieces[i].update(delta);
            this.pieces[i].tick();
            this.pieces[i].move(delta);
        }
        
        if (this.addList.length > 0) {
            this.addPieces();
        }
        if (this.removeList.length > 0) {
            this.cleanPieces();
        }
    };

    this.scaleAllLevelPieces = function(scale) {
        for (var i = 0; i < this.pieces.length; i++) {
            this.pieces[i].scale(scale);
        }
    };
};