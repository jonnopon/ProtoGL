var GameState = function() {
    return new State("game",
        function init() {
            if (GAME.filterEntitiesByTag("player").length === 0) {
                GAME.addEntity(Player());
            }
            if (GAME.filterEntitiesByTag("food").length === 0) {
                GAME.genFood();
            }
            GAME.entityManager.loadEnts(); //just in case

            GAME.addSystem(PhysicsSystem2D);
            GAME.addSystem(AABBCollisionSystem);

            GAME.userInterfaceManager.addElement(new Panel(new Vec2(0, GAME.height - 85), new Vec2(275, 85), new Vec4(255, 255, 255, 0.25)));
        },
        function tick() {
            var player = GAME.filterEntitiesByTag("player")[0]; //we know there is only one player because we added it!
            var health = player.components.health.value;
            var points = player.components.points.value;

            var healthCol;
            switch (health) {
                case 1:
                    healthCol = new Vec4(255, 0, 0, 0.75);
                    break;
                case 2:
                    healthCol = new Vec4(255, 255, 0, 0.75);
                    break;
                case 3:
                    healthCol = new Vec4(0, 255, 0, 0.75);
                    break;
                default:
                    healthCol = new Vec4(0, 0, 0, 0.75);
            }

            GAME.textManager.addString("health: " + health, "left", 25, new Vec2(10, GAME.height - 25), healthCol, 0);
            GAME.textManager.addString("Points: " + points, "left", 25, new Vec2(10, GAME.height - 60), new Vec4(255, 255, 255, 0.75), 0);

            if (player.components.transform2D.velocity.x === 0 && player.components.transform2D.velocity.y === 0) {
                GAME.textManager.addString("W", "center", 25, new Vec2(GAME.width / 2 + 20, GAME.height / 2 + 60), new Vec4(255, 255, 255, 0.5), 0);
                GAME.textManager.addString("A", "center", 25, new Vec2(GAME.width / 2 - 20, GAME.height / 2 + 20), new Vec4(255, 255, 255, 0.5), 0);
                GAME.textManager.addString("D", "center", 25, new Vec2(GAME.width / 2 + 60, GAME.height / 2 + 20), new Vec4(255, 255, 255, 0.5), 0);
                GAME.textManager.addString("S", "center", 25, new Vec2(GAME.width / 2 + 20, GAME.height / 2 - 20), new Vec4(255, 255, 255, 0.5), 0);
            }

            if (GAME.inputHandler.isKeyDown(KEYCODES.p)) {
                GAME.switchToState("paused");
            }

            if (points > 0 && points % 5 == 0) {
                GAME.genEnemy(points);
            }

            if (player.components.health.value <= 0) {
                GAME.switchToState("dead");
            }

            GAME.entityManager.update();
            GAME.entityManager.render();
        }
    );
};
