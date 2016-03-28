var EntityManager = function(game) {
    //TODO this whole thing is an absolute travesty
    //Needs to work more like the renderer in that it assumes nothing and allows configuration
    this.ents = [];
    this.renderer = game.renderer;
    this.lman = game.lman;
    this.sman = game.sman
	this.removeList = [];
	this.addList = [];
	this.verts = [];
    this.renderSettings = new RendererSettings();

    var texPos = -1;
    while (texPos < 0) {
        texPos = this.renderer.createTexture('ent', 'res/img/ent.png');
    }
    var frag = _getFragShader('2d-textured');
    var vert = _getVertShader('2d-transform-textured');
    this.renderer.addShaderProgram('entProgram', [vert, frag]);

    this.shaderProgram = 'entProgram';
    this.vbo = this.renderer.addVBO('entVBO');

    this.renderSettings.addAttribute('pos', 2);
    this.renderSettings.addAttribute('texCoord', 2);
    this.renderSettings.addAttribute('angle', 1);
    this.renderSettings.addAttribute('scale', 1);
    this.renderSettings.addAttribute('centre', 2);
    this.renderSettings.addUniform("tex", texPos);
    this.renderSettings.setShape(gl.TRIANGLES);
    this.renderSettings.setTextureName("ent");

    this.verts = null;

	this.reset = function() {
        if (this.resetCoolDown) return;
		this.ents = [this.player];
		this.removeList = [];
		this.addList = [];
		this.verts = [];
	};

	this.checkEntCollision = function(e1, e2) {
		return (
            e1.pos.x < (e2.pos.x + e2.width) 
            &&
            (e1.pos.x + e1.width) > e2.pos.x
            &&
            e1.pos.y < (e2.pos.y + e2.height)
            && (e1.pos.y + e1.height) > e2.pos.y
        );
	};
    this.checkLvlCollision = function(e, p) {
        return (
            e.pos.x < (p.pos.x + p.width)
            &&
            (e.pos.x + e.width) > p.pos.x
            &&
            e.pos.y < (p.pos.y + p.height)
            &&
            (e.pos.y + e.height) > p.pos.y
        );
    };
    this.scanDown = function(e) {
        var t = new Entity(
            new Vec2(e.pos.x + (e.width / 4), e.pos.y - (e.height - 0.1)), 
            new Vec2(e.width / 2, 0.2),
                                    this, this.lman, this.sman);
        for (i = 0; i < this.lman.pieces.length; i++) {
            if (this.checkLvlCollision(t, this.lman.pieces[i])) {
                return true;
            }
        }
    };
    this.scanRight = function(e) {
        var t = new Entity(new Vec2(e.pos.x + (e.width - 0.1), e.pos.y + (e.height / 4)),
                    new Vec2(0.2, e.height / 2), 
                                            this, this.lman, this.sman);

        for (i = 0; i < this.lman.pieces.length; i++) {
            if (this.checkLvlCollision(t, this.lman.pieces[i])) {
                return true;
            }
        }
    }

    this.addPlayer = function(p) {
        //designed to be called on game init so ents list is empty
        this.player = p;
        this.addEnt(p);
    };
	this.addEnt = function(e) {
		this.addList.push(e);
	};
	this.removeEnt = function(e) {
		this.removeList.push(e);
	};
	this.addEntList = function(e) {
		for (var i = 0; i < e.length; i++) {
			this.addList.push(e[i]);
		}
	};
	this.removeEntList = function(e) {
		for (var i = 0; i < e.length; i++) {
			this.removeList.push(e[i]);
		}
	};

	this.addEnts = function() {
		for (var i = 0; i < this.addList.length; i++) {
            this.ents.push(this.addList[i]);
        }
        this.addList = [];
	};

	this.cleanEnts = function() {
		for (var i = 0; i < this.removeList.length; i++) {
            this.ents.splice(this.ents.indexOf(this.removeList[i]), 1);
        }
        this.removeList = [];

        if (this.ents.length == 0 && this.player.health > 0) {
            this.addEnt(this.player);
        }
	};

	this.render = function() {
        var renderer = this.renderer;

        var dataPerVert = 0;
        var vertSize = 0;
        for (var j = 0; j < this.ents.length; j++) {
            dataPerVert = this.ents[j].dataPerVert;
            vertSize += dataPerVert * this.ents[j].totalVerts;
        }

        this.verts = new Float32Array(vertSize);
        var off = 0;
        for (var i = 0; i < this.ents.length; i++) {
            if (this.ents[i].visible) {
                var newVerts = this.ents[i].getVerts();
                this.verts.set(newVerts, off);
                off += newVerts.length;
            }
        }
        renderer.addVerts("entVerts", this.verts, dataPerVert);
        renderer.bufferVertsToVBO('entVerts', 'lvlVBO');
        renderer.bindVBO('lvlVBO'); 
        this.renderer.bindVerts('entVerts');
        this.renderer.bindShaderProgram('entProgram');
        this.renderer.render2D(true, this.renderSettings);
	};

	this.update = function(delta) {
		for (var i = 0; i < this.ents.length; i++) {
            this.ents[i].update(delta);
            this.ents[i].tick();
            this.ents[i].move(delta);
        }

        var lvlPieces = this.lman.pieces;
        for (i = 0; i < this.ents.length; i++) {
            for (j = i + 1; j < this.ents.length; j++) {
                if (!this.ents[i].nocollideEnt && !this.ents[j].nocollideEnt) {
                    if (this.checkEntCollision(this.ents[i], this.ents[j])) {
                        this.ents[i].collidedWithEnt(this.ents[j]);
                        this.ents[j].collidedWithEnt(this.ents[i]);
                    }
                }
            }
            for (k = 0; k < lvlPieces.length; k++) {
                if (!lvlPieces[k].noCollideEnt && !this.ents[i].noCollideLvl) {
                    if (this.checkLvlCollision(this.ents[i], lvlPieces[k])) {
                        this.ents[i].collidedWithLvl(lvlPieces[k]);
                        lvlPieces[k].collidedWithEnt(this.ents[i]);
                    }
                }
            }
        }
        if (this.addList.length > 0) {
            this.addEnts();
        }
        if (this.removeList.length > 0) {
            this.cleanEnts();
        }
	};

    this.scaleAllEntities = function(scale) {
        for (var i = 0; i < this.ents.length; i++) {
            this.ents[i].scale(scale);
        }
    };
};