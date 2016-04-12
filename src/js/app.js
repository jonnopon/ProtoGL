var init = function() {
    //Construct the Abstract Game object, setting its width and height
    var game = new Game(800, 600);
    game.setBackgroundColor(new Vec3(0, 0, 0));

    //STEP 1: define game initial attributes in dictionary
    var gameData = {
        "lastGen": 0
    };

    //STEP 2: define which attributes should reinitialise on game reset
    var gameReinitData = {
        "lastGen": 0
    };

    //STEP 3: define game init function
    //this refers to game since this method will be injected
    var initFunc = function() {
        this.initManagers();
        this.displayStats = true;

        this.soundManager.addSound("point", "res/snd/collect.wav");
        this.soundManager.addSound("hit", "res/snd/hit.wav");
        this.switchToState("menu");
    };

    //STEP 4: define game reinit function
    //this refers to game since this method will be injected
    var reinitFunc = function () {
        this.initManagers();
        this.displayStats = true;

        this.soundManager.addSound("point", "res/snd/collect.wav");
        this.soundManager.addSound("hit", "res/snd/hit.wav");
        this.switchToState("game");
    };

    //STEP 6: attach init and reinit data to the Game object
    game.attach("initData", gameData);
    game.attach("reinitData", gameReinitData);

    //STEP 7: attach init func and reinit func to Game object
    game.attach("initFunc", initFunc);
    game.attach("reinitFunc", reinitFunc);

    //STEP 8: define global utility methods for Game
    //this refers to game since this method will be injected
    var genFood = function() {
        this.addEntity(Food(this));
    };
    var genEnemy = function(currentPoints) {
        if (currentPoints > this.lastGen) {
            this.addEntity(Enemy(this));
        }
        this.lastGen = currentPoints;
    };

    ///STEP 9: attach utility methods to Game object by name
    game.attach("genFood", genFood);
    game.attach("genEnemy", genEnemy);

    //STEP 10: define Game State function bodies describing the initialisation and the frame of each state
    //a state function takes the game object as its only parameter
    var menuInit = function(game) {
        //nothing to see here
    };
    var menuTick = function(game) {
        game.textManager.addString("ProtoGL Demo", "center", 45, new Vec2(game.width / 2, game.height - 100), new Vec3(50, 255, 255), degToRad(0));
        game.textManager.addString("Space to Start", "center", 45, new Vec2(game.width / 2, 100), new Vec3(255, 255, 255), degToRad(0));

        if (game.keyDown(KEYS.space)) {
            game.switchToState("game");
        }
    };

    var gameInit = function(game) {
        if (game.filterEntitiesByTag("player").length === 0) {
            game.addEntity(Player(game));
        }
        if (game.filterEntitiesByTag("food").length === 0) {
            game.genFood();
        }
        game.entityManager.loadEnts(); //just in case

        game.addSystem(PhysicsSystem2D);
        game.addSystem(AABBCollisionSystem);
    };
    var gameTick = function(game) {
        var player = game.filterEntitiesByTag("player")[0]; //we know there is only one player because we added it!
        var health = player.components.health.value;
        var points = player.components.points.value;

        var healthCol;
        switch (health) {
            case 1:
                healthCol = new Vec3(255, 0, 0);
                break;
            case 2:
                healthCol = new Vec3(255, 255, 0);
                break;
            case 3:
                healthCol = new Vec3(0, 255, 0);
                break;
            default:
                healthCol = new Vec3(0, 0, 0);
        }

        game.textManager.addString("health: " + health, "left", 25, new Vec2(10, game.height - 25), healthCol, 0);
        game.textManager.addString("Points: " + points, "left", 25, new Vec2(10, game.height - 60), new Vec3(255, 255, 255), 0);

        if (player.components.transform2D.velocity.x === 0 && player.components.transform2D.velocity.y === 0) {
            game.textManager.addString("W", "center", 25, new Vec2(game.width / 2 + 20, game.height / 2 + 60), new Vec3(255, 255, 255), 0);
            game.textManager.addString("A", "center", 25, new Vec2(game.width / 2 - 20, game.height / 2 + 20), new Vec3(255, 255, 255), 0);
            game.textManager.addString("D", "center", 25, new Vec2(game.width / 2 + 60, game.height / 2 + 20), new Vec3(255, 255, 255), 0);
            game.textManager.addString("S", "center", 25, new Vec2(game.width / 2 + 20, game.height / 2 - 20), new Vec3(255, 255, 255), 0);
        }

        if (points > 0 && points % 5 == 0) {
            game.genEnemy(points);
        }

        var maxVelX = player.components.transform2D.maxVelocity.x;
        var maxVelY = player.components.transform2D.maxVelocity.y;
        if (game.keyDown(KEYS.w)) {
            player.components.transform2D.velocity = new Vec2(0, maxVelY);
            player.components.transform2D.angle = degToRad(180);
        }
        else if (game.keyDown(KEYS.a)) {
            player.components.transform2D.velocity = new Vec2(-maxVelX, 0);
            player.components.transform2D.angle = degToRad(-90);
        }
        else if (game.keyDown(KEYS.s)) {
            player.components.transform2D.velocity = new Vec2(0, -maxVelY);
            player.components.transform2D.angle = 0;
        }
        else if (game.keyDown(KEYS.d)) {
            player.components.transform2D.velocity = new Vec2(maxVelX, 0);
            player.components.transform2D.angle = degToRad(90);
        }

        if (game.keyDown(KEYS.p)) {
            game.switchToState("paused");
        }

        if (player.components.health.value <= 0) {
            game.switchToState("dead");
        }

        game.entityManager.update();
        game.entityManager.render();
    };

    var pauseInit = function(game) {
        //we do this simply to save processing power in states that don't require these features
        game.removeSystem(PhysicsSystem2D);
        game.removeSystem(AABBCollisionSystem);
    };
    var pauseTick = function(game) {
        var player = game.filterEntitiesByTag("player")[0]; //we know there is only one player because we added it!
        var health = player.components.health.value;
        var points = player.components.points.value;

        var healthCol;
        switch (health) {
            case 1:
                healthCol = new Vec3(255, 0, 0);
                break;
            case 2:
                healthCol = new Vec3(255, 255, 0);
                break;
            case 3:
                healthCol = new Vec3(0, 255, 0);
                break;
            default:
                healthCol = new Vec3(0, 0, 0);
        }

        game.textManager.addString("health: " + health, "left", 25, new Vec2(10, game.height - 25), healthCol, 0);
        game.textManager.addString("Points: " + points, "left", 25, new Vec2(10, game.height - 60), new Vec3(255, 255, 255), 0);
        game.textManager.addString("Paused", "center", 45, new Vec2(game.width / 2, game.height - 150), new Vec3(50, 255, 255), degToRad(0));
        game.textManager.addString("Space to Resume", "center", 45, new Vec2(game.width / 2, 100), new Vec3(255, 255, 255), degToRad(0));

        if (game.keyDown(KEYS.space)) {
            game.switchToState("game");
        }

        game.entityManager.render();
    };

    var deadInit = function(game) {
        //we do this simply to save processing power in states that don't require these features
        game.removeSystem(PhysicsSystem2D);
        game.removeSystem(AABBCollisionSystem);
    };
    var deadTick = function(game) {
        var player = game.filterEntitiesByTag("player")[0]; //we know there is only one player because we added it!
        var points = player.components.points.value;

        game.textManager.addString("You died!", "center", 45, new Vec2(game.width / 2, game.height - 50), new Vec3(50, 255, 255), degToRad(0));
        game.textManager.addString("Points: " + points, "center", 55, new Vec2(game.width / 2, game.height / 2), new Vec3(255, 255, 255), 0);
        game.textManager.addString("Space to Restart", "center", 45, new Vec2(game.width / 2, 100), new Vec3(255, 255, 255), degToRad(0));

        if (game.keyDown(KEYS.space)) {
            game.reinit();
        }
    };

    //STEP 11: construct States with names
    var menuState = new State("menu", menuInit, menuTick, game);
    var gameState = new State("game", gameInit, gameTick, game);
    var pauseState = new State("paused", pauseInit, pauseTick, game);
    var deadState = new State("dead", deadInit, deadTick, game);

    //STEP 12: attach States to Game object
    game.addState(menuState);
    game.addState(gameState);
    game.addState(pauseState);
    game.addState(deadState);

    //STEP 14: start the game
    game.start();
};