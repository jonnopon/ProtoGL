var Circle = function(position, col) {
    var entity = new Entity("circle");

    var dimensions = new Vec2(20, 20);

    entity.addComponent(new Transform2D(position, dimensions, new Vec2()));
    entity.addComponent(new Shape("circle", dimensions));
    entity.addComponent(new FlatColor(col));

    entity.addComponent(new Shader(GAME.getShader("2DShader")));

    entity.alpha = 0;
    entity.alphaMult = 1;

    entity.onUpdate = function() {
        if (randomBetween(1, 5000) < 500) {
            this.components.flatColor.color = new Vec4(
                randomBetween(0, 255),
                randomBetween(0, 255),
                randomBetween(0, 255),
                this.alpha
            );
        }

        this.alpha += (0.01 * this.alphaMult);
        if (this.alpha > 1 || this.alpha < 0) {
            this.alphaMult *= -1;
        }
        this.components.flatColor.color.w = this.alpha;
    };

    return entity;
};