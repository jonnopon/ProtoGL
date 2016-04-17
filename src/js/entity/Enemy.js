var Enemy = function(type) {
    var entity = new Entity("enemy");

    var vel = new Vec2();
    var dimensions = new Vec2();
    var pos = new Vec2();
    var points = 0;
    var angle = 0;
    var col = new Vec4(0, 0, 0, 1)
    var mult = 0;

    //randomise based on type
    if (type === "square") {
        vel.x = randomBetween(-25, 25);
        vel.y = randomBetween(-25, 25);
        dimensions.x = 15;
        dimensions.y = 15;
        pos.x = randomBetween(dimensions.x * 2, GAME.width - dimensions.y * 2);
        pos.y = randomBetween(dimensions.y, GAME.height - dimensions.x * 2, GAME.height - dimensions.y * 2);
        points = 100;
        mult = 0.1;

        col = new Vec4(252, 130, 195, 1);
    }
    else if (type === "triangle") {
        var r = Math.random();
        var dir = r < 0.25 ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : 3;
        //generate a velocity either positive or negative along a single axis only
        var velMag = randomBetween(30, 75); //magnitude of the entity's velocity
        var dir = r < 0.25 ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : 3;
        var xVel = dir === 1 ? velMag : dir === 3 ? -velMag : 0,
            yVel = dir === 0 ? velMag : dir === 2 ? -velMag : 0;
        var velocity = new Vec2(xVel, yVel);
        vel.x = velocity.x;
        vel.y = velocity.y;

        //set the rotation of the entity so that it points in the right direction
        angle = dir === 0 ? 180 : dir === 1 ? 90 : dir === 2 ? 0  : -90;

        //generate an initial position
        var position = new Vec2(randomBetween(50, GAME.width - 50), randomBetween(50, GAME.height - 50));
        pos.x = position.x;
        pos.y = position.y;

        dimensions.x = 25;
        dimensions.y = 25;
        points = 250;
        mult = 0.5;

        col = new Vec4(225, 200, 41, 1);
    }
    else if (type === "pentagon") {
        var r = Math.random();
        var dir = r < 0.25 ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : 3;
        //generate a velocity either positive or negative along a single axis only
        var velMag = randomBetween(30, 75); //magnitude of the entity's velocity
        var dir = r < 0.25 ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : 3;
        var xVel = dir === 1 ? velMag : dir === 3 ? -velMag : 0,
            yVel = dir === 0 ? velMag : dir === 2 ? -velMag : 0;
        var velocity = new Vec2(xVel, yVel);
        vel.x = 0;
        vel.y = 0;

        //generate an initial position
        var position = new Vec2(randomBetween(50, GAME.width - 50), randomBetween(50, GAME.height - 50));
        pos.x = position.x;
        pos.y = position.y;

        dimensions.x = 35 ;
        dimensions.y = 35;
        points = 250;
        mult = 0.5;

        col = new Vec4(47, 181, 243, 1);

        entity.addComponent(new Gun(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY, 625, [
            //bullet offsets
            new Vec2(0, 0),
            new Vec2(0, 0),
            new Vec2(0, 0),
        ], [
            //starting angles
            -90, -90 + 55, -90 - 55
        ], [
            //bullet targets
            new Vec2(pos.x, pos.y),
            new Vec2(pos.x, pos.y),
            new Vec2(pos.x, pos.y),
        ]));
    };

    entity.addComponent(new Transform2D(pos, dimensions, vel));
    entity.addComponent(new AABBCollisionBox(dimensions));
    entity.addComponent(new Shape(type, dimensions, pos));
    entity.addComponent(new FlatColor(col));
    entity.addComponent(new Points(points));
    entity.addComponent(new Multiplier(mult));

    // entity.components.transform2D.angle = degToRad(angle);

    entity.onUpdate = function() {
        var transform = this.components.transform2D;

        if (transform.position.x - transform.dimensions.x / 2 < 0 || transform.position.x + transform.dimensions.x / 2 > GAME.width) {
            transform.position.x -= transform.lastMoveDelta.x || transform.lastMoveDelta;
            transform.velocity.x = -transform.velocity.x;

            transform.angle += degToRad(180);
        }

        if (transform.position.y - transform.dimensions.y / 2 < 0 || transform.position.y + transform.dimensions.y / 2 > GAME.height) {
            transform.position.y -= transform.lastMoveDelta.y || transform.lastMoveDelta;
            transform.velocity.y = -transform.velocity.y;

            transform.angle -= degToRad(180);
        }

        if (type === "pentagon") {
            this.components.transform2D.angle += degToRad(1);
            for (var i = 0; i < this.components.gun.startingAngles.length; i++) {
                this.components.gun.startingAngles[i] += 1;
            }
            this.components.gun.shoot(this, this.components.gun);
        };
    };

    entity.onCollision = function(e) {
        if (e.tag === "bullet:player") {
            GAME.removeEntity(this);
            GAME.addPoints(this.components.points.value);
            GAME.addMultiplier(this.components.multiplier.value);
        }
        if (e.tag === "player") {
            GAME.removeEntity(this);
        }
    };

    return entity;
};