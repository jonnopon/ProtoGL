var RendererSettings = function() {
    this.attributes = [];
    this.uniforms = [];
    this.shape = gl.TRIANGLES;
    this.textures = [];
};
RendererSettings.prototype.addAttribute = function(name, length) {
    this.attributes.push({'name': name, 'length': length});
};
RendererSettings.prototype.addUniform = function(name, val) {
    this.uniforms.push({'name': name, 'val': val});
};
RendererSettings.prototype.setShape = function(shape) {
    this.shape = shape;
};
RendererSettings.prototype.setTextureName = function(name) {
    this.textureName = name;
};