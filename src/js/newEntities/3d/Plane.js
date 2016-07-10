var Plane = function(position, axes, size, col) {
    var entity = new Entity("plane");


    var dimensions = axes.clone()/*new Vec3(size, size, size)*/;
    dimensions.scalarMult(size);
    if (dimensions.x === 0) {
        dimensions.x = 0.1;
    }
    if (dimensions.y === 0) {
        dimensions.y = 0.1;
    }
    if (dimensions.z === 0) {
        dimensions.z = 0.1;
    }

    entity.addComponent(new Transform3D(position, dimensions, new Vec3()));
    entity.addComponent(new Shape("cube", dimensions));
    entity.addComponent(new FlatColor(col));

    entity.addComponent(new Shader(GAME.getShader("perspective")));

    entity.components.transform3D.moveType = 1;

    entity.onUpdate = function() {
        // this.components.transform3D.angle.x += (degToRad(2 * this.MULT));
        // this.components.transform3D.angle.y += (degToRad(1.5));
        // this.components.transform3D.angle.z += (degToRad(2 * this.MULT));
    };

    return entity;
};