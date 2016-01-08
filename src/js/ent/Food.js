var Food = function(pos, game) {
    var dimensions = new Vec2(0.1, 0.1);
    Entity.prototype.constructor.call(this, pos, dimensions, game);

    this.hasGravity = false;
    this.u1 = 0.5;
    this.u2 = 1;
    this.v1 = 1;
    this.v2 = 0;

    this.collidedWithEnt = function(e) {
        if (e instanceof Player) {
            this.game.genFood();
            this.destroy();
            this.noCollideEnt = true;
        }
    };
};