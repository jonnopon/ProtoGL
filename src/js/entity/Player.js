var Player = function() {
    var entity = new Entity("player");
    entity.addComponent(new Sprite(0, 0, 0.25, 1)); //TODO: new Shape()
    entity.addComponent(new Transform2D(new Vec2(GAME.width / 2, GAME.height / 2), new Vec2(40, 40), new Vec2(0, 0)));
    entity.addComponent(new AABBCollisionBox(new Vec2(40, 40)));
    entity.addComponent(new Health(3));
    entity.addComponent(new Points());
    // multiplier

    entity.components.transform2D.maxVelocity = new Vec2(100, 100);
    entity.components.transform2D.acceleration = new Vec2(0, 0);
    entity.components.transform2D.thrust = 0;
    entity.components.transform2D.rotationalVelocity = 0;
    entity.components.transform2D.forwardVelocity = 0;

    entity.components.transform2D.angle = 0;

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

        if (transform.position.x < 0) {
            transform.position.x -= transform.lastMoveDelta.x || transform.lastMoveDelta;
        }
        else if (transform.position.x + transform.dimensions.x > GAME.width) {
            transform.position.x -= transform.lastMoveDelta.x || transform.lastMoveDelta;
        }

        if (transform.position.y < 0) {
            transform.position.y -= transform.lastMoveDelta.y || transform.lastMoveDelta;
        }
        else if (transform.position.y + transform.dimensions.y > GAME.height) {
            transform.position.y -= transform.lastMoveDelta.y || transform.lastMoveDelta;
        }
    };

    entity.onCollision = function(e) {

    };

    return entity;
};