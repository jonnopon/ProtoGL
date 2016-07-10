var Cube = function(position, col) {
    var entity = new Entity("cube");
    
    var dimensions = new Vec3(100, 100, -100);
    
    entity.addComponent(new Transform3D(position, dimensions, new Vec3()));
    entity.addComponent(new Shape("cube", dimensions));
    entity.addComponent(new FlatColor(col));

    entity.addComponent(new Shader(GAME.getShader("lighting")));

    entity.originalPos = entity.components.transform3D.position.clone();
    entity.onUpdate = function() {
        // this.components.transform3D.angle.x += (degToRad(0.55));
        this.components.transform3D.angle.y += (degToRad(1.5));
        // this.components.transform3D.angle.z += (degToRad(0.75));
    };

    return entity;
};