var EntityManager = function(game) {
    this.renderer = game.renderer;
    this.ents = [];
    this.removeList = [];
    this.addList = [];
    this.verts = [];
    this.shaderProgramName = "entProgram";
    this.vboName = "entVBO";
    this.textureName = "entTex";

    this.renderer.addVBO(this.vboName);

    var texPos = this.renderer.createTexture(this.textureName, "res/img/ent.png");

    var frag = FRAGSHADERS["textured"];
    var vert = VERTSHADERS2D["transform-textured"];
    this.renderer.addShaderProgram(this.shaderProgramName, [vert, frag]);

    //TODO: temporary - needs to be configurable/adapt to actual entities in the system
    var config = new RenderSettings();
    config.addAttribute("pos", 2);
    config.addAttribute("texCoord", 2);
    config.addAttribute("angle", 1);
    config.addAttribute("scale", 1);
    config.addAttribute("centre", 2);
    config.addUniform("tex", texPos);
    config.addUniform("resX", game.resolution.x);
    config.addUniform("resY", game.resolution.y);
    config.setShape(gl.TRIANGLES);
    config.setTextureName(this.textureName);

    this.renderSettings = config;
};

EntityManager.prototype.addEntity = function(e) {
    this.addList.push(e);
};
EntityManager.prototype.addEntityList = function(eList) {
    for (var i = 0; i < eList.length; i++) {
        this.addEntity(eList[i]);
    }
};
EntityManager.prototype.removeEntity = function(e) {
    this.removeList.push(e);
};
EntityManager.prototype.removeEntityList = function(eList) {
    for (var i = 0; i < eList.length; i++) {
        this.removeEntity(eList[i]);
    }
};
EntityManager.prototype.loadEnts = function() {
    for (var i = 0; i < this.addList.length; i++) {
        this.ents.push(this.addList[i]);
    }
    this.addList = [];
};
EntityManager.prototype.cleanEnts = function() {
    for (var i = 0; i < this.removeList.length; i++) {
        this.ents.splice(this.ents.indexOf(this.removeList[i]), 1);
    }
    this.removeList = [];
};
EntityManager.prototype.update = function() {
    for (var i = 0; i < this.ents.length; i++) {
        if (this.ents[i].onUpdate !== null) {
            this.ents[i].onUpdate();
        }
    }

    if (this.addList.length) {
        this.loadEnts();
    }
    if (this.removeList.length) {
        this.cleanEnts();
    }
};
EntityManager.prototype.render = function() {
    //TODO: group entities and make multiple render calls changing renderSettings as necessary!
    //TODO: for now, only deals with entities that have a 2D transform component and a sprite

    var renderer = this.renderer;

    var spriteEnts = this.getEntsWithComponents([Sprite, Transform2D]);

    var vertSize = (8 * 6) * spriteEnts.length;
    this.verts = new Float32Array(vertSize);
    var off = 0;

    for (var i = 0; i < spriteEnts.length; i++) {
        var pos = spriteEnts[i].components.transform2D.position;
        var dim = spriteEnts[i].components.transform2D.dimensions;
        var angle = spriteEnts[i].components.transform2D.angle;
        var scale = spriteEnts[i].components.transform2D.scale.x; //TODO: scale needs to be a vec2 not an int/float
        var center = new Vec2((pos.x + (pos.x + dim.x)) / 2, (pos.y + (pos.y + dim.y)) / 2);
        var spriteTL = spriteEnts[i].components.sprite.topLeft;
        var spriteBR = spriteEnts[i].components.sprite.bottomRight;

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
EntityManager.prototype.getEntsWithComponent = function(component) {
    var matching = [];
    for (var i = 0; i < this.ents.length; i++) {
        if (this.ents[i].hasComponent(component.prototype.name)) {
            matching.push(this.ents[i]);
        }
    }

    return matching;
};
EntityManager.prototype.getEntsWithComponents = function(componentList) {
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
EntityManager.prototype.getEntsWithTag = function(tag) {
    var matching = [];
    for (var i = 0; i < this.ents.length; i++) {
        if (this.ents[i].tag === tag) {
            matching.push(this.ents[i]);
        }
    }

    return matching;
};
EntityManager.prototype.getAllEntities = function() {
    return this.ents;
};
EntityManager.prototype.clearAllEntities = function() {
    this.ents = [];
};
//TODO - more utilities? CheckEntCollision might not be necessary...