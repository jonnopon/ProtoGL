var DeadState = function() {
    return new State("dead",
        function init() {
            GAME.removeSystem(PhysicsSystem2D);
            GAME.removeSystem(AABBCollisionSystem);
            GAME.removeSystem(LevelSystem);

            this.player = GAME.filterEntitiesByTag("player")[0];
            GAME.entityManager.clearAllEntities();
            GAME.addEntity(new Background());
            GAME.entityManager.loadEnts();

            GAME.userInterfaceManager.clearElements();

            GAME.textManager.addString("Space to Restart", "center", 45, new Vec2(GAME.width / 2, 70), new Vec4(255, 255, 255, 0), 0, true, true, 150, 35, new Vec4(255, 255, 255, 1), 1);
        },
        function tick() {
            GAME.textManager.addString("You Died!", "center", 60, new Vec2(GAME.width / 2, GAME.height - 100), new Vec4(50, 255, 255, 1), 0);

            GAME.textManager.addString("Points: " + Math.round(this.player.components.points.value), "center", 60, new Vec2(GAME.width / 2, GAME.height / 2 - 100), new Vec4(50, 255, 255, 1), 0);
            GAME.textManager.addString("Wave: " + GAME.wave, "center", 60, new Vec2(GAME.width / 2, GAME.height / 2 + 100), new Vec4(50, 255, 255, 1), 0);

            if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
                GAME.reinit();
            }

            GAME.entityManager.render();
        }
    );
};