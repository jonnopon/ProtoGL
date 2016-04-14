//The init function is called on page load, and is where all your game configuration will happen (for now)
var init = function() {
    //Construct the Game object, setting its width and height in pixels
    var game = new Game(800, 600);
    game.setBackgroundColor(new Vec3(0, 0, 0));

    //STEP 1: attach init data to the game object (loaded upon game initialisation)
    game.initData = {
        "lastGen": 0
    };
    //STEP 2: attach initialisation function to the game (called during game.start())
    game.initFunc = function() {
        this.initManagers();
        this.displayStats = true;

        this.soundManager.addSound("point", "res/snd/collect.wav");
        this.soundManager.addSound("hit", "res/snd/hit.wav");
        this.switchToState("menu");
    };

    //STEP 3: attach reinit data to the game object (loaded upon game re-initialisation)
    //it may be useful here, for more complex games, to leave some data unchanged on re-initialisation
    //this is designed to allow flexible control of the game loop
    game.reinitData = {
        "lastGen": 0
    };
    //STEP 4: attach re-initialisation function to the game (called during game.reinit())
    game.reinitFunc = function () {
        this.initManagers();
        this.displayStats = true;

        this.soundManager.addSound("point", "res/snd/collect.wav");
        this.soundManager.addSound("hit", "res/snd/hit.wav");
        this.switchToState("game");
    };

    //STEP 5: attach utility functions to game - global game behaviors accessible anywhere
    game.genFood = function() {
        this.addEntity(Food());
    };
    game.genEnemy = function(currentPoints) {
        if (currentPoints > this.lastGen) {
            this.addEntity(Enemy());
        }
        this.lastGen = currentPoints;
    };

    //STEP 6: define the game states
    //a state is a distinct segment of game functionality - like menu, the game itself, paused, dead
    //a state has a name, an init function (called when the state is switched to) and a "tick" function (called on every frame of the state's execution)
    //inside the function bodies, it's best to refer to the global GAME variable rather than the local variable constructed in this script here
    var menuInit = function() {
        //nothing to see here
    };
    var menuTick = function() {
        GAME.textManager.addString("ProtoGL Demo", "center", 45, new Vec2(GAME.width / 2, GAME.height - 100), new Vec4(50, 255, 255, 0.5), 0);

        GAME.textManager.addString("Space to Start", "center", 45, new Vec2(GAME.width / 2, 100), new Vec4(255, 255, 255, 0.5), 0);
        if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
            GAME.switchToState("game");
        }
    };

    var gameInit = function() {
        if (GAME.filterEntitiesByTag("player").length === 0) {
            GAME.addEntity(Player());
        }
        if (GAME.filterEntitiesByTag("food").length === 0) {
            GAME.genFood();
        }
        GAME.entityManager.loadEnts(); //just in case

        GAME.addSystem(PhysicsSystem2D);
        GAME.addSystem(AABBCollisionSystem);

        GAME.userInterfaceManager.addElement(new Panel(new Vec2(0, GAME.height - 85), new Vec2(250, 85), new Vec4(255, 255, 255, 0.25)));
    };
    var gameTick = function() {
        var player = game.filterEntitiesByTag("player")[0]; //we know there is only one player because we added it!
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
    };

    var pauseInit = function() {
        //we do this simply to save processing power in states that don't require these features
        GAME.removeSystem(PhysicsSystem2D);
        GAME.removeSystem(AABBCollisionSystem);
    };
    var pauseTick = function() {
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
    };

    var deadInit = function() {
        //we do this simply to save processing power in states that don't require these features
        GAME.removeSystem(PhysicsSystem2D);
        GAME.removeSystem(AABBCollisionSystem);

        GAME.userInterfaceManager.clearElements();
    };
    var deadTick = function() {
        var player = GAME.filterEntitiesByTag("player")[0]; //we know there is only one player because we added it!
        var points = player.components.points.value;

        GAME.textManager.addString("You died!", "center", 45, new Vec2(GAME.width / 2, GAME.height - 50), new Vec4(50, 255, 255, 0.5), 0);
        GAME.textManager.addString("Points: " + points, "center", 55, new Vec2(GAME.width / 2, GAME.height / 2), new Vec4(255, 255, 255, 0.5), 0);
        GAME.textManager.addString("Space to Restart", "center", 45, new Vec2(GAME.width / 2, 100), new Vec4(255, 255, 255, 0.5), 0);

        if (GAME.inputHandler.isKeyDown(KEYCODES.space)) {
            GAME.reinit();
        }
    };

    //STEP 7: Construct the states, giving them their names and their two functions
    var menuState = new State("menu", menuInit, menuTick);
    var gameState = new State("game", gameInit, gameTick);
    var pauseState = new State("paused", pauseInit, pauseTick);
    var deadState = new State("dead", deadInit, deadTick);

    //STEP 8: add the states to the game itself
    game.addState(menuState);
    game.addState(gameState);
    game.addState(pauseState);
    game.addState(deadState);

    //STEP 9: start the game!
    game.start();
};