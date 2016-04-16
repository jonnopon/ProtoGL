var MenuState = function() {
    return new State("menu",
        function init() {
            //nothing to see here
        },
        function tick() {
            GAME.textManager.addString("Shapeshift", "center", 60, new Vec2(GAME.width / 2, GAME.height / 2 + 100), new Vec4(50, 255, 255, 0.5), 0);

            GAME.textManager.addString("Space to Start", "center", 45, new Vec2(GAME.width / 2, 100), new Vec4(255, 255, 255, 0.5), 0);
            if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
                GAME.switchToState("game");
            }
        }
    );
};
