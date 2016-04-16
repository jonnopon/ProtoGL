var PausedState = function() {
    return new State("paused",
        function init() {
            GAME.removeSystem(PhysicsSystem2D);
            GAME.removeSystem(AABBCollisionSystem);
            GAME.removeSystem(LevelSystem);
        },
        function tick() {
            GAME.textManager.addString("Paused", "center", 35, new Vec2(GAME.width / 2, GAME.width / 2), new Vec4(255, 255, 255, 1), 0);

            if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
                GAME.switchToState("game");
            }

            GAME.entityManager.render();
        }
    );
};
