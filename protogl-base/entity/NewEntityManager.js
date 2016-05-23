var EntityManager = function() {
    this.renderer = GAME.renderer;
    this.ents = [];
    this.removeList = [];
    this.addList = [];
    this.vboName = "entVBO";
    this.textureName = "entTex";

    this.renderer.addVBO(this.vboName);

    //TODO: as part of texture reimplementation
    // this.texPos = this.renderer.createTexture(this.textureName, "res/img/entity.png");
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

    //TODO MIX 2D AND 3D VARIANTS? OR GIVE THEM THE SAME NAME AND THUS GENERIFY THEM? ideas ideas
    var renderables = this.getAllEntsWithComponents([Transform2D, Shape, Shader]);
    var renderables = renderables.concat(this.getAllEntsWithComponents([Transform3D, Shape, Shader]));

    var shaders = this.groupEntsByShader(renderables);
    var shaderNames = Object.keys(shaders);

    for (var i = 0; i < shaderNames.length; i++) {
        var name = shaderNames[i];

        var shaderProgram = shaders[name][0].components.shader.shaderData;
        var globalUniforms = shaderProgram.globalUniforms;
        var instanceUniforms = shaderProgram.instanceUniforms;
        var instanceUniformKeys = Object.keys(instanceUniforms);
        var instanceUniformsActual = {};
        var attributes = shaderProgram.attributes;
        var attributeKeys = Object.keys(attributes);
        
        renderer.useShaderProgram(shaderProgram.name);
        renderer.loadUniforms(globalUniforms);

        var ents = shaders[name];

        //TODO: FUTURE: TRANSPARENT/NON-TRANSPARENT?
        //TODO: REIMPLEMENT TEXTURE SUPPORT
        var textured = this.getEntsWithComponentFrom(Sprite, ents);
        var nontextured = this.getEntsWithComponentFrom(FlatColor, ents);

        //SHOULD THESE BE SPLIT SUCH? PROBABLY NOT

        for (var i = 0; i < nontextured.length; i++) {
            //for every ENTITY
            var e = nontextured[i];
            var transform = e.components.transform2D;
            var glShape = e.components.shape.glShape;
            var geometryVerts = e.components.shape.geometry; //TODO: geometry might change in structure
            var verts = [];

            for (var j = 0; j < geometryVerts.length; j++) {
                //for every vertex, build an array of values representing this vertex's attributes

                for (var k = 0; k < attributeKeys.length; k++) {
                    //for every attribute, add the attribute value for this entity onto the array
                    verts = verts.concat(this.getShaderValueFromEntity(attributeKeys[k], e, geometryVerts[j]));
                }
            }

            for (var k = 0; k < instanceUniformKeys.length; k++) {
                //for every uniform, add the attribute value for this onto the array
                var key = instanceUniformKeys[k];
                var type = instanceUniforms[key];

                var value = this.getShaderValueFromEntity(key, e, geometryVerts[j]);
                var vF32 = new Float32Array(value.length);
                vF32.set(value, 0);
                value = vF32;

                instanceUniformsActual[key] = { value: value, type: type };
            }

            var vertsFloat32 = new Float32Array(verts.length);
            vertsFloat32.set(verts, 0);
            renderer.bufferVertsToVBO(vertsFloat32, this.vboName);
            renderer.setShader(shaderProgram.dataPerVert, attributes, instanceUniformsActual);
            renderer.render(glShape, geometryVerts.length);
        }
    }

    //TODO: REMOVE
    console.log(this.ents.length);
};
EntityManager.prototype.getShaderValueFromEntity = function(key, ent, geometryVert) {
    if (key === "pos2D" || key === "pos3D") {
        return geometryVert.asArray();
    }
    else {
        var path = ENTITY_ATTRIBUTE_MAP[key];

        //TODO; if null there is no entry and the property cannot be found (error checking!!!!!!)

        var component = ent.components[path.component];
        var property = component[path.property];
        var value = null;

        if (property) {
            if (property instanceof Vec3 ||
                property instanceof Vec2 ||
                property instanceof Vec4) {

                value = property.asArray();
            }
            else if (property instanceof Mat3 ||
                     property instanceof Mat4) {

                value = property.values;
            }
            else {
                value = [property];
            }

            return value;
        }
    }
};
EntityManager.prototype.groupEntsByShader = function(ents) {
    var groupedEnts = {};
    for (var i = 0; i < ents.length; i++) {
        if (!groupedEnts[ents[i].components.shader.shaderData.name]) {
            groupedEnts[ents[i].components.shader.shaderData.name] = [];
        }
        groupedEnts[ents[i].components.shader.shaderData.name].push(ents[i]);
    }
    return groupedEnts;
};
EntityManager.prototype.groupEntsByShape = function(ents) {
    var groupedEnts = {};
    for (var i = 0; i < ents.length; i++) {
        if (!groupedEnts[ents[i].components.shape.glShape]) {
            groupedEnts[ents[i].components.shape.glShape] = [];
        }
        groupedEnts[ents[i].components.shape.glShape].push(ents[i]);
    }
    return groupedEnts;
};
EntityManager.prototype.getEntsWithComponentFrom = function(component, ents) {
    var matching = [];
    for (var i = 0; i < ents.length; i++) {
        if (ents[i].hasComponent(component.prototype.name)) {
            matching.push(ents[i]);
        }
    }

    return matching;
};
EntityManager.prototype.getEntsWithComponentsFrom = function(componentList, ents) {
    var componentNames = [];
    for (var i = 0; i < componentList.length; i++) {
        componentNames.push(componentList[i].prototype.name);
    }

    var matching = [];
    for (var i = 0; i < ents.length; i++) {
        if (ents[i].hasComponents(componentNames)) {
            matching.push(ents[i]);
        }
    }

    return matching;
};
EntityManager.prototype.getAllEntsWithComponent = function (component) {
    var matching = [];
    for (var i = 0; i < this.ents.length; i++) {
        if (this.ents[i].hasComponent(component.prototype.name)) {
            matching.push(this.ents[i]);
        }
    }

    return matching;
};
EntityManager.prototype.getAllEntsWithComponents = function (componentList) {
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
EntityManager.prototype.getAllEntsWithTag = function (tag) {
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