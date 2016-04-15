var Transform2D = function(position, dimensions, velocity) {
    this.position = position;
    this.dimensions = dimensions;
    this.velocity = velocity;
    this.maxVelocity = null;
    this.angle = 0;
    this.scale = new Vec2(1, 1);
}
Transform2D.prototype.name = "transform2D";