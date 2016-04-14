var UserInterfaceManager = function() {
    this.renderer = GAME.renderer;
    this.shaderProgramName = "uiProgram";
    this.vboName = "uiVBO";
    this.verts = [];
    this.dataPerVert = 6;
    
    var frag = FRAGSHADERS["colored"];
    var vert = VERTSHADERS2D["colored"];
    this.renderer.addShaderProgram(this.shaderProgramName, [vert, frag]);
    this.renderer.addVBO(this.vboName);
    
    var config = new RenderSettings();
    config.addAttribute("pos", 2);
    config.addAttribute("col", 4);
    config.addUniform("resX", GAME.resolution.x);
    config.addUniform("resY", GAME.resolution.y);
    config.setShape(gl.TRIANGLES);
    
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
    renderer.render2D(true, this.renderSettings);
};