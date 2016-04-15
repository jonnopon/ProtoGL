var DeadState = function() {
    return new State("dead",
        function init() {
            GAME.removeSystem(PhysicsSystem2D);
            GAME.removeSystem(AABBCollisionSystem);

            GAME.userInterfaceManager.clearElements();
        },
        function tick() {
            var player = GAME.filterEntitiesByTag("player")[0]; //we know there is only one player because we added it!
            var points = player.components.points.value;

            GAME.textManager.addString("You died!", "center", 45, new Vec2(GAME.width / 2, GAME.height - 50), new Vec4(50, 255, 255, 0.5), 0);
            GAME.textManager.addString("Points: " + points, "center", 55, new Vec2(GAME.width / 2, GAME.height / 2), new Vec4(255, 255, 255, 0.5), 0);
            GAME.textManager.addString("Space to Restart", "center", 45, new Vec2(GAME.width / 2, 100), new Vec4(255, 255, 255, 0.5), 0);

            if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
                GAME.reinit();
            }
        }
    );
};
