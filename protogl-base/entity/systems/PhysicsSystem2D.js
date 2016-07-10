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
        }

        //handle rotation?

        //handle scaling?

    }
};