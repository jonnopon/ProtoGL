var EntityManagerNew = function(game) {
    this.renderer = game.renderer;
    this.ents = [];
    this.removeList = [];
    this.addList = [];
    this.verts = [];
    this.renderSettings = new RendererSettings();
    this.shaderProgramName = "entProgram";
    this.vboName = "entVBO";
    this.textureName = "entTex";

    this.renderer.addVBO(this.vboName);

    var texPos = this.renderer.createTexture(this.textureName, "res/img/ent.png");

    //TODO: temporary - needs to be configurable/adapt to actual entities in the system
    var frag = _getFragShader("2d-textured");
    var vert = _getVertShader("2d-transform-textured");
    this.renderer.addShaderProgram(this.shaderProgramName, [vert, frag]);
    this.renderSettings.addAttribute("pos", 2);
    this.renderSettings.addAttribute("texCoord", 2);
    this.renderSettings.addAttribute("angle", 1);
    this.renderSettings.addAttribute("scale", 1);
    this.renderSettings.addAttribute("centre", 2);
    this.renderSettings.addUniform("tex", texPos);
    this.renderSettings.addUniform("resX", game.resolution.x);
    this.renderSettings.addUniform("resY", game.resolution.y);
    this.renderSettings.setShape(gl.TRIANGLES);
    this.renderSettings.setTextureName(this.textureName);

    this.addEntity = function(e) {
        this.addList.push(e);
    };
    this.addEntityList = function(eList) {
        for (var i = 0; i < eList.length; i++) {
            this.addEntity(eList[i]);
        }
    };

    this.removeEntity = function(e) {
        this.removeList.push(e);
    };
    this.removeEntityList = function(eList) {
        for (var i = 0; i < eList.length; i++) {
            this.removeEntity(eList[i]);
        }
    };

    this.loadEnts = function() {
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
    };

    this.render = function() {
        //TODO
    };

    this.update = function() {
        //TODO - maybe not even necessary?
        if (this.addList.length) {
            this.loadEnts();
        }
        if (this.removeList.length) {
            this.cleanEnts();
        }
    };

    this.render = function() {
        //TODO: group entities and make multiple render calls changing renderSettings as necessary!
        //TODO: for now, assumes all entities have a 2D transform component and a sprite

        var renderer = this.renderer;

        var vertSize = (8 * 48) * this.ents.length;
        this.verts = new Float32Array(vertSize);
        var off = 0;

        for (var i = 0; i < this.ents.length; i++) {
            var pos = this.ents[i].components.transform2D.position;
            var dim = this.ents[i].components.transform2D.dimensions;
            var angle = this.ents[i].components.transform2D.angle;
            var scale = this.ents[i].components.transform2D.scale.x; //TODO: scale needs to be a vec2 not an int
            var center = new Vec2((pos.x + (pos.x + dim.x)) / 2, (pos.y + (pos.y + dim.y)) / 2);
            var spriteTL = this.ents[i].components.sprite.topLeft;
            var spriteBR = this.ents[i].components.sprite.bottomRight;

            var tempVerts = [
                pos.x, pos.y, spriteTL.x, spriteTL.y, angle, scale, center.x, center.y,
                pos.x + dim.x, pos.y, spriteBR.x, spriteTL.y, angle, scale, center.x, center.y,
                pos.x + dim.x, pos.y + dim.y, spriteBR.x, spriteBR.y, angle, scale, center.x, center.y,

                pos.x + dim.x, pos.y + dim.y, spriteBR.x, spriteBR.y, angle, scale, center.x, center.y,
                pos.x, pos.y + dim.y, spriteTL.x, spriteBR.y, angle, scale, center.x, center.y,
                pos.x, pos.y, spriteTL.x, spriteTL.y, angle, scale, center.x, center.y
            ];

            this.verts.set(tempVerts, off);
            off += tempVerts.length;
        }

        renderer.addVerts("entVerts", this.verts, 8);
        renderer.bufferVertsToVBO("entVerts", this.vboName);
        renderer.bindVBO(this.vboName);
        renderer.bindVerts("entVerts");
        renderer.bindShaderProgram(this.shaderProgramName);
        renderer.render2D(true, this.renderSettings);
    };

    this.getEntsWithComponent = function(component) {
        var matching = [];
        for (var i = 0; i < this.ents.length; i++) {
            if (this.ents[i].hasComponent(component.prototype.name)) {
                matching.push(this.ents[i]);
            }
        }

        return matching;
    };

    this.getEntsWithComponents = function(componentList) {
        var componentNames = [];
        for (var i = 0; i < componentList.length; i++) {
            componentNames.push(componentList[i].prototype.name);
        }

        var matching = [];
        for (var i = 0; i < this.ents.length; i++) {
            if (this.ents[i].hasComponents(componentNames)) {
                matching.push(this.ents[i]);
            }
        }

        return matching;
    };

    this.getAllEntities = function() {
        return this.ents;
    };

    this.clearAllEntities = function() {
        this.ents = [];
    };

    //TODO - more utilities? CheckEntCollision might not be necessary...
};