var Transform2D = function(position, dimensions, velocity) {
    this.position = position;
    this.dimensions = dimensions;
    this.velocity = velocity;
    this.forwardVelocity = null;
    this.targetForwardVelocity = null;
    this.maxVelocity = null;
    this.acceleration = null;
    this.rotationalVelocity = 0;
    this.lastMoveDelta = 0;
    this.thrust = 0;
    this.angle = 0;
    this.scale = new Vec2(1, 1);
}
Transform2D.prototype.name = "transform2D";