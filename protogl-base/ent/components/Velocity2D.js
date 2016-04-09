var Velocity2D = function(x, y, maxX, maxY) {
    this.value = new Vec2(x, y);
    this.maxValues = new Vec2(maxX, maxY);
};
Velocity2D.prototype.name = "velocity2D";