var Bullet = function(owner, startAngle, target) {
    var entity = new Entity("bullet:" + owner.tag);

    var center = owner.components.transform2D.position.clone();
    var dimensions = new Vec2(10, 35);
    var col = new Vec4(255, 255, 255, 1);
    if (owner.tag.indexOf("enemy") > -1) {
        col = new Vec4(255, 0, 102, 1);
    }

    entity.addComponent(new Transform2D(center, dimensions, new Vec2(0, 0)));
    entity.addComponent(new AABBCollisionBox(dimensions));
    entity.addComponent(new Health(3));
    entity.addComponent(new Points());
    entity.addComponent(new Shape("rect", dimensions, center));
    entity.addComponent(new FlatColor(col));

    entity.components.transform2D.targetForwardVelocity = 150;
    entity.components.transform2D.acceleration = new Vec2(1000, 1000);
    entity.components.transform2D.rotationalVelocity = 0;
    entity.components.transform2D.forwardVelocity = 0;
    entity.components.transform2D.maxVelocity = new Vec2(1000, 1000);

    var target = target || GAME.mousePos || new Vec2(0, 0);
    entity.components.transform2D.angle = target.getAngleBetweenVec2(entity.components.transform2D.position) - degToRad(90) + degToRad(startAngle);;

    entity.onUpdate = function() {
        var transform = this.components.transform2D;

        if (transform.position.x - transform.dimensions.x / 2 < 0 ||
            transform.position.x + transform.dimensions.x / 2 > GAME.width ||
            transform.position.y - transform.dimensions.y / 2 < 0 ||
            transform.position.y + transform.dimensions.y / 2 > GAME.height
        ) {
            GAME.removeEntity(this);
        }
    };

    return entity;
};