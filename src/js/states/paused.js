var PausedState = function() {
    return new State("paused",
        function init() {
            GAME.removeSystem(PhysicsSystem2D);
            GAME.removeSystem(AABBCollisionSystem);
            GAME.removeSystem(LevelSystem);
            // GAME.userInterfaceManager.clearElements();
            GAME.userInterfaceManager.clearElements();
            GAME.userInterfaceManager.addElement(new Panel(new Vec2(0, 0), new Vec2(GAME.width, 125), new Vec4(100, 100, 100, 0.25)));
        },
        function tick() {
            GAME.textManager.addString("Paused", "center", 35, new Vec2(GAME.width / 2, GAME.width / 2), new Vec4(255, 255, 255, 1), 0);

            var player = GAME.filterEntitiesByTag("player")[0];
            if (player) {
                GAME.textManager.addString("Health: " + player.components.health.value, "left", 25, new Vec2(15, 55), new Vec4(255, 255, 255, 1), 0);
                GAME.textManager.addString("Points: " + player.components.points.value + "\\nMult: " + Math.round(player.components.multiplier.value * 10) / 10, "center", 25, new Vec2(GAME.width / 2, 70 ), new Vec4(255, 255, 255, 1), 0);
            }
            GAME.textManager.addString("wave: " + GAME.wave, "right", 25,  new Vec2(GAME.width - 100, 55), new Vec4(255, 255, 255, 1), 0);

            if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
                GAME.switchToState("game");
            }

            GAME.entityManager.render();
        }
    );
};
