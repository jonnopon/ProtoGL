var PhysicsSystem3D = function() {
    if (GAME.delta < 10000) {
        var validEnts = GAME.filterEntitiesByComponent(Transform3D);

        // var position = e.components.transform3D.position

        //handle 3D movement
        for (var i = 0; i < validEnts.length; i++) {
            var e = validEnts[i];
            var velocity = e.components.transform3D.velocity;
            var deltaVelocity;
            var transform = e.components.transform3D;

            if (e.tag === "arrow") {
                //move to origin (dimensions / 2 if geometry is generated around the origin)
                var moveToOrigin = new Mat4();

                var trans = new Mat4();
                trans.translate(e.components.transform3D.position);

                var computeMatrix = new Mat4();
                computeMatrix.mat4Mult(trans);

                e.components.transform3D.transform = computeMatrix;
                continue;
            }

            
            //move to origin (dimensions / 2 if geometry is generated around the origin)
            var moveToOrigin = new Mat4();
            var dimensions = transform.dimensions.clone();
            dimensions.scalarDivide(-2);
            moveToOrigin.translate(dimensions);

            //rotation matrix
            var rot = new Mat4();
            rot.rotate(transform.angle.z, new Vec3(0, 0, 1));

            var rot2 = new Mat4();
            rot2.rotate(transform.angle.y, new Vec3(0, 1, 0));

            var rot3 = new Mat4();
            rot3.rotate(transform.angle.x, new Vec3(1, 0, 0));

            var resultRot = rot3.clone();
            resultRot.mat4Mult(rot2);
            resultRot.mat4Mult(rot);

            //translation matrix
            var trans = new Mat4();
            trans.translate(e.components.transform3D.position);

            //scale matrix
            var scale = new Mat4();
            scale.scale(transform.scale);

            //final compute matrix
            var computeMatrix = moveToOrigin.clone();
            computeMatrix.mat4Mult(resultRot);
            computeMatrix.mat4Mult(scale);
            computeMatrix.mat4Mult(trans);

            e.components.transform3D.transform = computeMatrix;

            // var inTr = new Mat4();
            // inTr.mat4Mult(moveToOrigin);
            // inTr.mat4Mult(resultRot);
            // inTr.mat4Mult(resultRot);


            var normalMatrix = new Mat3(computeMatrix.clone());
            normalMatrix.invert();
            normalMatrix.transpose();
            e.components.normalTransform = normalMatrix;

            // var inTr = computeMatrix.clone();
            // inTr.invert();
            // inTr.transpose();
            // e.components.transform3D.normalTransform = inTr;

            // var normalMatrix = computeMatrix.clone();
            // normalMatrix.


            //TODO EXTRA ROTATION OFFSET THAT WILL BE USED FOR TRANSFORM BUT NOT FOR AXES?
            //SO LOCAL ROTATION AND GLOBAL ROTATION
            //LOCAL = ABOUT OWN'S CENTER, DOES NOT AFFECT DIRECTION?
            //GLOBAL = ABOUT OWN'S CENTER, DOES AFFECT DIRECTION?
            //to think about when getting stuck into the physics

            var forward = transform.transform.getForwardVector();
            var up = transform.transform.getUpVector();
            var right = transform.transform.getRightVector();

            e.components.transform3D.forward = forward;
            e.components.transform3D.right = right;
            e.components.transform3D.up = up;

            deltaVelocity = forward.clone();
            deltaVelocity.scalarMult(transform.forwardVelocity * (GAME.delta / 100));
            e.components.transform3D.position.addVec3(deltaVelocity);

            var deltaVelocity = right.clone();
            deltaVelocity.scalarMult(transform.rightVelocity * (GAME.delta / 100));
            e.components.transform3D.position.addVec3(deltaVelocity);

            deltaVelocity = up.clone();
            deltaVelocity.scalarMult(transform.upVelocity * (GAME.delta / 100));
            e.components.transform3D.position.addVec3(deltaVelocity);


            //handle global movement (according to world axes)
            deltaVelocity = velocity.clone();
            deltaVelocity.scalarMult(GAME.delta / 100);
            e.components.transform3D.position.addVec3(deltaVelocity);

            e.components.transform3D.lastMoveDelta = deltaVelocity;
        }
    }
};