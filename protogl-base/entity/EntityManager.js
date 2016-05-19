var EntityManager = function() {
    this.renderer = GAME.renderer;
    this.ents = [];
    this.removeList = [];
    this.addList = [];
    this.vboName = "entVBO";
    this.textureName = "entTex";

    this.renderer.addVBO(this.vboName);

    this.texPos = this.renderer.createTexture(this.textureName, "res/img/entity.png");
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
    var verts = [];

    //TODO: this implicitly means that Entities MUST have a Shader, Shape, Transform2D and FlatColor to render
    //      it may be nice to include optional filtering
    //      so I could say "shader, shape, (transform2D or transform3D), (flatColor or Sprite)"
    //TODO: future (soon) consideration
    var renderables = this.getEntsWithComponents([Shader, Shape, Transform2D, FlatColor]);

    //GROUP BY SHADER
    var shaders = this.groupEntsByShader(renderables);
    var shaderKeys = Object.keys(shaders);

    for (var i = 0; i < shaderKeys.length; i++) {
        //for every shader
        var ents = shaders[shaderKeys[i]];
        var shader = shaders[shaderKeys[i]][0].components.shader.shaderData;
        var attributeKeys = Object.keys(shader.attributes);

        //set up a renderer configuration
        var config = new RenderSettings();
        config.setShader(shader.name);
        config.addAttributes(shader.attributes);
        config.addUniforms(shader.uniforms);

        //GROUP ENTITIES FOR THIS SHADER BY SHAPE
        var shapes = this.groupEntsByShape(ents);
        var shapeKeys = Object.keys(shapes);
        for (var j = 0; j < shapeKeys.length; j++) {
            //for every shape
            var glShape = shapeKeys[j];

            //set the shape to be used in rendering
            config.setShape(parseInt(glShape, 10));

            //construct a list of vertices for this render call
            verts = [];
            var dataPerVert = 0;
            for (var k = 0; k < shapes[glShape].length; k++) {
                //for every entity of this shape using this shader program
                var e = shapes[glShape][k];

                //add the vertices representing this entity to the list
                //using the attributes list to infer what component data to use
                var transform = e.components.transform2D;
                var shape = e.components.shape;
                var geometryData = _getGeometry(shape.shapeName, transform.position, shape.dimensions, false, null, 50)
                var vertList = geometryData.vertList;

                if (glShape === "6") {
                    //TODO: messy, but triangle strips require rendering in single calls...
                    //TODO: REALLY NEED TO SORT THIS PROBLEM OUT
                    var tempVerts = [];
                    var tempDataPerVert = [];

                    for (var l = 0; l < vertList.length; l++) {
                        var list = [];

                        for (var m = 0; m < config.attributes.length; m++) {
                            var attribute = config.attributes[m];
                            var attributeName = attribute.name;

                            switch (attributeName) {
                                case "pos":
                                    list = list.concat([vertList[l].x, vertList[l].y]);
                                    break;
                                case "angle":
                                    list = list.concat([transform.angle]);
                                    break;
                                case "scale":
                                    list = list.concat([transform.scale.x]);
                                    break;
                                case "centre":
                                    list = list.concat([transform.position.x, transform.position.y]);
                                    break;
                                case "col":
                                    var color = e.components.flatColor.color;
                                    list = list.concat([color.x, color.y, color.z, color.w]);
                            }
                        }

                        tempVerts = tempVerts.concat(list);
                        tempDataPerVert = list.length;
                    }

                    var vertsToSend = new Float32Array(tempVerts.length);
                    vertsToSend.set(tempVerts, 0);
                    renderer.addVerts("verts", vertsToSend, tempDataPerVert);
                    renderer.bufferVertsToVBO("verts", this.vboName);
                    renderer.bindVBO(this.vboName);
                    renderer.bindVerts("verts");
                    renderer.render2D(true, config);
                }
                else {
                    for (var l = 0; l < vertList.length; l++) {
                        //for every vertex required
                        var list = [];

                        for (var m = 0; m < config.attributes.length; m++) {
                            //for every attribute required
                            var attribute = config.attributes[m];
                            var attributeName = attribute.name;

                            //TODO: TEMPORARY UNTIL TRANSFORM HAS BEEN CHANGED TO MATRIX REPRESENTATION
                            //TODO: GOTTA THINK OF A LOGICAL REPLACEMENT
                                //cannot really be enforicing the name of attributes
                                //I have to be able to associate the component properties I want
                                //with the names of the attributes
                                //at the APP-LEVEL code, so that attribute values can be inferred in this code

                            switch (attributeName) {
                                case "pos":
                                    list = list.concat([vertList[l].x, vertList[l].y]);
                                    break;
                                case "angle":
                                    list = list.concat([transform.angle]);
                                    break;
                                case "scale":
                                    list = list.concat([transform.scale.x]);
                                    break;
                                case "centre":
                                    list = list.concat([transform.position.x, transform.position.y]);
                                    break;
                                case "col":
                                    var color = e.components.flatColor.color;
                                    list = list.concat([color.x, color.y, color.z, color.w]);
                            }
                        }

                        verts = verts.concat(list);
                        dataPerVert = list.length;
                    }
                }
            }

            //TODO: last one I swear
            //  TODO: gotta be able to render entities that have sprites and 3D entities
            //  PROBLEM IS REALATED TO THE OTHER TODOS IN THIS FUNCTION

            //for this shape and this shader program, make a render call
            //format the vertices in a Float32Array,
            //buffer the vertices to the VBO and bind it
            //call render
            //  renderer will handle the rest using the config we set up along the way
            var vertsToSend = new Float32Array(verts.length);
            vertsToSend.set(verts, 0);
            renderer.addVerts("verts", vertsToSend, dataPerVert);
            renderer.bufferVertsToVBO("verts", this.vboName);
            renderer.bindVBO(this.vboName);
            renderer.bindVerts("verts");

            if (verts.length > 0) {
                renderer.render2D(true, config); //TODO: SHOULDN'T NEED THIS WHEN THE TRIANGLE STRIPS PROBLEM IS SOLVED
            }
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