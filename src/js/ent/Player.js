var Player = function(pos, game) {
    this.game = game;

    var dimensions = new Vec2(0.125, 0.125);
    Entity.prototype.constructor.call(this, pos, dimensions, game);

    this.health = 3;
    this.maxDXMag = 0;
    // this.maxDYMag = 0.175;
    // this.origMaxDYMag = 0.175;
    // this.origX = pos.x;
    // this.origY = pos.y;

    // this.hasGravity = true;
    // this.falling = true;
    // this.gravity = 0.0325;

    // this.canJump = true;
    // this.jumpCapacity = 2;
    // this.jumpCoolDown = 0.5

    this.dead = false;

    this.u1 = 0;
    this.u2 = 0.5;
    this.v1 = 1;
    this.v2 = 0;

    this.collidedWithEnt = function(e) {

    };

    this.collidedWithLvl = function(e) {

    };

    this.tick = function() {

    };
};