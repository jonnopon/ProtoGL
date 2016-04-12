var Food = function(game) {
    var posX = randomBetween(50, game.width - 50);
    var posY = randomBetween(50, game.height - 50);
    var pos = new Vec2(posX, posY);

    var entity = new Entity("food", game);
    entity.addComponent(new Sprite(0.5, 0, 0.75, 1));
    entity.addComponent(new Transform2D(pos, new Vec2(25, 25), new Vec2(0, 0)));
    entity.addComponent(new AABBCollisionBox(new Vec2(25, 25)));

    entity.onUpdate = function() {
        this.components.transform2D.angle -= degToRad(3);
    };

    entity.onCollision = function(e) {
        if (e.tag === "player") {
            this.game.genFood();
            this.game.removeEntity(this);
        };
    };

    return entity;
}