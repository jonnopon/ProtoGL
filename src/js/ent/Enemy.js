var Enemy = function(game) {
    var minVel = 30,
        maxVel = 75;

    var velMag = randomBetween(minVel, maxVel);
    var r = Math.random();
    var dir = r < 0.25 ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : 3;
    var xVel = dir === 1 ? velMag : dir === 3 ? -velMag : 0;
    var yVel = dir === 0 ? velMag : dir === 2 ? -velMag : 0;
    var vel = new Vec2(xVel, yVel);

    var posX = randomBetween(50, game.width - 50);
    var posY = randomBetween(50, game.height - 50);
    var pos = new Vec2(posX, posY);

    var angle = 180;
    switch (dir) {
        case 1:
            angle = 90;
            break;
        case 2:
            angle = 0;
            break;
        case 3:
            angle = -90;
            break;
    }

    var entity = new Entity("enemy", game);
    entity.addComponent(new Sprite(0.25, 0, 0.5, 1));
    entity.addComponent(new Transform2D(pos, new Vec2(30, 30), vel));
    entity.addComponent(new AABBCollisionBox(new Vec2(30, 30)));

    entity.components.transform2D.angle = degToRad(angle);

    entity.onUpdate = function() {
        var pos = this.components.transform2D.position;
        var dim = this.components.transform2D.dimensions;

        if (pos.x + dim.x < 0) {
            pos.x = this.game.width;
        }
        else if (pos.x > this.game.width) {
            pos.x = -dim.x;
        }

        if (pos.y > this.game.height) {
            pos.y = -dim.y;
        }
        else if (pos.y + dim.y < 0) {
            pos.y = this.game.height;
        }
    };

    return entity;
}