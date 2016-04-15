var Food = function() {
    var position = new Vec2(randomBetween(50, GAME.width - 50), randomBetween(50, GAME.height - 50)),
        dimensions = new Vec2(25, 25),
        velocity = new Vec2(0, 0);

    var entity = new Entity("food");
    entity.addComponent(new Sprite(0.5, 0, 0.75, 1));
    entity.addComponent(new Transform2D(position, dimensions, velocity));
    entity.addComponent(new AABBCollisionBox(dimensions));

    entity.onUpdate = function() {
        this.components.transform2D.angle -= degToRad(3);
    };

    entity.onCollision = function(e) {
        if (e.tag === "player") {
            GAME.genFood();
            GAME.removeEntity(this);
        };
    };

    return entity;
}