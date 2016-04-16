var Player = function() {
    var entity = new Entity("player");
    // entity.addComponent(new Sprite(0, 0, 0.25, 1)); //TODO: new Shape()
    entity.addComponent(new Transform2D(new Vec2(GAME.width / 2, GAME.height / 2), new Vec2(40, 40), new Vec2(0, 0)));
    entity.addComponent(new AABBCollisionBox(new Vec2(40, 40)));
    entity.addComponent(new Health(3));
    entity.addComponent(new Points());
    entity.addComponent(new Shape("triangle", new Vec2(40, 40), new Vec2(GAME.width / 2, GAME.height / 2)));
    entity.addComponent(new FlatColor(new Vec4(255, 0, 255, 1)));
    // multiplier

    entity.components.transform2D.maxVelocity = new Vec2(100, 100);
    entity.components.transform2D.acceleration = new Vec2(0, 0);
    entity.components.transform2D.thrust = 0;
    entity.components.transform2D.rotationalVelocity = 0;
    entity.components.transform2D.forwardVelocity = 0;

    entity.components.transform2D.angle = 0;

    entity.addComponent(new Gun(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY, 75));

    entity.onUpdate = function() {
        var transform = this.components.transform2D;
        var inputHandler = GAME.inputHandler;

        if (inputHandler.isKeyDown(KEYCODES.w)) {
            transform.targetForwardVelocity = 50;
            transform.acceleration = new Vec2(50, 0);
        }
        else {
            transform.targetForwardVelocity = 0;
            transform.forwardVelocity = 0; //TODO: deceleration
        }

        if (inputHandler.isKeyDown(KEYCODES.a)) {
            transform.angle += degToRad(10);
        }
        else if (inputHandler.isKeyDown(KEYCODES.d)) {
            transform.angle -= degToRad(10);
        }

        if (inputHandler.isKeyDown(KEYCODES.e)) {
            this.components.shape = new Shape("square", new Vec2(40, 40), new Vec2(GAME.width / 2, GAME.height / 2));
        }
        if (inputHandler.isKeyDown(KEYCODES.r)) {
            this.components.shape = new Shape("triangle", new Vec2(40, 40), new Vec2(GAME.width / 2, GAME.height / 2));
        }

        if (inputHandler.isKeyDown(KEYCODES.space)) {
            this.components.gun.shoot(this, this.components.gun);
        };

        // transform.scale.x -= 0.005; //TODO: ISN'T WORKING

        if (transform.position.x - transform.dimensions.x / 2 < 0) {
            transform.position.x -= transform.lastMoveDelta.x || transform.lastMoveDelta;
        }
        else if (transform.position.x + transform.dimensions.x / 2 > GAME.width) {
            transform.position.x -= transform.lastMoveDelta.x || transform.lastMoveDelta;
        }

        if (transform.position.y - transform.dimensions.y / 2 < 0) {
            transform.position.y -= transform.lastMoveDelta.y || transform.lastMoveDelta;
        }
        else if (transform.position.y + transform.dimensions.y / 2 > GAME.height) {
            transform.position.y -= transform.lastMoveDelta.y || transform.lastMoveDelta;
        }
    };

    entity.onCollision = function(e) {

    };

    return entity;
};