var MovementSystem2D = function(delta, movingEntities) {
    for (var i = 0; i < movingEntities.length; i++) {
        var position = movingEntities[i].components.position2D;
        var velocity = movingEntities[i].components.velocity2D;

        position.value.addVec2(velocity.value);
    }
};