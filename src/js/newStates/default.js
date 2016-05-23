var DefaultState = function() {
    return new State("default",
        function init() {
            var edge = 30;
            var cellsX = Math.round(GAME.width / edge);
            var cellsY = Math.round(GAME.height / edge);

            for (var i = 0; i < cellsX; i++) {
                for (var j = 0; j < cellsY; j++) {
                    var col = new Vec4(
                        randomBetween(1, 255),
                        randomBetween(1, 255),
                        randomBetween(1, 255),
                        1
                    );
                    GAME.addEntity(Triangle(new Vec2(i * edge + (edge / 2), j * edge + (edge / 2)), col));
                }
            }
            // GAME.addEntity(Cube(new Vec3(GAME.resolution.x / 2, GAME.resolution.y / 2, 100), new Vec4(255, 255, 255, 1)));

            GAME.entityManager.loadEnts();

            //TODO: only need this right now because the physics system calculates the compute matrices
            //(though does that actually make some kind of sense? If physics is responsible for world transformation?)
            GAME.addSystem(PhysicsSystem3D);
            GAME.addSystem(PhysicsSystem2D);
        },
        function tick() {
            GAME.entityManager.update();
            GAME.entityManager.render();
        }
    );
};