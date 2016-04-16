var Enemy = function(type) {
    var entity = new Entity("enemy");

    var vel = new Vec2();
    var dimensions = new Vec2();
    var pos = new Vec2();
    var points = 0;

    //randomise based on type
    if (type === "square") {
        vel.x = randomBetween(-25, 25);
        vel.y = randomBetween(-25, 25);
        dimensions.x = 15;
        dimensions.y = 15;
        pos.x = randomBetween(dimensions.x * 2, GAME.width - dimensions.y * 2);
        pos.y = randomBetween(dimensions.y, GAME.height - dimensions.x * 2, GAME.height - dimensions.y * 2);
        points = 100;
    }

    entity.addComponent(new Transform2D(pos, dimensions, vel));
    entity.addComponent(new AABBCollisionBox(dimensions));
    entity.addComponent(new Shape(type, dimensions, new Vec2(GAME.width / 2, GAME.height / 2)));
    entity.addComponent(new FlatColor(new Vec4(255, 0, 0, 1)));
    entity.addComponent(new Points(points));
    // multiplier

    entity.addComponent(new Gun(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY, 75));

    entity.onUpdate = function() {
        var transform = this.components.transform2D;

        if (transform.position.x - transform.dimensions.x / 2 < 0 || transform.position.x + transform.dimensions.x / 2 > GAME.width) {
            transform.position.x -= transform.lastMoveDelta.x || transform.lastMoveDelta;
            transform.velocity.x = -transform.velocity.x;
        }

        if (transform.position.y - transform.dimensions.y / 2 < 0 || transform.position.y + transform.dimensions.y / 2 > GAME.height) {
            transform.position.y -= transform.lastMoveDelta.y || transform.lastMoveDelta;
            transform.velocity.y = -transform.velocity.y;
        }
    };

    entity.onCollision = function(e) {
        if (e.tag === "bullet:player") {
            GAME.removeEntity(this);
            GAME.addPoints(this.components.points.value);
        }
        if (e.tag === "player") {
            GAME.removeEntity(this);
        }
    };

    return entity;
};