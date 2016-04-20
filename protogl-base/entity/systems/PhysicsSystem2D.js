var PhysicsSystem2D = function() {
    var validEnts = GAME.filterEntitiesByComponent(Transform2D);

    //handle 2D movement
    for (var i = 0; i < validEnts.length; i++) {
        var e = validEnts[i];
        var position = e.components.transform2D.position;
        var velocity = e.components.transform2D.velocity;
        var maxVelocity = e.components.transform2D.maxVelocity;
        var deltaVelocity;
        
        if (e.components.transform2D.acceleration != null) {
            var acceleration = e.components.transform2D.acceleration;

            if (e.components.transform2D.forwardVelocity !== null) {
                var forwardVelocity = e.components.transform2D.forwardVelocity;
                var targetForwardVelocity = e.components.transform2D.targetForwardVelocity;
                if (Math.abs(forwardVelocity) < Math.abs(targetForwardVelocity)) {
                    forwardVelocity += acceleration.x;
                }
                if (Math.abs(forwardVelocity) > Math.abs(targetForwardVelocity)) {
                    forwardVelocity = targetForwardVelocity;
                }
                e.components.transform2D.forwardVelocity = forwardVelocity;

                var direction = new Vec2(Math.sin(e.components.transform2D.angle), Math.cos(e.components.transform2D.angle));
                direction.normalize();
                direction.scalarMult(forwardVelocity);
                velocity.set(direction.x, -direction.y);
            }
            else {
                if (Math.abs(velocity.x) < maxVelocity.x) {
                    velocity.x += acceleration.x;
                }
                if (Math.abs(velocity.y) < maxVelocity.y) {
                    velocity.y += acceleration.y;
                }
            }

            deltaVelocity = velocity.clone();
            deltaVelocity.scalarMult(GAME.delta / 100);

            position.addVec2(deltaVelocity);
        }
        else {
            //linear motion
            deltaVelocity = velocity.clone();
            deltaVelocity.scalarMult(GAME.delta / 100);

            position.addVec2(deltaVelocity);
        }

        e.components.transform2D.lastMoveDelta = deltaVelocity;
    }
    
    //handle rotation?
    
    //handle scaling?
};