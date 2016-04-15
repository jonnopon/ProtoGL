var Enemy = function() {
    //NB: ridiculous ternaries ahead. Turn away now if you like being able to read code
    var velMag = randomBetween(30, 75), //magnitude of the entity's velocity
        r = Math.random();

    //generate a velocity either positive or negative along a single axis only
    var dir = r < 0.25 ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : 3;
    var xVel = dir === 1 ? velMag : dir === 3 ? -velMag : 0,
        yVel = dir === 0 ? velMag : dir === 2 ? -velMag : 0;
    var velocity = new Vec2(xVel, yVel);

    //set the rotation of the entity so that it points in the right direction
    var angle = dir === 0 ? 180 : dir === 1 ? 90 : dir === 2 ? 0 : -90;

    //generate an initial position
    var position = new Vec2(randomBetween(50, GAME.width - 50), randomBetween(50, GAME.height - 50));

    //set the absolute pixel dimensions of the entity
    var dimensions = new Vec2(30, 30);

    var entity = new Entity("enemy");
    entity.addComponent(new Sprite(0.25, 0, 0.5, 1));
    entity.addComponent(new Transform2D(position, dimensions, velocity));
    entity.addComponent(new AABBCollisionBox(dimensions));
    entity.components.transform2D.angle = degToRad(angle);

    entity.onUpdate = function() {
        var transform = this.components.transform2D;

        //create a looping behavior through the edges of the screen
        if (transform.position.x + transform.dimensions.x < 0) {
            transform.position.x = GAME.width;
        }
        else if (transform.position.x > GAME.width) {
            transform.position.x = -transform.dimensions.x;
        }

        if (transform.position.y > GAME.height) {
            transform.position.y = -transform.dimensions.y;
        }
        else if (transform.position.y + transform.dimensions.y < 0) {
            transform.position.y = GAME.height;
        }
    };

    return entity;
};