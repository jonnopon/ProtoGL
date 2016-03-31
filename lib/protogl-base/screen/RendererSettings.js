var RendererSettings = function() {
    this.attributes = [];
    this.uniforms = [];
    this.shape = gl.TRIANGLES;
    this.textures = [];

    this.addAttribute = function(name, length) {
	    this.attributes.push({'name': name, 'length': length});
	};
	this.addUniform = function(name, val) {
	    this.uniforms.push({'name': name, 'val': val});
	};
	this.setShape = function(shape) {
	    this.shape = shape;
	};
	this.setTextureName = function(name) {
	    this.textureName = name;
	};
};