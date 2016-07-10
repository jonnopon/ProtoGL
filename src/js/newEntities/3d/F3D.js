var F3D = function(position, col) {
    var entity = new Entity("F3D");

    var dimensions = new Vec3(100, 100, -25);

    entity.addComponent(new Transform3D(position, dimensions, new Vec3()));
    entity.addComponent(new Shape("f3D", dimensions));
    entity.addComponent(new FlatColor(col));

    entity.addComponent(new Shader(GAME.getShader("lighting")));

    entity.components.transform3D.moveType = 1;

    entity.onUpdate = function() {
        // this.components.transform3D.angle.x += (degToRad(2));
        this.components.transform3D.angle.y += (degToRad(1.5));
        // this.components.transform3D.angle.z += (degToRad(2));
    };

    return entity;
};