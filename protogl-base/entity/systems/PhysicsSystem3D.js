var PhysicsSystem3D = function() {
    if (GAME.delta < 10000) {
        var validEnts = GAME.filterEntitiesByComponent(Transform3D);

        //handle 2D movement
        for (var i = 0; i < validEnts.length; i++) {
            var e = validEnts[i];
            var position = e.components.transform3D.position;
            var velocity = e.components.transform3D.velocity;
            var maxVelocity = e.components.transform3D.maxVelocity;
            var deltaVelocity;

            //linear motion
            deltaVelocity = velocity.clone();
            deltaVelocity.scalarMult(GAME.delta / 100);

            position.addVec3(deltaVelocity);

            e.components.transform3D.lastMoveDelta = deltaVelocity;

            //todo COMPUTE MATRIX this is likely to want to end up somewhere else
            var transform3D = e.components.transform3D;
            var tr = transform3D.transform;
            t = new Mat4();

            var moveToOrigin = new Mat4();
            var dimensions = transform3D.dimensions.clone();
            dimensions.scalarDivide(-2);
            moveToOrigin.translate(dimensions);

            var rot = new Mat4();
            rot.rotate(transform3D.angle, new Vec3(1, 1, 0));
            var trans = new Mat4();
            trans.translate(transform3D.position);
            var scale = new Mat4();
            scale.scale(transform3D.scale);


            var result = moveToOrigin.clone();
            result.mat4Mult(rot);
            result.mat4Mult(scale);
            result.mat4Mult(trans);

            transform3D.transform = result;
        }
    }
};