var Triangle = function(position, col) {
    var entity = new Entity("triangle");

    var dimensions = new Vec2(10, 10);

    entity.addComponent(new Transform2D(position, dimensions, new Vec3()));
    entity.addComponent(new Shape("triangle", dimensions/*position*/)); //TODO: SHOULD SHAPE CHANGE? (as geometry does too?)
    entity.addComponent(new FlatColor(col));

    entity.addComponent(new Shader(GAME.getShader("2DShader")));

    entity.MULT = randomBetween(1, 100) < 50 ? 1 : 1;

    entity.COUNT = 0;


    entity.onUpdate = function() {
        // entity.components.transform2D.scale.value.x += 0.01;
        // entity.components.transform2D.scale.value.y += 0.01;

        this.components.transform2D.angle += (degToRad(6 * this.MULT));

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