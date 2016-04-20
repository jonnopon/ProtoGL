var PausedState = function() {
    return new State("paused",
        function init() {
            GAME.removeSystem(PhysicsSystem2D);
            GAME.removeSystem(AABBCollisionSystem);
            GAME.removeSystem(LevelSystem);

            GAME.userInterfaceManager.clearElements();
            GAME.userInterfaceManager.addElement(new Panel(new Vec2(0, GAME.height - 75), new Vec2(GAME.width / 4, 75), new Vec4(100, 100, 100, 0.25)));
            GAME.userInterfaceManager.addElement(new Panel(new Vec2(GAME.width - (GAME.width / 4), GAME.height - 75), new Vec2(GAME.width / 4, 75), new Vec4(100, 100, 100, 0.25)));
            GAME.userInterfaceManager.addElement(new Panel(new Vec2(GAME.width / 2 - 200, GAME.height - 125), new Vec2(400, 125), new Vec4(100, 100, 100, 0.25)));
            GAME.userInterfaceManager.addElement(new Panel(new Vec2(0, 0), new Vec2(GAME.width, 125), new Vec4(100, 100, 100, 0.25)));

            GAME.textManager.addString("Space to Continue", "center", 45, new Vec2(GAME.width / 2, 70), new Vec4(255, 255, 255, 0), 0, true, true, 150, 35, new Vec4(255, 255, 255, 1), 1);
        },
        function tick() {
            GAME.textManager.addString("Paused", "center", 35, new Vec2(GAME.width / 2, GAME.width / 2), new Vec4(255, 255, 255, 1), 0);

            var player = GAME.filterEntitiesByTag("player")[0];
            if (player !== undefined && player !== null) {
                GAME.textManager.addString("Health:" + player.components.health.value, "left", 25, new Vec2(25, GAME.height - 40), new Vec4(255, 255, 255, 1), 0);
                GAME.textManager.addString("Points:" + Math.round(player.components.points.value) + "\\n\\nMult:" + Math.round(player.components.multiplier.value * 10) / 10, "center", 25, new Vec2(GAME.width / 2, GAME.height - 35), new Vec4(255, 255, 255, 1), 0);
            }
            GAME.textManager.addString("wave:" + GAME.wave, "right", 25, new Vec2(GAME.width - 65, GAME.height - 40), new Vec4(255, 255, 255, 1), 0);

            if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
                GAME.switchToState("game");
            }

            GAME.textManager.addString("X" , "center", 20,  GAME.mousePos, new Vec4(255, 255, 255, 1), 0);

            GAME.entityManager.render();
        }
    );
};
