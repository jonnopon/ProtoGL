var GameState = function() {
    return new State("game",
        function init() {
            GAME.entityManager.loadEnts();

            GAME.addSystem(PhysicsSystem2D);
            GAME.addSystem(AABBCollisionSystem);
            GAME.addSystem(LevelSystem);

            if (GAME.filterEntitiesByTag("player").length === 0) {
                GAME.addEntity(Player());
            }
            if (GAME.filterEntitiesByTag("background").length === 0) {
                GAME.addEntity(Background());
            }

            GAME.userInterfaceManager.clearElements();
            GAME.userInterfaceManager.addElement(new Panel(new Vec2(0, GAME.height - 75), new Vec2(GAME.width / 4, 75), new Vec4(100, 100, 100, 0.25)));
            GAME.userInterfaceManager.addElement(new Panel(new Vec2(GAME.width - (GAME.width / 4), GAME.height - 75), new Vec2(GAME.width / 4, 75), new Vec4(100, 100, 100, 0.25)));
            GAME.userInterfaceManager.addElement(new Panel(new Vec2(GAME.width / 2 - 200, GAME.height - 125), new Vec2(400, 125), new Vec4(100, 100, 100, 0.25)));
        },
        function tick() {
            var player = GAME.filterEntitiesByTag("player")[0];
            if (player) {
                GAME.textManager.addString("Health: " + player.components.health.value, "left", 20, new Vec2(30, GAME.height - 40), new Vec4(255, 255, 255, 1), 0);
                GAME.textManager.addString("Points: " + Math.round(player.components.points.value) + "\\n\\nMult: " + Math.round(player.components.multiplier.value * 10) / 10, "center", 20, new Vec2(GAME.width / 2, GAME.height - 35), new Vec4(255, 255, 255, 1), 0);
            }
            GAME.textManager.addString("wave: " + GAME.wave, "right", 20, new Vec2(GAME.width - 65, GAME.height - 40), new Vec4(255, 255, 255, 1), 0);
            
            GAME.textManager.addString("mouse" + GAME.wave, "center", 10,  GAME.mousePos, new Vec4(255, 255, 255, 1), 0);

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