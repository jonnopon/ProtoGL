var UserInterfaceManager = function() {
    this.renderer = GAME.renderer;
    this.shaderProgramName = "uiProgram";
    this.vboName = "uiVBO";
    this.verts = [];
    this.dataPerVert = 6;

    var vert = VERTSHADERS2D["colored"];
    var frag = FRAGSHADERS["colored"];
    var uiShader = {
        name: "uiShader",
        vertSrc: vert.src,
        fragSrc: frag,
        attributes: vert.attributes,
        uniforms: vert.uniforms
    };
    GAME.addShader(uiShader);

    this.renderer.addVBO(this.vboName);
    
    var config = new RenderSettings();
    config.setShader(uiShader.name);
    config.setShape(gl.TRIANGLES);
    config.addAttributes(uiShader.attributes);
    config.addUniforms(uiShader.uniforms);

    this.renderSettings = config;

    this.elements = [];
};

UserInterfaceManager.prototype.addElement = function(e) {
    this.elements.push(e);
};
UserInterfaceManager.prototype.clearElements = function() {
    this.elements = [];
};
UserInterfaceManager.prototype.constructVerts = function() {
    var vertSize = this.dataPerVert * 6 * this.elements.length;
    this.verts = new Float32Array(vertSize);
    var off = 0;

    for (var i = 0; i < this.elements.length; i++) {
        var pos = this.elements[i].position;
        var dim = this.elements[i].dimensions;
        var col = this.elements[i].color,
            r = col.x,
            g = col.y,
            b = col.z,
            a = col.w;

        var tempVerts = [
            pos.x, pos.y, r, g, b, a,
            pos.x + dim.x, pos.y, r, g, b, a,
            pos.x + dim.x, pos.y + dim.y, r, g, b, a,

            pos.x + dim.x, pos.y + dim.y, r, g, b, a,
            pos.x, pos.y + dim.y, r, g, b, a,
            pos.x, pos.y, r, g, b, a
        ];

        this.verts.set(tempVerts, off);
        off += tempVerts.length;
    }

};
UserInterfaceManager.prototype.render = function() {
    var renderer = this.renderer;
    this.constructVerts();

    if (this.verts.length === 0) {
        return;
    }

    renderer.addVerts("uiVerts", this.verts, this.dataPerVert);
    renderer.bufferVertsToVBO("uiVerts", this.vboName);
    renderer.bindVBO(this.vboName);
    renderer.bindVerts("uiVerts");
    renderer.bindShaderProgram(this.shaderProgramName);
    renderer.render(this.renderSettings);
};