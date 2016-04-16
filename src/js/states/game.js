var GameState = function() {
    return new State("game",
        function init() {

            GAME.entityManager.loadEnts(); //just in case

            GAME.addSystem(PhysicsSystem2D);
            GAME.addSystem(AABBCollisionSystem);
            GAME.addSystem(LevelSystem);

            if (GAME.filterEntitiesByTag("player").length === 0) {
                GAME.addEntity(Player());
            }
            if (GAME.filterEntitiesByTag("background").length === 0) {
                GAME.addEntity(Background());
            }
        },
        function tick() {
            GAME.textManager.addString("Health: ", "left", 25, new Vec2(15, GAME.height - 25), new Vec4(255, 255, 255, 1), 0);
            GAME.textManager.addString("Points: ", "left", 25, new Vec2(15, GAME.height - 60), new Vec4(255, 255, 255, 1), 0);
            GAME.textManager.addString("mouse", "center", 10, GAME.mousePos, new Vec4(255, 255, 255, 1), 0);

            if (GAME.inputHandler.isKeyDown(KEYCODES.p)) {
                GAME.switchToState("paused");
            }

            if (GAME.mouseDown) {
                GAME.entityShoot(GAME.filterEntitiesByTag("player")[0]);
            }

            GAME.entityManager.update();
            GAME.entityManager.render();
        }
    );
};