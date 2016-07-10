var SquarePyramid = function(position, col) {
    var entity = new Entity("squarePyramid");

    var dimensions = new Vec3(100, 100, -100);

    entity.addComponent(new Transform3D(position, dimensions, new Vec3()));
    entity.addComponent(new Shape("squarePyramid", dimensions));
    entity.addComponent(new FlatColor(col));

    entity.addComponent(new Shader(GAME.getShader("lighting")));

    entity.components.transform3D.moveType = 0;

    entity.onUpdate = function() {
        this.components.transform3D.angle.x += (degToRad(0.55));
        this.components.transform3D.angle.y += (degToRad(1.5));
        // this.compoeqnents.transform3D.angle.z += (degToRad(0.75));
    };

    return entity;
};