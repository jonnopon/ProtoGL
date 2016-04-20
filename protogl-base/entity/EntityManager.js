var EntityManager = function() {
    this.renderer = GAME.renderer;
    this.ents = [];
    this.removeList = [];
    this.addList = [];
    // this.verts = [];
    this.flatShaderProgram = "flatShaderProgram";
    this.spriteShaderProgram = "spriteShaderProgram";
    this.flatVBOName = "flatVBO";
    this.spriteVBOName = "spriteVBO";
    this.textureName = "entTex";

    this.renderer.addVBO(this.flatVBOName);
    this.renderer.addVBO(this.spriteVBOName);

    this.texPos = this.renderer.createTexture(this.textureName, "res/img/entity.png");

    var vert = VERTSHADERS2D["transform-colored"];
    var frag = FRAGSHADERS["colored"];
    this.renderer.addShaderProgram(this.flatShaderProgram, [vert, frag]);

    vert = VERTSHADERS2D["transform-textured"];
    frag = FRAGSHADERS["textured"];
    this.renderer.addShaderProgram(this.spriteShaderProgram, [vert, frag]);
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
    var renderer = this.renderer;

    this.renderFlats(this.getEntsWithComponents([FlatColor, Transform2D]));
    this.renderSprites(this.getEntsWithComponents([Sprite, Transform2D]));
};
EntityManager.prototype.renderFlats = function(flatEnts) {
    var renderer = this.renderer;
    var dataPerVert = 0;
    var verts = [];
    var grouped = this.groupEntsByShape(flatEnts);

    for (var i = 0; i < Object.keys(grouped).length; i++) {
        var glShape = Object.keys(grouped)[i];
        // var glShape = Object.keys(grouped)[i].toString();
        verts = [];

        var config = new RenderSettings();
        config.addAttribute("pos", 2);
        config.addAttribute("col", 4);
        config.addAttribute("angle", 1);
        config.addAttribute("scale", 1);
        config.addAttribute("centre", 2);
        config.addUniform("resX", GAME.resolution.x);
        config.addUniform("resY", GAME.resolution.y);
        config.setShape(glShape);

        for (var j = 0; j < grouped[glShape].length; j++) {
            var e = grouped[glShape][j];
            var color = e.components.flatColor.color;
            var shape = e.components.shape;
            var pos = e.components.transform2D.position;
            var angle = e.components.transform2D.angle;
            var scale = e.components.transform2D.scale.x;
            var geometryData = _getGeometry(shape.shapeName, pos, shape.dimensions, false, null, 50);
            var vertList = geometryData.vertList;

            //shader in use - transform-colored
            //attributes: vec 2 pos, vec4 col, float angle, float scale, vec2 centre
            //uniforms: resX resY

            if (glShape === "6") {
                //TODO: messy but have to render strips in single calls
                var tempVerts = [];
                var tempDataPerVert = 0;
                for (var p = 0; p < vertList.length; p++) {
                    var list = [vertList[p].x, vertList[p].y, color.x, color.y, color.z, color.w, angle, scale, pos.x, pos.y]
                    tempVerts = tempVerts.concat(list);
                    tempDataPerVert = list.length;
                }

                var vertsToSend = new Float32Array(tempVerts.length);
                vertsToSend.set(tempVerts, 0);
                renderer.addVerts("flatVerts", vertsToSend, dataPerVert);
                renderer.bufferVertsToVBO("flatVerts", this.flatVBOName);
                renderer.bindVBO(this.flatVBOName);
                renderer.bindVerts("flatVerts");
                renderer.bindShaderProgram(this.flatShaderProgram);
                renderer.render2D(true, config);
            }
            else {
                var off = 0;
                for (var k = 0; k < vertList.length; k++) {
                    var list = [vertList[k].x, vertList[k].y, color.x, color.y, color.z, color.w, angle, scale, pos.x, pos.y]
                    verts = verts.concat(list);
                    dataPerVert = list.length;
                }
            }
        }

        var vertsToSend = new Float32Array(verts.length);
        vertsToSend.set(verts, 0);
        renderer.addVerts("flatVerts", vertsToSend, dataPerVert);
        renderer.bufferVertsToVBO("flatVerts", this.flatVBOName);
        renderer.bindVBO(this.flatVBOName);
        renderer.bindVerts("flatVerts");
        renderer.bindShaderProgram(this.flatShaderProgram);
        renderer.render2D(true, config);
    }
};
EntityManager.prototype.renderSprites = function(spriteEnts) {
    var renderer = this.renderer;
    var dataPerVert = 0;
    var verts = [];
    var grouped = this.groupEntsByShape(spriteEnts);

    for (var i = 0; i < Object.keys(grouped).length; i++) {
        var glShape = Object.keys(grouped)[i];
        verts = [];

        for (var j = 0; j < grouped[glShape].length; j++) {
            var e = spriteEnts[j];
            var pos = e.components.transform2D.position;
            var shape = e.components.shape;
            var angle = e.components.transform2D.angle;
            var scale = e.components.transform2D.scale.x; //TODO: scale needs to be a vec2 not an int/float
            var geometryData = _getGeometry(shape.shapeName, pos, shape.dimensions, true, e.components.sprite)
            var vertList = geometryData.vertList;
            var texList = geometryData.texList;

            //shader in use - transform-textured
            //attributes: vec2 pos, vec2 tex, float angle, float scale, vec2 centre
            //uniforms: resX resY
            var off = 0;
            for (var k = 0; k < vertList.length; k++) {
                var list = [vertList[k].x, vertList[k].y, texList[k].x, texList[k].y, angle, scale, pos.x, pos.y]
                verts = verts.concat(list);
                dataPerVert = list.length;
            }
        }

        var config = new RenderSettings();
        config.addAttribute("pos", 2);
        config.addAttribute("texCoord", 2);
        config.addAttribute("angle", 1);
        config.addAttribute("scale", 1);
        config.addAttribute("centre", 2);
        config.addUniform("tex", this.texPos);
        config.addUniform("resX", GAME.resolution.x);
        config.addUniform("resY", GAME.resolution.y);
        config.setShape(glShape);
        config.setTextureName(this.textureName);

        var vertsToSend = new Float32Array(verts.length);
        vertsToSend.set(verts, 0);
        renderer.addVerts("spriteVerts", verts, dataPerVert);
        renderer.bufferVertsToVBO("spriteVerts", this.spriteVBOName);
        renderer.bindVBO(this.spriteVBOName);
        renderer.bindVerts("spriteVerts");
        renderer.bindShaderProgram(this.spriteShaderProgram);
        renderer.render2D(true, config);
    }
};
EntityManager.prototype.groupEntsByShape = function(ents) {
    groupedEnts = {};
    for (var i = 0; i < ents.length; i++) {
        if (!groupedEnts[ents[i].components.shape.glShape]) {
            groupedEnts[ents[i].components.shape.glShape] = [];
        }
        groupedEnts[ents[i].components.shape.glShape].push(ents[i]);
    }
    return groupedEnts;
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