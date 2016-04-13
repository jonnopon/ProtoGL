var RenderSettings = function() {
    this.attributes = [];
    this.uniforms = [];
    this.shape = gl.TRIANGLES;
    this.textures = [];
};

RenderSettings.prototype.addAttribute = function(name, length) {
	this.attributes.push({'name': name, 'length': length});
};
RenderSettings.prototype.addUniform = function(name, val) {
	this.uniforms.push({'name': name, 'val': val});
};
RenderSettings.prototype.setShape = function(shape) {
	this.shape = shape;
};
RenderSettings.prototype.setTextureName = function(name) {
	this.textureName = name;
};