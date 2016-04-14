//TODO: does this make sense as its own system? Should it be part of the PhysicsSystem? (probably)

//TODO: need to find a better place to put this...
var collides = function(e1, e2) {
    //TODO: center the collision box on the entity
    var p1 = e1.components.transform2D.position;
    var d1 = e1.components.AABBCollisionBox.dimensions;
    var p2 = e2.components.transform2D.position;
    var d2 = e2.components.AABBCollisionBox.dimensions;

    return (
        p1.x < (p2.x + d2.x)
        &&
        (p1.x + d1.x) > p2.x
        &&
        p1.y < (p2.y + d2.y)
        &&
        (p1.y + d1.y) > p2.y
    );
};

var AABBCollisionSystem = function() {
    var validEnts = GAME.filterEntitiesByComponentList([Transform2D, AABBCollisionBox]);
    for (var i = 0; i < validEnts.length; i++) {
        for (var j = i + 1; j < validEnts.length; j++) {

            //TODO: reimplement canCollide but based on a per-entity blacklisting system that selects which TYPES of entity to not collide with
            //IE - "if entity I's tag is not in entity J's blacklist and entity J's tag is not in entity I's blacklist
            //keeps the advantage of not calculating collisions for ents that can't collide but allows flexibility beyond "switching collision off" or "on" for a given entity
            //THE LIST SHOULD HAVE A SPECIAL KEYWORD THAT TURNS OFF ALL COLLISIONS FOR A GIVEN ENTITY (ALL?)

            // var canCollide = validEnts[i].components.AABBCollisionBox.active && validEnts[j].components.AABBCollisionBox.active;
            if (/*canCollide && */collides(validEnts[i], validEnts[j])) {
                if (validEnts[i].onCollision !== null) {
                    validEnts[i].onCollision(validEnts[j]);
                }
                if (validEnts[j].onCollision !== null) {
                    validEnts[j].onCollision(validEnts[i]);
                }
            }
        }
    };
};