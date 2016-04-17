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

            GAME.userInterfaceManager.clearElements();
            GAME.userInterfaceManager.addElement(new Panel(new Vec2(0, 0), new Vec2(GAME.width, 125), new Vec4(100, 100, 100, 0.25)));
        },
        function tick() {
            var player = GAME.filterEntitiesByTag("player")[0];
            if (player) {
                GAME.textManager.addString("Health: " + player.components.health.value, "left", 25, new Vec2(15, 55), new Vec4(255, 255, 255, 1), 0);
                GAME.textManager.addString("Points: " + player.components.points.value + "\\nMult: " + Math.round(player.components.multiplier.value * 10) / 10, "center", 25, new Vec2(GAME.width / 2, 70 ), new Vec4(255, 255, 255, 1), 0);
            }
            GAME.textManager.addString("wave: " + GAME.wave, "right", 25,  new Vec2(GAME.width - 100, 55), new Vec4(255, 255, 255, 1), 0);
            
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