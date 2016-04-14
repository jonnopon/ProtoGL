var PausedState = function() {
    return new State("paused",
        function init() {
            GAME.removeSystem(PhysicsSystem2D);
            GAME.removeSystem(AABBCollisionSystem);
        },
        function tick() {
            var player = GAME.filterEntitiesByTag("player")[0]; //we know there is only one player because we added it!
            var health = player.components.health.value;
            var points = player.components.points.value;

            var healthCol;
            switch (health) {
                case 1:
                    healthCol = new Vec4(255, 0, 0, 0.5);
                    break;
                case 2:
                    healthCol = new Vec4(255, 255, 0, 0.5);
                    break;
                case 3:
                    healthCol = new Vec4(0, 255, 0, 0.5);
                    break;
                default:
                    healthCol = new Vec4(0, 0, 0, 0.5);
            }

            GAME.textManager.addString("health: " + health, "left", 25, new Vec2(10, GAME.height - 25), healthCol, 0);
            GAME.textManager.addString("Points: " + points, "left", 25, new Vec2(10, GAME.height - 60), new Vec4(255, 255, 255, 0.5), 0);
            GAME.textManager.addString("Paused", "center", 45, new Vec2(GAME.width / 2, GAME.height - 150), new Vec4(50, 255, 255, 0.5), 0);
            GAME.textManager.addString("Space to Resume", "center", 45, new Vec2(GAME.width / 2, 100), new Vec4(255, 255, 255, 0.5), 0);

            if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
                GAME.switchToState("game");
            }

            GAME.entityManager.render();
        }
    );
};
