var Camera2D = function(position, zoom, rotation /*, followEntity, maxOffset, zoom? */) {
    this.position = position || new Vec2(GAME.width / 2, GAME.height / 2); //vec2


    this.zoom = zoom || 1; //float


    // this.transform = new Mat3();

    this.rotation = rotation || 0; //rotation

    this.viewMatrix = new Mat4();
    this.viewMatrix.translate(new Vec3(0, 0, -4));


};

Camera2D.zoomTo = function(zoom) {
    this.zoom = zoom;
};
Camera2D.rotateTo = function(rotation) {
    this.rotation = rotation;
};
Camera2D.move = function(movementVector) {
    this.viewMatrix.translate(movementVector); //TODO: delta?
};
Camera2D.getTransformation = function() {
    // var translation = new Mat4();
    // translation.translate(new Vec3(-this.position.x, -this.position.y, 0));
    //
    // var rotation = new Mat4();
    // rotation.rotate(this.rotation, new Vec3(0, 0, 1));
    //
    // var scale = new Mat4();
    // scale.scale(this.zoom);
    //
    // var final = translation.clone();
    // final.mat4Mult(rotation);
    // final.mat4Mult(scale);
    //
    // return final;
};