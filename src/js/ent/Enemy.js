var Enemy = function(pos, game) {
    var dimensions = new Vec2(0.115, 0.115);
    Entity.prototype.constructor.call(this, pos, dimensions, game);

    this.hasGravity = false;
    this.u1 = 0.5;
    this.u2 = 1;
    this.v1 = 1;
    this.v2 = 0;
    this.maxDXMag = 0.3;

    var r = Math.random();
    var vel = r * this.maxDXMag;
    var dir =  r < 0.25 ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : 3;
    var xVel = dir == 1 ? vel : dir == 3 ? -vel : 0;
    var yVel = dir == 0 ? vel : dir == 2 ? vel : 0;
    this.vel = new Vec2(xVel, yVel);

    this.update = function() {
        if (this.pos.x + this.width < -1) {
            this.pos.x = 1;
        }
        else if (this.pos.x >= 1) {
            this.pos.x = -1 - this.width;
        }

        if (this.pos.y > 1) {
            this.pos.y = -1 - this.height;
        }
        else if (this.pos.y + this.height < -1) {
            this.pos.y = 1;
        }
    }
};