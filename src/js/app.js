var init = function() {
    //Construct the Abstract Game object, setting its width and height
    var game = new Game(800, 600);

    //STEP 1: define game initial attributes in dictionary
    var gameData = {
        "ents": [],
        "points": 0
    };

    //STEP 2: define which attributes should reinitialise on game reset
    var gameReinitData = {
        "ents": [],
        "points": 0
    };

    //STEP 3: define game init function
    //this refers to game since this method will be injected
    var initFunc = function() {
        this.loadAttributes(this.initData);
        this.initManagers();

        this.eman.addPlayer(new Player(new Vec2(-0.8, -0.25), this));
    };

    //STEP 4: define game reinit function
    //this refers to game since this method will be injected
    var reinitFunc = function () {
        this.loadAttributes(this.reinitData);
        this.initManagers();

        this.eman.addPlayer(new Player(new Vec2(-0.5, 0.5), this));

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
    //example:
    // var addPoints = function(p) {
    //     this.points += p;
    // };

    ///STEP 9: attach utility methods to Game object by name
    //example:
    // game.attach("addPoints", addPoints);

    //STEP 10: define Game State function bodies describing the frame of each state
    //a state function can take any number of params as long as denoted in assignment to Game
    ///for this simple game, just passing the Game object
    var menuFunc = function(args) {
        var game = args[0];
        game.renderer.clearScreen(new Vec3(0, 0, 0), false);

        game.textManager.addString('ProtoGL Demo!', 'center', 0.15, new Vec2(0, 0.9), new Vec3(1, 1, 0), degToRad(0));
        game.textManager.addString('Default Font:', 'left', 0.1, new Vec2(-1, 0.5), new Vec3(0, 1, 1), degToRad(0));

        game.textManager.addString('abcdefghijklm', 'center', 0.15, new Vec2(0, 0.2), new Vec3(1, 0, 0), degToRad(0));
        game.textManager.addString('nopqrstuvwxyz', 'center', 0.15, new Vec2(0, 0), new Vec3(0, 1, 0), degToRad(0));

        game.textManager.addString('()[]+-*/!?\'"#', 'center', 0.15, new Vec2(0, -0.2), new Vec3(0, 0, 1), degToRad(0));
        game.textManager.addString('£$&%^,.:;<>_', 'center', 0.15, new Vec2(0, -0.4), new Vec3(1, 1, 1), degToRad(0));

        game.textManager.render();

        // if (game.keyDown(game.keyCodes.space)) {
        //     game.activeState("game");
        // }

        // game.eman.render();
        // game.eman.update(game.delta);
    };

    var gameFunc = function(args) {
        var game = args[0];
        var player = game.eman.player;

        game.renderer.clearScreen(new Vec3(0, 0, 0), false);
        game.textManager.addString("Points " + game.points, 0.075, new Vec2(-0.98, 0.9), new Vec3(1, 1, 1));
        game.textManager.addString("Health " + game.eman.player.health, 0.075, new Vec2(-0.98, 0.775), new Vec3(1, 1, 1));
        
        
        if (game.keyDown(game.keyCodes.w)) {
            game.eman.player.turn(0);
        }
        else if (game.keyDown(game.keyCodes.d)) {
            game.eman.player.turn(1);
        }
        else if (game.keyDown(game.keyCodes.s)) {
            game.eman.player.turn(2);
        }
        else if (game.keyDown(game.keyCodes.a)) {
            game.eman.player.turn(3)
        }

        if (game.eman.player.dead) {
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
        var game = args[0];
        game.renderer.clearScreen(new Vec3(0, 0, 0), false);

        game.textManager.addString("Points " + game.points, 0.075, new Vec2(-0.98, 0.9), new Vec3(1, 1, 1));
        game.textManager.addString("Health " + game.eman.player.health, 0.075, new Vec2(-0.98, 0.775), new Vec3(1, 1, 1));
        game.textManager.addString("Paused", 0.2, new Vec2(-0.55, 0), new Vec3(1, 1, 1));
        game.textManager.addString("Space to resume", 0.12, new Vec2(-0.9, -0.2), new Vec3(1, 1, 1));

        if (game.keyDown(game.keyCodes.space)) {
            game.activeState("game");
        }

        game.eman.render();
        game.textManager.render();
    };

    var deadFunc = function(args) {
        var game = args[0];
        game.renderer.clearScreen(new Vec3(0, 0, 0), false);

        game.textManager.addString("Points " + game.points, 0.075, new Vec2(-0.98, 0.9), new Vec3(1, 1, 1));
        game.textManager.addString("Health " + game.eman.player.health, 0.075, new Vec2(-0.98, 0.775), new Vec3(1, 1, 1));
        game.textManager.addString("DEAD", 0.35, new Vec2(-0.65, 0), new Vec3(1, 1, 1));
        game.textManager.addString("Space to restart", 0.12, new Vec2(-0.96, -0.2), new Vec3(1, 1, 1));

        game.eman.render();
        game.textManager.render();

        if (game.keyDown(game.keyCodes.space)) {
            game.reinit();
        }
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