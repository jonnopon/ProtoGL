var init = function() {
    //Construct the Abstract Game object, setting its width and height
    var game = new Game(800, 600);

    //STEP 1: define game initial attributes in dictionary
    var gameData = {
        "ents": [],
        "points": 0,
        "lastGen": 0
    };

    //STEP 2: define which attributes should reinitialise on game reset
    var gameReinitData = {
        "ents": [],
        "points": 0,
        "lastGen": 0
    };

    //STEP 3: define game init function
    //this refers to game since this method will be injected
    var initFunc = function() {
        this.loadAttributes(this.initData);
        this.initManagers();

        this.eman.addPlayer(new Player(new Vec2(this.width / 2 - 20, this.height / 2), this));
        this.genFood();

        this.displayStats = true;

        this.sman.addSound("point", "res/snd/collect.wav");
        this.sman.addSound("hit", "res/snd/hit.wav");
    };

    //STEP 4: define game reinit function
    //this refers to game since this method will be injected
    var reinitFunc = function () {
        this.loadAttributes(this.reinitData);
        this.initManagers();

        this.eman.addPlayer(new Player(new Vec2(this.width / 2 - 20, this.height / 2), this));
        this.genFood();

        this.displayStats = true;

        this.sman.addSound("point", "res/snd/collect.wav");
        this.sman.addSound("hit", "res/snd/hit.wav");

        this.activeState("game");
    };

    //STEP 6: attach init and reinit data to the Game object
    game.attach("initData", gameData);
    game.attach("reinitData", gameReinitData);

    //STEP 7: attach init func and reinit func to Game object
    game.attach("initFunc", initFunc);
    game.attach("reinitFunc", reinitFunc);

    //STEP 8: define global utility methods for Game
    //this refers to game since this method will be injected
    var addPoints = function(p) {
        this.points += p;
    };

    var genEnemy = function() {
        if (this.points !== this.lastGen) {
            var x = randomBetween(50, this.width - 50);
            var y = randomBetween(50, this.height - 50);
            this.addEnt(new Enemy(new Vec2(x, y), this));
            this.lastGen = this.points;
        }
    };

    var genFood = function() {
        var x = randomBetween(50, this.width - 50);
        var y = randomBetween(50, this.height - 50);
        this.addEnt(new Food(new Vec2(x, y), this));
    };

    ///STEP 9: attach utility methods to Game object by name
    game.attach("addPoints", addPoints);
    game.attach("genEnemy", genEnemy);
    game.attach("genFood", genFood);

    //STEP 10: define Game State function bodies describing the frame of each state
    //a state function can take any number of params as long as denoted in assignment to Game
    ///for this simple game, just passing the Game object
    var menuFunc = function(args) {
        var game = args[0];

        game.textManager.addString("ProtoGL Demo", "center", 45, new Vec2(game.width / 2, game.height - 100), new Vec3(50, 255, 255), degToRad(0));
        game.textManager.addString("Space to Start", "center", 45, new Vec2(game.width / 2, 100), new Vec3(255, 255, 255), degToRad(0));

        if (game.keyDown(game.keyCodes.space)) {
            game.activeState("game");
        }

        game.eman.render();
        game.eman.update(game.delta);
        game.textManager.render();
    };

    var gameFunc = function(args) {
        var game = args[0],
            player = game.eman.player;

        var healthCol;
        switch (player.health) {
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

        game.textManager.addString("health: " + player.health, "left", 25, new Vec2(10, game.height - 25), healthCol, 0);
        game.textManager.addString("Points: " + game.points, "left", 25, new Vec2(10, game.height - 60), new Vec3(255, 255, 255), 0);

        if (player.vel.x === 0 && player.vel.y === 0) {
            game.textManager.addString("W", "center", 25, new Vec2(game.width / 2, game.height / 2 + 60), new Vec3(255, 255, 255), 0);
            game.textManager.addString("A", "center", 25, new Vec2(game.width / 2 - 40, game.height / 2 + 20), new Vec3(255, 255, 255), 0);
            game.textManager.addString("D", "center", 25, new Vec2(game.width / 2 + 40, game.height / 2 + 20), new Vec3(255, 255, 255), 0);
            game.textManager.addString("S", "center", 25, new Vec2(game.width / 2, game.height / 2 - 20), new Vec3(255, 255, 255), 0);
        }

        if (game.points > 0 && game.points % 5 == 0) {
            game.genEnemy();
        }

        if (game.keyDown(game.keyCodes.w)) {
            player.turn(0);
            player.setRotation(degToRad(0));
        }
        else if (game.keyDown(game.keyCodes.d)) {
            player.turn(1);
            player.setRotation(degToRad(-90));
        }
        else if (game.keyDown(game.keyCodes.s)) {
            player.turn(2);
            player.setRotation(degToRad(180));
        }
        else if (game.keyDown(game.keyCodes.a)) {
            player.turn(3)
            player.setRotation(degToRad(90));
        }

        if (player.dead) {
            game.activeState("dead");
        }
        if (game.keyDown(game.keyCodes.p)) {
            game.activeState("pause");
        }
        if (game.keyDown(game.keyCodes.esc)) {
            game.activeState("menu");
        }

        game.eman.render();
        game.eman.update(game.delta);
        game.textManager.render();
    };

    var pauseFunc = function(args) {
        var game = args[0],
            player = game.eman.player;

        var healthCol = new Vec3(0, 255, 0);
        game.textManager.addString("health: " + player.health, "left", 30, new Vec2(10, game.height - 25), healthCol, 0);
        game.textManager.addString("Points: " + game.points, "left", 30, new Vec2(10, game.height - 70), new Vec3(255, 255, 255), 0);
        game.textManager.addString("Paused", "center", 45, new Vec2(game.width / 2, game.height - 150), new Vec3(50, 255, 255), degToRad(0));
        game.textManager.addString("Space to Resume", "center", 45, new Vec2(game.width / 2, 100), new Vec3(255, 255, 255), degToRad(0));

        if (game.keyDown(game.keyCodes.space)) {
            game.activeState("game");
        }

        game.eman.render();
        game.textManager.render();
    };

    var deadFunc = function(args) {
        var game = args[0];

        game.textManager.addString("You died!", "center", 45, new Vec2(game.width / 2, game.height - 50), new Vec3(50, 255, 255), degToRad(0));
        game.textManager.addString("Points: " + game.points, "center", 55, new Vec2(game.width / 2, game.height / 2), new Vec3(255, 255, 255), 0);
        game.textManager.addString("Space to Restart", "center", 45, new Vec2(game.width / 2, 100), new Vec3(255, 255, 255), degToRad(0));

        if (game.keyDown(game.keyCodes.space)) {
            game.reinit();
        }

        game.textManager.render();
    };

    //STEP 11: construct States with names
    var menuState = new State("menu");
    var gameState = new State("game");
    var pauseState = new State("pause");
    var deadState = new State("dead");

    //STEP 12: add functional bodies to the states, along with a list of arguments to send to their 'tick' functions
    menuState.setFunc(menuFunc, [game]);
    gameState.setFunc(gameFunc, [game]);
    pauseState.setFunc(pauseFunc, [game]);
    deadState.setFunc(deadFunc, [game]);

    //STEP 13: attach States to Game object
    game.addState(menuState);
    game.addState(gameState);
    game.addState(deadState);
    game.addState(pauseState);

    //STEP 14: choose an initially active state
    game.activeState("menu");

    //STEP 15: start the game
    game.start();
};