var GameState = function() {
    return new State("game",
        function init() {

            GAME.entityManager.loadEnts(); //just in case

            GAME.addSystem(PhysicsSystem2D);
            GAME.addSystem(AABBCollisionSystem);

            if (GAME.filterEntitiesByTag("Player").length === 0) {
                GAME.addEntity(Player());
            }
        },
        function tick() {
            GAME.textManager.addString("Game", "center", 35, new Vec2(GAME.width / 2, GAME.width / 2), new Vec4(255, 255, 255, 1), 0);

            if (GAME.inputHandler.isKeyDown(KEYCODES.p)) {
                GAME.switchToState("paused");
            }

            GAME.entityManager.update();
            GAME.entityManager.render();
        }
    );
};
