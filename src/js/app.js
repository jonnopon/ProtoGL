var init = function() {
    //Construct the Abstract Game object, setting its width and height
    var game = new Game(800, 600);
    game.setBackgroundColor(new Vec3(0, 0, 1));

    //STEP 1: define game initial attributes in dictionary
    var gameData = {
        "points": 0,
        "lastGen": 0
    };

    //STEP 2: define which attributes should reinitialise on game reset
    var gameReinitData = {
        "points": 0,
        "lastGen": 0
    };

    //STEP 3: define game init function
    //this refers to game since this method will be injected
    var initFunc = function() {
        this.initManagers();
        this.displayStats = true;
        
        this.addSystem("2DMovement", MovementSystem2D);
        var e = new EntityNew();
        e.addComponent(new Position2D(this.width / 2, this.height / 2));
        e.addComponent(new Velocity2D(5, 5, 75, 75));
        this.addEntity(e);
    };

    //STEP 4: define game reinit function
    //this refers to game since this method will be injected
    var reinitFunc = function () {
        this.initManagers();
        this.displayStats = true;

        this.activeState("onlyState");
    };

    //STEP 6: attach init and reinit data to the Game object
    game.attach("initData", gameData);
    game.attach("reinitData", gameReinitData);

    //STEP 7: attach init func and reinit func to Game object
    game.attach("initFunc", initFunc);
    game.attach("reinitFunc", reinitFunc);

    //STEP 8: define global utility methods for Game
    //this refers to game since this method will be injected

    ///STEP 9: attach utility methods to Game object by name

    //STEP 10: define Game State function bodies describing the frame of each state
    //a state function can take any number of params as long as denoted in assignment to Game
    ///for this simple game, just passing the Game object
    var onlyStateFunc = function(args) {
        var game = args[0];

        game.textManager.addString("ProtoGL Demo", "center", 45, new Vec2(game.width / 2, game.height - 100), new Vec3(50, 255, 255), degToRad(0));
        game.textManager.addString("Space to Start", "center", 45, new Vec2(game.width / 2, 100), new Vec3(255, 255, 255), degToRad(0));

        game.textManager.render();

        game.systems['2DMovement'](game.delta, game.filterEntitiesByComponentList([Position2D, Velocity2D]));

        var allEnts = game.getAllEntities();
        for (var i = 0; i < allEnts.length; i++) {
            allEnts[i].print();
        }
    };

    //STEP 11: construct States with names
    var onlyState = new State("onlyState");

    //STEP 12: add functional bodies to the states, along with a list of arguments to send to their 'tick' functions
    onlyState.setFunc(onlyStateFunc, [game]);

    //STEP 13: attach States to Game object
    game.addState(onlyState);

    //STEP 14: choose an initially active state
    game.activeState("onlyState");

    //STEP 15: start the game
    game.start();
};