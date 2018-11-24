var EntityManager = function() {
    this.renderer = GAME.renderer;
    this.ents = [];
    this.removeList = [];
    this.addList = [];
    this.vboName = "entVBO";
    this.textureName = "entTex";

    // this.lastShaderProgram = null;

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
        if (this.ents[i].onUpdate) {
            this.ents[i].onUpdate();
        }

        if (GAME.displayStats && this.ents[i].arrows === undefined && this.ents[i].tag !== "arrow") {
            this.addAxesFor3DEntity(this.ents[i]);
        }
        else if (!GAME.displayStats && this.ents[i].arrows !== undefined) {
            this.removeAxesFor3DEntity(this.ents[i]);
        }

        // if (GAME.displayStats && this.ents[i].components.shape !== undefined && this.ents[i].normals === undefined && this.ents[i].tag !== "normal") {
        //     this.addNormalsFor3DEntity(this.ents[i]);
        // }
        // else if (!GAME.displayStats && this.ents[i].normals !== undefined) {
        //     this.removeNormalsFor3DEntity(this.ents[i]);
        // }
    }

    if (this.addList.length) {
        this.loadEnts();
    }
    if (this.removeList.length) {
        this.cleanEnts();
    }
};
EntityManager.prototype.render = function(ents) {
    var renderer = this.renderer;
    
    var ents = ents || this.ents;

    //TODO MIX 2D AND 3D VARIANTS? OR GIVE THEM THE SAME NAME AND THUS GENERIFY THEM? ideas ideas
    var renderables = this.getEntsWithComponentsFrom([Transform2D, Shape, Shader], ents);
    var renderables = renderables.concat(this.getEntsWithComponentsFrom([Transform3D, Shape, Shader], ents));

    var config = new RenderConfig();
    for (var i = 0; i < renderables.length; i++) {
        var e = renderables[i];

        //PROBABLY A MORE ELEGANT WAY OF DOING THIS
        // if (e.components.transform2D) {
        //     this.computeMatrix2D(e);
        // }
        // else if (e.components.transform3D) {
        //     this.computeMatrix3D(e);
        // }

        //TODO GOTTA MODIFY THIS TO THE NEW SHADER STANDARD
        var glShape = e.components.shape.glShape;
        var geometryVerts = e.components.shape.geometry; //TODO: geometry might change in structure
        var normals = e.components.shape.normals;
        var shaderProgram = e.components.shader.shaderData;

        var vertGlobalUniforms = shaderProgram.vertUniforms.global || {};
        var fragGlobalUniforms = shaderProgram.fragUniforms.global || {};

        config.setShader(shaderProgram.name, vertGlobalUniforms, fragGlobalUniforms, shaderProgram.attributes, shaderProgram.dataPerVert);

        var vertInstanceUniforms = shaderProgram.vertUniforms.instance || {};
        var fragInstanceUniforms = shaderProgram.fragUniforms.instance || {};

        var vertInstanceUniformKeys = Object.keys(vertInstanceUniforms);
        var vertInstanceUniformsActual = {};
        for (var j = 0; j < vertInstanceUniformKeys.length; j++) {
            var key = vertInstanceUniformKeys[j];
            var type = vertInstanceUniforms[key];

            var value = this.getShaderValueFromEntity(key, e, geometryVerts[j]);
            var vF32 = new Float32Array(value.length);
            vF32.set(value, 0);
            value = vF32;

            vertInstanceUniformsActual[key] = {value: value, type: type};
        }

        var fragInstanceUniformKeys = Object.keys(fragInstanceUniforms);
        var fragInstanceUniformsActual = {};
        for (var j = 0; j < fragInstanceUniformKeys.length; j++) {
            var key = fragInstanceUniformKeys[j];
            var type = fragInstanceUniforms[key];

            var value = this.getShaderValueFromEntity(key, e, geometryVerts[j]);
            var vF32 = new Float32Array(value.length);
            vF32.set(value, 0);
            value = vF32;

            fragInstanceUniformsActual[key] = {value: value, type: type};
        }


        // var instanceUniforms = shaderProgram.instanceUniforms;
        // var instanceUniformKeys = Object.keys(instanceUniforms);
        // var instanceUniformsActual = {};
        // for (var j = 0; j < instanceUniformKeys.length; j++) {
        //     //for every uniform, add the attribute value for this onto the array
        //     var key = instanceUniformKeys[j];
        //     var type = instanceUniforms[key];
        //
        //     var value = this.getShaderValueFromEntity(key, e, geometryVerts[j]);
        //     var vF32 = new Float32Array(value.length);
        //     vF32.set(value, 0);
        //     value = vF32;
        //
        //     instanceUniformsActual[key] = { value: value, type: type };
        // }

        config.setVertInstanceUniforms(vertInstanceUniformsActual);
        config.setFragInstanceUniforms(fragInstanceUniformsActual);

        // config.setInstanceUniforms(instanceUniformsActual);

        var attributes = shaderProgram.attributes;
        var attributeKeys = Object.keys(attributes);
        var verts = [];
        for (var j = 0; j < geometryVerts.length; j++) {
            //for every vertex, build an array of values representing this vertex's attributes

            for (var k = 0; k < attributeKeys.length; k++) {
                //for every attribute, add the attribute value for this entity onto the array
                verts = verts.concat(this.getShaderValueFromEntity(attributeKeys[k], e, geometryVerts[j], normals[j]));
            }
        }

        var vertsFloat32 = new Float32Array(verts.length);
        vertsFloat32.set(verts, 0);

        config.setVerts(glShape, this.vboName, vertsFloat32, geometryVerts.length);

        renderer.renderWithConfig(config);
    }
};
EntityManager.prototype.getShaderValueFromEntity = function(key, ent, geometryVert, normalVert) {
    if (key === "pos2D" || key === "pos3D") {
        return geometryVert.asArray();
    }
    else if (key === "normal") {
        return normalVert ? normalVert.asArray() : [0, 0, 11];
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
EntityManager.prototype.computeMatrix2D = function(ent) {
    //todo COMPUTE MATRIX this is likely to want to end up somewhere else
    var transform2D = ent.components.transform2D;
    var tr = transform2D.transform;
    t = new Mat3();

    var moveToOrigin = new Mat3();
    var origin = transform2D.dimensions.clone();
    origin.scalarDivide(-2);
    moveToOrigin.translate(origin);
    // moveToOrigin.setAsTranslation(dimensions);

    var rot = new Mat3();
    rot.rotate(transform2D.angle);
    // rot.setAsRotation(transform2D.angle);
    var trans = new Mat3();
    trans.translate(transform2D.position);
    // trans.setAsTranslation(transform2D.position);
    var scale = new Mat3();
    scale.scale(transform2D.scale);
    // scale.setAsScale(transform2D.scale);

    var result = moveToOrigin.clone();
    result.mat3Mult(rot);
    result.mat3Mult(scale);
    result.mat3Mult(trans);

    transform2D.transform = result;
};
EntityManager.prototype.computeMatrix3D = function(ent) {
    // //todo COMPUTE MATRIX this is likely to want to end up somewhere else
    // var transform3D = ent.components.transform3D;
    // var tr = transform3D.transform;
    // t = new Mat4();
    //
    // // var moveToOrigin = new Mat4();
    // // var dimensions = transform3D.dimensions.clone();
    // // dimensions.scalarDivide(-2);
    // // moveToOrigin.translate(dimensions);
    //
    // var trans = new Mat4();
    // trans.translate(transform3D.position);
    // var scale = new Mat4();
    // scale.scale(transform3D.scale);
    //
    // var rot = new Mat4();
    // rot.rotate(transform3D.angle.x, transform3D.right);
    // rot.rotate(transform3D.angle.y, transform3D.up);
    // rot.rotate(transform3D.angle.z, transform3D.forward);
    //
    //
    // // var result = moveToOrigin.clone();
    // var result = rot.clone();
    // // result.mat4Mult(rot);
    // result.mat4Mult(scale);
    // result.mat4Mult(trans);
    //
    // transform3D.transform = result;
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
EntityManager.prototype.addAxesFor3DEntity = function (e) {
    var transform = e.components.transform3D;

    var position = transform.position;
    var colors = [new Vec4(255, 0, 0, 1), new Vec4(0, 255, 0, 1), new Vec4(0, 0, 255, 1)];

    var ents = [];

    for (var i = 0; i < 3; i++) {
        var arrow = new Entity("arrow");
        arrow.addComponent(new Transform3D(position, new Vec3(), new Vec3()));
        arrow.addComponent(new Shape("line3D", new Vec3()));
        arrow.addComponent(new FlatColor(colors[i]));
        arrow.addComponent(new Shader(GAME.getShader("perspective")));
        arrow.PARENT = e;
        arrow.direction = i;

        arrow.onUpdate = function() {
            this.components.transform3D.position = this.PARENT.components.transform3D.position.clone();

            var direction = this.PARENT.components.transform3D.up.clone();
            switch (this.direction) {
                case 1:
                    direction = this.PARENT.components.transform3D.forward.clone();
                    break;
                case 2:
                    direction = this.PARENT.components.transform3D.right.clone();
                    break;
            }

            direction.scalarMult(100);

            this.components.shape = new Shape("line3D", direction);

            this.components.transform3D.dimensions = direction;
        };

        ents.push(arrow);
    }

    e.arrows = ents;
    this.addEntityList(ents);
};
EntityManager.prototype.addNormalsFor3DEntity = function(e) {
    //THIS IS BAD DO NOT USE
    var shape = e.components.shape;
    var geometry = shape.geometry;
    var normals = shape.normals;

    var ents = [];

    for (var i = 0; i < geometry.length; i+= 3) {
        var vert = geometry[i];
        var largeVert = vert.clone();
        largeVert.scalarMult(100);
        var norm = normals[i];

        if (norm === undefined) {
            continue;
        }
        var largeNorm = norm.clone();
        largeNorm.scalarMult(100);

        var n = new Entity("normal");

        n.addComponent(new Transform3D(vert, new Vec3(), new Vec3()));
        n.addComponent(new Shape("line3D", largeNorm));
        n.addComponent(new FlatColor(new Vec4(0, 0, 0, 1)));
        n.addComponent(new Shader(GAME.getShader("perspective")));
        n.PARENT = e;
        // arrow.direction = i;

        n.onUpdate = function() {
            // this.components.transform3D.position = this.PARENT.components.transform3D.position.clone();

            var direction = this.PARENT.components.transform3D.up.clone();
            this.components.transform3D.transform = this.PARENT.components.transform3D.transform;
            // switch (this.direction) {
            //     case 1:
            //         direction = this.PARENT.components.transform3D.forward.clone();
            //         break;
            //     case 2:
            //         direction = this.PARENT.components.transform3D.right.clone();
            //         break;
            // }
            //
            // direction.scalarMult(100);

            // this.components.shape = new Shape("line3D", direction);

            // this.components.transform3D.dimensions = direction;
        };
        ents.push(n);

    }
    e.normals = ents;
    this.addEntityList(ents);
};
//for every vertex in geometryData:
//  draw the normal at the corresponding list index
EntityManager.prototype.removeAxesFor3DEntity = function(e) {
    this.removeEntityList(e.arrows);
    e.arrows = undefined;
};
EntityManager.prototype.removeNormalsFor3DEntity = function(e) {
    this.removeEntityList(e.normals);
    e.normals = undefined;
};