var Enemy = function(pos, game) {
    var dimensions = new Vec2(0.115, 0.115);
    Entity.prototype.constructor.call(this, pos, dimensions, game);

    this.hasGravity = false;
    this.u1 = 0.5;
    this.u2 = 1;
    this.v1 = 1;
    this.v2 = 0;

    var r = Math.random();
    var dir =  r < 0.25 ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : 3;
    var xVel = dir == 1 ? this.maxDXMag : dir == 3 ? -this.maxDXMag : 0;
    var yVel = dir == 0 ? this.maxDYMag : dir == 2 ? -this.maxDYMag : 0;
    this.vel = new Vec2(xVel, yVel);

    this.collidedWithEnt = function(e) {
        
    };
};