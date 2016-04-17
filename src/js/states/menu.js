var MenuState = function() {
    return new State("menu",
        function init() {
            GAME.addEntity(Background());
            GAME.addEntity(Player());
            GAME.entityManager.loadEnts();

            GAME.userInterfaceManager.clearElements();
            GAME.userInterfaceManager.addElement(new Panel(new Vec2(0, 0), new Vec2(GAME.width, 125), new Vec4(100, 100, 100, 0.25)));

            GAME.textManager.addString("Space to Start", "center", 45, new Vec2(GAME.width / 2, 70), new Vec4(255, 255, 255, 0), 0, true, true, 150, 35, new Vec4(255, 255, 255, 1), 1);
        },
        function tick() {
            GAME.textManager.addString("SharpShifter", "center", 60, new Vec2(GAME.width / 2, GAME.height - 100), new Vec4(50, 255, 255, 1), 0, false);
            GAME.textManager.addString("For Ludum Dare #35", "center", 25, new Vec2(GAME.width / 2, GAME.height / 2- 100), new Vec4(50, 255, 255, 1), 0, false);
            GAME.textManager.addString("Theme: Shapeshift", "center", 25, new Vec2(GAME.width / 2, GAME.height / 2 - 150), new Vec4(50, 255, 255, 1), 0, false);
            GAME.textManager.addString("By jonnopon3000", "center", 25, new Vec2(GAME.width / 2, GAME.height / 2 - 200), new Vec4(50, 255, 255, 1), 0, false);



            if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
                GAME.switchToState("game");
            }

            GAME.entityManager.update();
            GAME.entityManager.render();
        }
    );
};