var PhysicsSystem2D = function(game) {
    var validEnts = game.filterEntitiesByComponent(Transform2D);

    //handle 2D movement
    for (var i = 0; i < validEnts.length; i++) {
        var position = validEnts[i].components.transform2D.position;
        var velocity = validEnts[i].components.transform2D.velocity;
        var deltaVelocity = velocity.clone();

        deltaVelocity.scalarMult(game.delta / 100);
        position.addVec2(deltaVelocity);
    }
    
    //handle rotation?
    
    //handle scaling?
};