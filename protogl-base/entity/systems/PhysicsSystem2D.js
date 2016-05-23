var PhysicsSystem2D = function() {
    if (GAME.delta < 10000) {
        var validEnts = GAME.filterEntitiesByComponent(Transform2D);

        //handle 2D movement
        for (var i = 0; i < validEnts.length; i++) {
            var e = validEnts[i];
            var position = e.components.transform2D.position;
            var velocity = e.components.transform2D.velocity;
            var maxVelocity = e.components.transform2D.maxVelocity;
            var deltaVelocity;

            //linear motion
            deltaVelocity = velocity.clone();
            deltaVelocity.scalarMult(GAME.delta / 100);

            position.addVec2(deltaVelocity);

            e.components.transform2D.lastMoveDelta = deltaVelocity;

            //todo COMPUTE MATRIX this is likely to want to end up somewhere else
            var transform2D = e.components.transform2D;
            var tr = transform2D.transform;
            t = new Mat3();

            var moveToOrigin = new Mat3();
            var origin = transform2D.dimensions.clone();
            origin.scalarDivide(-2);
            moveToOrigin.translate(origin);
            // moveToOrigin.setAsTranslation(dimensions);

            var rot = new Mat3();
            rot.rotate(transform2D.angle);
            // rot.setAsRotation(transform2D.angle);
            var trans = new Mat3();
            trans.translate(transform2D.position);
            // trans.setAsTranslation(transform2D.position);
            var scale = new Mat3();
            scale.scale(transform2D.scale);
            // scale.setAsScale(transform2D.scale);


            var result = moveToOrigin.clone();
            result.mat3Mult(rot);
            result.mat3Mult(scale);
            result.mat3Mult(trans);

            transform2D.transform = result;
        }

        //handle rotation?

        //handle scaling?

    }
};