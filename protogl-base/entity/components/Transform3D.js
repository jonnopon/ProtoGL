//TODO MERGE/MIX/GENERIFY WITH TRANSFORM2D?

var Transform3D = function(position, dimensions, velocity) {
    this.position = position;
    this.dimensions = dimensions;
    this.velocity = velocity;
    this.forwardVelocity = 0;
    this.targetForwardVelocity = null;
    this.maxVelocity = null;
    this.acceleration = null;
    this.rotationalVelocity = 0;
    this.lastMoveDelta = 0;
    this.thrust = 0;
    // this.angle = 0;

    this.firstForward = new Vec3(0, 0, -1);
    this.forward = new Vec3(0, 0, -1);
    this.firstUp = new Vec3(0, 1, 0);
    this.up = new Vec3(0, 1, 0);
    this.firstRight = new Vec3(1, 0, 0);
    this.right = new Vec3(1, 0, 0);
    
    this.speed = 0;

    this.moveType = 0;

    this.upVelocity = 0;
    this.rightVelocity = 0;

    //split into angleX, angleY, angleZ and set up shader properties to match
    this.angle = new Vec3(0, 0, 0);
    
    this.scale = new Vec3(1, 1, 1);
    this.transform = new Mat4();
    this.normalTransform = new Mat3();
};
Transform3D.prototype.name = "transform3D";