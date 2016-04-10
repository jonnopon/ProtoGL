var PhysicsSystem2D = function(delta, entities) {
    //handle 2D movement
    for (var i = 0; i < entities.length; i++) {
        var position = entities[i].components.transform2D.position;
        var velocity = entities[i].components.transform2D.velocity;
        var deltaVelocity = velocity.clone();

        deltaVelocity.vec2Mult(new Vec2(delta / 100, delta / 100));
        position.addVec2(deltaVelocity);
    }
    
    //handle rotation?
    
    //handle scaling?
};
PhysicsSystem2D.prototype.name = "physics2D";