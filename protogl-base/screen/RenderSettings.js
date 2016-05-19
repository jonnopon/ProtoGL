var RenderSettings = function() {
    this.attributes = [];
    this.uniforms = [];
    this.shape = gl.TRIANGLES;
    this.textures = [];
    this.shaderName = [];
};

RenderSettings.prototype.addAttribute = function(name, length, offset) {
	this.attributes.push({'name': name, 'length': length});
};
RenderSettings.prototype.addUniform = function(name, type, val) {
	this.uniforms.push({'name': name, 'type': type, 'val': val});
};
RenderSettings.prototype.setShape = function(shape) {
	this.shape = shape;
};
RenderSettings.prototype.setTextureName = function(name) {
	this.textureName = name;
};
RenderSettings.prototype.setShader = function(shader) {
    this.shaderName = shader;
};