var DeadState = function() {
    return new State("dead",
        function init() {
            GAME.removeSystem(PhysicsSystem2D);
            GAME.removeSystem(AABBCollisionSystem);
            GAME.removeSystem(LevelSystem);
        },
        function tick() {
            GAME.textManager.addString("You Died", "center", 60, new Vec2(GAME.width / 2, GAME.height / 2 + 100), new Vec4(50, 255, 255, 0.5), 0);

            GAME.textManager.addString("Space to Start", "center", 45, new Vec2(GAME.width / 2, 100), new Vec4(255, 255, 255, 0.5), 0);
            if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
                GAME.reinit();
            }
        }
    );
};