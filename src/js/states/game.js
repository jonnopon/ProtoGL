var GameState = function() {
    return new State("game",
        function init() {

            GAME.entityManager.loadEnts(); //just in case

            GAME.addSystem(PhysicsSystem2D);
            GAME.addSystem(AABBCollisionSystem);

            if (GAME.filterEntitiesByTag("player").length === 0) {
                var player1 = Player();
                player1.removeComponent(FlatColor);
                player1.addComponent(new Sprite(0, 0, 0.25, 1));
                player1.components.transform2D.position = new Vec2(GAME.width / 4, GAME.height - 200);

                var player2 = Player();

                GAME.addEntity(player2);
                GAME.addEntity(player1);

                // GAME.entityManager.loadEnts();
            }
        },
        function tick() {
            GAME.textManager.addString("Game", "center", 35, new Vec2(GAME.width / 2, GAME.width / 2), new Vec4(255, 255, 255, 1), 0);

            if (GAME.inputHandler.isKeyDown(KEYCODES.p)) {
                GAME.switchToState("paused");
            }

            GAME.entityManager.update();
            GAME.entityManager.render();
        }
    );
};
