var UserInterfaceManager = function(game) {
    this.renderer = game.renderer;
    this.shaderProgramName = "uiProgram";
    this.vboName = "uiVBO";
    
    var frag = FRAGSHADERS["coloured"];
    var vert = VERTSHADERS["transform-colored"];
    this.renderer.addShaderProgram(this.shaderProgramName, [vert, frag]);
    this.renderer.addVBO(this.vboName);
    
    var config = new RenderSettings();
    config.addAttribute("pos", 2);
    config.addAttribute("col", 4);
    config.addAttribute("angle", 1);
    config.addAttribute("scale", 1);
    config.addAttribute("centre", 2);
    config.setShape(gl.TRIANGLES);
    
    this.renderSettings = config;

    this.elements = [];
};

UserInterfaceManager.prototype.addElement = function(e) {

};
UserInterfaceManager.prototype.constructVerts = function() {

};
UserInterfaceManager.prototype.render = function() {

};
