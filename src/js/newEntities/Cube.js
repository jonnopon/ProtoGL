var Cube = function(position, col) {
    var entity = new Entity("cube");
    
    var dimensions = new Vec3(100, 100, 100);
    
    entity.addComponent(new Transform3D(position, dimensions, new Vec3()));
    entity.addComponent(new Shape("cube", dimensions/*, position*/));
    entity.addComponent(new FlatColor(col));

    entity.addComponent(new Shader(GAME.getShader("3DShader")));

    entity.MULT = randomBetween(1, 100) < 50 ? 1 : 1;

    entity.onUpdate = function() {
        this.components.transform3D.angle += (degToRad(6 * this.MULT));

        if (randomBetween(1, 5000) < 500) {
            this.components.flatColor.color = new Vec4(
                randomBetween(0, 255),
                randomBetween(0, 255),
                randomBetween(0, 255),
                1
            );
        }
    };

    return entity;
};