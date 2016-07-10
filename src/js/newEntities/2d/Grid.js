var Grid = function(position, cellsHor, cellsVert) {
    var entity = new Entity("grid");

    var dimensions = new Vec2(GAME.resolution.x, GAME.resolution.y);

    entity.addComponent(new Transform2D(position, dimensions, new Vec2()));
    entity.addComponent(new Shape("grid", dimensions, cellsHor, cellsVert));
    entity.addComponent(new FlatColor(new Vec4(255, 255, 255, 1)));

    entity.addComponent(new Shader(GAME.getShader("2DShader")));

    entity.angleMult = randomBetween(1, 100) < 50 ? 1 : -1;
    entity.scale = 1.5;
    entity.scaleMult = randomBetween(1, 100) < 50 ? 1 : -1;
    entity.alpha = 0;
    entity.alphaMult = 1;

    entity.onUpdate = function() {
        this.components.transform2D.angle += (degToRad(0.5 * this.angleMult));

        if (randomBetween(1, 5000) < 500) {
            this.components.flatColor.color = new Vec4(
                randomBetween(0, 255),
                randomBetween(0, 255),
                randomBetween(0, 255),
                this.alpha
            );
        }

        this.scale += (0.01 * this.scaleMult);
        if (this.scale > 3 || this.scale < 1.25) {
            this.scaleMult *= -1;
        }
        this.components.transform2D.scale = new Vec2(this.scale, this.scale);

        this.alpha += (0.01 * this.alphaMult);
        if (this.alpha > 1 || this.alpha < 0) {
            this.alphaMult *= -1;
        }
        this.components.flatColor.color.w = this.alpha;
    };

    return entity;
};