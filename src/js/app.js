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
        this.switchToState("onlyState");
    };

    //STEP 4: define game reinit function
    //this refers to game since this method will be injected
    var reinitFunc = function () {
        this.initManagers();
        this.displayStats = true;

        this.switchToState("onlyState");
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

    //STEP 10: define Game State function bodies describing the initialisation and the frame of each state
    //a state function takes the game object as its only parameter
    var onlyStateInit = function(game) {
        game.addSystem(PhysicsSystem2D);

        var e = new EntityNew();
        e.addComponent(new Sprite(0, 0, 0.25, 1))
        e.addComponent(new Transform2D(new Vec2(game.width / 2, game.height / 2), new Vec2(40, 40), new Vec2(0, 0)));
        game.addEntity(e);

        e = new EntityNew();
        e.addComponent(new Sprite(0.25, 0, 0.5, 1));
        e.addComponent(new Transform2D(new Vec2(100, game.height / 2), new Vec2(30, 30), new Vec2(0, 0)));
        game.addEntity(e);
    };
    var onlyStateFunc = function(game) {
        game.textManager.addString("ProtoGL Demo", "center", 45, new Vec2(game.width / 2, game.height - 100), new Vec3(50, 255, 255), degToRad(0));
        game.textManager.addString("Space to Start", "center", 45, new Vec2(game.width / 2, 100), new Vec3(255, 255, 255), degToRad(0));

        game.systems['physics2D'](game.delta, game.filterEntitiesByComponent(Transform2D));

        if (game.entityManager.ents[0]) {
            //TODO really shouldn't need to do this check
            game.entityManager.ents[0].components.transform2D.angle += degToRad(1);

            game.entityManager.ents[1].components.transform2D.angle -= degToRad(0.5);
        }



        var allEnts = game.getAllEntities();

        for (var i = 0; i < allEnts.length; i++) {
            allEnts[i].print();
        }

        game.entityManager.render();

        game.textManager.render();
    };

    //STEP 11: construct States with names
    var onlyState = new State("onlyState", onlyStateInit, onlyStateFunc, game);

    //STEP 12: attach States to Game object
    game.addState(onlyState);

    //STEP 14: start the game
    game.start();
};