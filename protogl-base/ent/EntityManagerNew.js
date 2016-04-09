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
    this.renderSettings.addAttribute("centre", 1);
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

    //TODO - more utilities? CheckEntCollision might not be necessary...
};