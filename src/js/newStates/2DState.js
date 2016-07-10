var State2D = function() {
    return new State("2DState",
        function init() {
            GAME.clearEntities();

            // GAME.userInterfaceManager.cleanElements();
            // GAME.userInterfaceManager.addElement(Panel(new Vec2(100, 50), new Vec2(200, 100), new Vec4(100, 100, 100, 0.25)));
            // GAME.userInterfaceManager.addElement(Panel(new Vec2(GAME.width - (GAME.width / 4), GAME.height - 75), new Vec2(GAME.width / 4, 75), new Vec4(100, 100, 100, 0.25)));
            // GAME.userInterfaceManager.addElement(Panel(new Vec2(GAME.width / 2 - 200, GAME.height - 125), new Vec2(400, 125), new Vec4(100, 100, 100, 0.25)));

            var edge = 35;
            var cellsX = Math.round(GAME.width / edge);
            var cellsY = Math.round(GAME.height / edge);

            GAME.addEntity(Grid(new Vec2(GAME.width / 2, GAME.height / 2), 25, 25));
            GAME.addEntity(Grid(new Vec2(GAME.width / 2, GAME.height / 2), 30, 30));
            GAME.addEntity(Grid(new Vec2(GAME.width / 4, GAME.height / 4), 15, 15));
            GAME.addEntity(Grid(new Vec2(GAME.width / 8, GAME.height / 8), 35, 35));
            GAME.addEntity(Grid(new Vec2(GAME.width, GAME.height), 50, 50));
            GAME.addEntity(Grid(new Vec2(GAME.width, GAME.height), 10, 10));

            for (var i = 0; i < cellsX; i++) {
                for (var j = 0; j < cellsY; j++) {
                    var col = new Vec4(255, 255, 255, 1);

                    var chance = randomBetween(1, 1200);
                    if (chance < 200) {
                        GAME.addEntity(F(new Vec2(i * edge + (edge / 2), j * edge + (edge / 2)), col));
                    }
                    else if (chance < 400) {
                        GAME.addEntity(Triangle(new Vec2(i * edge + (edge / 2), j * edge + (edge / 2)), col));
                    }
                    else if (chance < 600) {
                        GAME.addEntity(Pentagon(new Vec2(i * edge + (edge / 2), j * edge + (edge / 2)), col));
                    }
                    else if (chance < 800) {
                        GAME.addEntity(Circle(new Vec2(i * edge + (edge / 2), j * edge + (edge / 2)), col));
                    }
                    else if (chance < 1000) {
                        GAME.addEntity(Line(new Vec2(i * edge + (edge / 2), j * edge + (edge / 2)), col));
                    }
                    else {
                        GAME.addEntity(Rect(new Vec2(i * edge + (edge / 2), j * edge + (edge / 2)), col));
                    }
                }
            }

            GAME.entityManager.loadEnts();
        },
        function tick() {
            GAME.textManager.addString("X" , "center", 20,  GAME.mousePos, new Vec4(255, 255, 255, 1), 0);

            if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
                GAME.switchToState("3DState");
            }
            
            if (GAME.inputHandler.isKeyDown(KEYCODES.p)) {
                GAME.displayStats = false;

                LASTFPS = Math.round((1000 / GAME.delta) * 10) / 10;
            }
            else if (GAME.inputHandler.isKeyDown(KEYCODES.l)) {
                GAME.displayStats = true;
            }

            if (!GAME.displayStats) {
                var fps = Math.round((1000 / GAME.delta) * 10) / 10;
                if (fps > LASTFPS) {
                    document.body.style.background = "rgb(0, 255, 0)";

                    document.title = "FPS GAIN: " + (fps - LASTFPS);
                }
                else {
                    document.body.style.background = "rgb(255, 255, 255)";

                    // document.title = "FPS GAIN: " + (fps - LASTFPS);
                }
            }


            GAME.entityManager.update();
            GAME.entityManager.render();

            GAME.userInterfaceManager.update();
            GAME.userInterfaceManager.render();

            GAME.textManager.render();
        }
    );
};