var RenderConfig = function() {
    this.glShape = -1;
    this.shaderProgramName = "";
    this.attributes = {};
    this.vertGlobalUniforms = {};
    this.fragGlobalUniforms = {};
    this.vertIinstanceUniforms = {};
    this.fragInstanceUniforms = {};

    this.vboName = "";
    this.verts = [];
    this.numVerts = 0;
    this.dataPerVert = 0;

    this.texture = "";
    this.flags = {};
};

RenderConfig.prototype.setShader = function(name, vertGlobalUniforms, fragGlobalUniforms, attributes, dataPerVert) {
    this.shaderProgramName = name;
    this.vertGlobalUniforms = vertGlobalUniforms;
    this.fragGlobalUniforms = fragGlobalUniforms;
    // this.globalUniforms = globalUniforms;
    this.attributes = attributes;
    this.dataPerVert = dataPerVert;
};
RenderConfig.prototype.setVerts = function(glShape, vboName, verts, numVerts) {
    this.glShape = glShape;
    this.vboName = vboName;
    this.verts = verts;
    this.numVerts = numVerts;
};
RenderConfig.prototype.setVertInstanceUniforms = function(vertInstanceUniforms) {
    this.vertInstanceUniforms = vertInstanceUniforms;
};
RenderConfig.prototype.setFragInstanceUniforms = function(fragInstanceUniforms) {
    this.fragInstanceUniforms = fragInstanceUniforms;
};
RenderConfig.setTexture = function(textureData /*?*/) {
};
RenderConfig.SETFLAGS = function(THINKABOOTIT) {

};