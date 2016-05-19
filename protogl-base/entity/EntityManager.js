var EntityManager = function() {
    this.renderer = GAME.renderer;
    this.ents = [];
    this.removeList = [];
    this.addList = [];
    // this.verts = [];
    // this.flatShaderProgram = "flatShaderProgram";
    // this.spriteShaderProgram = "spriteShaderProgram";
    this.flatVBOName = "flatVBO";
    this.spriteVBOName = "spriteVBO";
    this.textureName = "entTex";

    this.renderer.addVBO(this.flatVBOName);
    this.renderer.addVBO(this.spriteVBOName);

    this.texPos = this.renderer.createTexture(this.textureName, "res/img/entity.png");

    // var vert = VERTSHADERS2D["transform-colored"];
    // var frag = FRAGSHADERS["colored"];
    // this.renderer.addShaderProgram(this.flatShaderProgram, [vert, frag]);
    //
    // vert = VERTSHADERS2D["transform-textured"];
    // frag = FRAGSHADERS["textured"];
    // this.renderer.addShaderProgram(this.spriteShaderProgram, [vert, frag]);
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
    //ENTITIES ARE GROUPED BY SHADER, THEN BY SHAPE
    //This means that any entity can have an entirely unique shader
    //and that any entity can be any shape
    //and that as few rendering calls will be made as possible

    //THINGS WOT U NEED TO RENDER IN WEBGL:
    //bound vertex buffer object, populated with vertex data
    //bound shader program
    //bound vertex attribute pointers
    //a target shape

    //thus the minimum render calls must be (numberOfDifferentShapes * numberOfDifferentShaderPrograms)

    //by grouping shader-first, I'm able to set up most of the renderer config per shader
    //since it is shaders who determine the necessary layout of the data
    //before every render call, the vertex construction takes place and the config is finalised

    var renderer = this.renderer;
    var verts = [];
    var renderer = this.renderer;

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
        var attributes = shader.attributes;
        var attributeKeys = Object.keys(attributes);
        var uniforms = shader.uniforms;
        var uniformKeys = Object.keys(uniforms);

        //set up a renderer configuration
        var config = new RenderSettings();

        //set the shader to be used for renderering
        config.setShader(shader.name);
        
        //set the shader attributes
        for (var j = 0; j < attributeKeys.length; j++) {
            var attributeName = attributeKeys[j];
            var attributeSize = attributes[attributeKeys[j]].size;
            // var attributeOffset = attributes[Object.keys(attributes)[j]].offset;

            config.addAttribute(attributeName, attributeSize);
        }
        
        //set the shader uniforms
        for (var j = 0; j < uniformKeys.length; j++) {
            //Uniforms take advantage of the fact that everything in JS is an object with named properties
            //When setting a Uniform up in a shader declaration
                //the "value location" is defined as an array of identifiers
            //The "value location" is used to navigate from window->GAME to the location of the uniform value
                //this allows uniform values to change without affecting the system
                //and allows the standard library shaders to be built on page load rather than on engine init

            //because the desired value for a uniform is implicitly known when writing a shader,
                //the path to that value is also known
                //(ex: uniform "resX" used in aspect ratio compensation;
                    //path is GAME.resolution.x
                    //"value location" is ["GAME", "resolution", "x"] )
                //(ex: uniform "projectionMatrix" for projection;
                    //"value location" is ["GAME", "renderer", "projectionMatrix"] )

            //The need for knowledge of paths to particular data in the engine is a PROBLEM
                //that can be solved by nice documentation

            //As the systems built with the engine get more complex, this concept will need a re-think
                //ex: how to handle uniforms with values based on data that might not HAVE a name that is reachable from window?
                //ex: how to handle uniforms with values based on data that is generated at the app-level and thus might not have a path?

            var uniformData = uniforms[uniformKeys[j]];
            var uniformPath = uniformData.path;

            var value = window;
            for (var k = 0; k < uniformPath.length; k++) {
                value = value[uniformPath[k]];
            }

            //now, add the uniform to the config
            config.addUniform(uniformKeys[j], uniformData.type, value);
        }

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
                    renderer.bufferVertsToVBO("verts", this.flatVBOName); //TODO: sort out vbos
                    renderer.bindVBO(this.flatVBOName);
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
            renderer.bufferVertsToVBO("verts", this.flatVBOName); //TODO: sort out vbos
            renderer.bindVBO(this.flatVBOName);
            renderer.bindVerts("verts");

            if (verts.length > 0) {
                renderer.render2D(true, config); //TODO: SHOULDN'T NEED THIS WHEN THE TRIANGLE STRIPS PROBLEM IS SOLVED
            }
        }
    }
};
// EntityManager.prototype.renderFlats = function(flatEnts) {
//     var renderer = this.renderer;
//     var dataPerVert = 0;
//     var verts = [];
//     var grouped = this.groupEntsByShape(flatEnts);
//
//
//
//     for (var i = 0; i < Object.keys(grouped).length; i++) {
//         var glShape = Object.keys(grouped)[i];
//         // var glShape = Object.keys(grouped)[i].toString();
//         verts = [];
//
//         var config = new RenderSettings();
//         config.addAttribute("pos", 2);
//         config.addAttribute("col", 4);
//         config.addAttribute("angle", 1);
//         config.addAttribute("scale", 1);
//         config.addAttribute("centre", 2);
//         config.addUniform("resX", GAME.resolution.x);
//         config.addUniform("resY", GAME.resolution.y);
//         config.setShape(glShape);
//
//         for (var j = 0; j < grouped[glShape].length; j++) {
//             var e = grouped[glShape][j];
//             var color = e.components.flatColor.color;
//             var shape = e.components.shape;
//             var pos = e.components.transform2D.position;
//             var angle = e.components.transform2D.angle;
//             var scale = e.components.transform2D.scale.x;
//             var geometryData = _getGeometry(shape.shapeName, pos, shape.dimensions, false, null, 50);
//             var vertList = geometryData.vertList;
//
//             //shader in use - transform-colored
//             //attributes: vec 2 pos, vec4 col, float angle, float scale, vec2 centre
//             //uniforms: resX resY
//
//             if (glShape === "6") {
//                 //TODO: messy but have to render strips in single calls
//                 var tempVerts = [];
//                 var tempDataPerVert = 0;
//                 for (var p = 0; p < vertList.length; p++) {
//                     var list = [vertList[p].x, vertList[p].y, color.x, color.y, color.z, color.w, angle, scale, pos.x, pos.y]
//                     tempVerts = tempVerts.concat(list);
//                     tempDataPerVert = list.length;
//                 }
//
//                 var vertsToSend = new Float32Array(tempVerts.length);
//                 vertsToSend.set(tempVerts, 0);
//                 renderer.addVerts("flatVerts", vertsToSend, dataPerVert);
//                 renderer.bufferVertsToVBO("flatVerts", this.flatVBOName);
//                 renderer.bindVBO(this.flatVBOName);
//                 renderer.bindVerts("flatVerts");
//                 renderer.bindShaderProgram(this.flatShaderProgram);
//                 renderer.render2D(true, config);
//             }
//             else {
//                 var off = 0;
//                 for (var k = 0; k < vertList.length; k++) {
//                     var list = [vertList[k].x, vertList[k].y, color.x, color.y, color.z, color.w, angle, scale, pos.x, pos.y]
//                     verts = verts.concat(list);
//                     dataPerVert = list.length;
//                 }
//             }
//         }
//
//         var vertsToSend = new Float32Array(verts.length);
//         vertsToSend.set(verts, 0);
//         renderer.addVerts("flatVerts", vertsToSend, dataPerVert);
//         renderer.bufferVertsToVBO("flatVerts", this.flatVBOName);
//         renderer.bindVBO(this.flatVBOName);
//         renderer.bindVerts("flatVerts");
//         renderer.bindShaderProgram(this.flatShaderProgram); //TODO
//         renderer.render2D(true, config);
//     }
// };
// EntityManager.prototype.renderSprites = function(spriteEnts) {
//     var renderer = this.renderer;
//     var dataPerVert = 0;
//     var verts = [];
//     var grouped = this.groupEntsByShape(spriteEnts);
//
//     for (var i = 0; i < Object.keys(grouped).length; i++) {
//         var glShape = Object.keys(grouped)[i];
//         verts = [];
//
//         for (var j = 0; j < grouped[glShape].length; j++) {
//             var e = spriteEnts[j];
//             var pos = e.components.transform2D.position;
//             var shape = e.components.shape;
//             var angle = e.components.transform2D.angle;
//             var scale = e.components.transform2D.scale.x; //TODO: scale needs to be a vec2 not an int/float
//             var geometryData = _getGeometry(shape.shapeName, pos, shape.dimensions, true, e.components.sprite)
//             var vertList = geometryData.vertList;
//             var texList = geometryData.texList;
//
//             //shader in use - transform-textured
//             //attributes: vec2 pos, vec2 tex, float angle, float scale, vec2 centre
//             //uniforms: resX resY
//             var off = 0;
//             for (var k = 0; k < vertList.length; k++) {
//                 var list = [vertList[k].x, vertList[k].y, texList[k].x, texList[k].y, angle, scale, pos.x, pos.y]
//                 verts = verts.concat(list);
//                 dataPerVert = list.length;
//             }
//         }
//
//         var config = new RenderSettings();
//         config.addAttribute("pos", 2);
//         config.addAttribute("texCoord", 2);
//         config.addAttribute("angle", 1);
//         config.addAttribute("scale", 1);
//         config.addAttribute("centre", 2);
//         config.addUniform("tex", this.texPos);
//         config.addUniform("resX", GAME.resolution.x);
//         config.addUniform("resY", GAME.resolution.y);
//         config.setShape(glShape);
//         config.setTextureName(this.textureName);
//
//         var vertsToSend = new Float32Array(verts.length);
//         vertsToSend.set(verts, 0);
//         renderer.addVerts("spriteVerts", verts, dataPerVert);
//         renderer.bufferVertsToVBO("spriteVerts", this.spriteVBOName);
//         renderer.bindVBO(this.spriteVBOName);
//         renderer.bindVerts("spriteVerts");
//         renderer.bindShaderProgram(this.spriteShaderProgram);
//         renderer.render2D(true, config);
//     }
// };
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