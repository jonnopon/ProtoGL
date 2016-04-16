var Bullet = function(owner, startAngle, target) {
    var entity = new Entity("bullet:" + owner.tag);//can differentiate bullets fired by different types of entity
    // entity.addComponent(new Sprite(0, 0, 0.25, 1)); //TODO: new Shape()

    var dimensions = new Vec2(10, 35);
    entity.addComponent(new Transform2D(owner.components.transform2D.position.clone(), dimensions, new Vec2(0, 0)));

    entity.addComponent(new AABBCollisionBox(dimensions));
    entity.addComponent(new Health(3));
    entity.addComponent(new Points());
    entity.addComponent(new Shape("square", dimensions, new Vec2(GAME.width / 2, GAME.height / 2)));
    entity.addComponent(new FlatColor(new Vec4(255, 255, 255, 1)));
    // multiplier

    entity.components.transform2D.targetForwardVelocity = 100;
    entity.components.transform2D.acceleration = new Vec2(1000, 0);
    entity.components.transform2D.rotationalVelocity = 0;
    entity.components.transform2D.forwardVelocity = 0;
    entity.components.transform2D.maxVelocity = new Vec2(1000, 100);

    var target = target || GAME.mousePos || new Vec2(0, 0);
    var angle = target.getAngleBetweenVec2(entity.components.transform2D.position) - degToRad(90) + degToRad(startAngle);
    entity.components.transform2D.angle = angle; //TODO: no idea why necessary but it fixes the problem

    entity.onUpdate = function() {
        var transform = this.components.transform2D;

        if (transform.position.x - transform.dimensions.x / 2 < 0 ||
            transform.position.x + transform.dimensions.x / 2 > GAME.width ||
            transform.position.y - transform.dimensions.y / 2 < 0 ||
            transform.position.y + transform.dimensions.y / 2 > GAME.height
        ) {
            GAME.removeEntity(this);
        }
        // else if () {
        //     transform.position.x -= transform.lastMoveDelta.x || transform.lastMoveDelta;
        // }
        //
        // if () {
        //     transform.position.y -= transform.lastMoveDelta.y || transform.lastMoveDelta;
        // }
        // else if () {
        //     transform.position.y -= transform.lastMoveDelta.y || transform.lastMoveDelta;
        // }
    };

    entity.onCollision = function(e) {
        //TODO
    };

    return entity;
};