var RenderSettings = function() {
    this.attributes = [];
    this.uniforms = [];
    this.shape = gl.TRIANGLES;
    this.textures = [];
    this.shaderName = [];
};

RenderSettings.prototype.addAttribute = function(name, size) {
	this.attributes.push({'name': name, 'size': size});
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
RenderSettings.prototype.addAttributes = function(attributes) {
    var attributeKeys = Object.keys(attributes);
    
    for (var i = 0; i < attributeKeys.length; i++) {
        var attributeName = attributeKeys[i];
        var attributeSize = attributes[attributeKeys[i]];

        this.addAttribute(attributeName, attributeSize);
    }
};
RenderSettings.prototype.addUniforms = function(uniforms) {
    var uniformKeys = Object.keys(uniforms);
    for (var i = 0; i < uniformKeys.length; i++) {
        var uniformData = uniforms[uniformKeys[i]];
        var uniformPath = uniformData.path;

        var value = window;
        for (var j = 0; j < uniformPath.length; j++) {
            value = value[uniformPath[j]];
        }

        this.addUniform(uniformKeys[i], uniformData.type, value);
    }
};