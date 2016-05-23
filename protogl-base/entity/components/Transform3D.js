//TODO MERGE/MIX/GENERIFY WITH TRANSFORM2D?

var Transform3D = function(position, dimensions, velocity) {
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
    this.scale = new Vec3(1, 1, 1);
    this.transform = new Mat4();
};
Transform3D.prototype.name = "transform3D";