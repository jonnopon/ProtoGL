##App.js (root of game)
- Location: src/
- Function: manage the application

----

##Structure
- entire script wrapped in an init() function with **no** parameters
    -- This is the function called on page init, and it should go on to define and configure the Game object and its properties.

####Step 1 - define game object

####Step 2 - define initial game attributes and their values in an object

####Step 3 - define which attributes should be reinitialised (and their reinit values) when the game restarts

####Step 4 - Define the game's init() function

####Step 5 - Define the game's reinit() function

####Step 6 - Attatch the initData and reinitData to the Game object

####Step 7 - Attatch the init() and reinit() functions to the Game object

####Step 8 - Define global utility methods for Game

####Step 9 - Attatch the global utility methods to the Game object

####Step 10 - Define Game state function bodies describing the frame of each state. A state function can take any number of parameters as long as these are defined when attatching them to Game in step 11. Parameters are accessible through the args[] array.

####Step 11 - Construct the Game's States and asssign their function bodies

####Step 12 - Attach the states to the Game object

####Step 13 - choose an initially active state

####Step 14 - start() the game



----
----

##Template

```javascript
var init = function() {
    //STEP 1
    var game = new Game(640, 480);

    //STEP 2:
    var gameData = {
        "someData": 1,
        "someOtherData": 2
    };

    //STEP 3:
    var gameReinitData = {
        "someData": 1
    };

    //STEP 4:
    var initFunc = function() {
        //initialise the game with initData and setup the basics
        this.loadAttributes(this.initData);
        this.initManagers();
        this.textUtils.init();
        this.textUtils.setUpFont();
    };

    //STEP 5:
    var reinitFunc = function() {
        //initialise the game with reinitData and setup the basics
        this.loadAttributes(this.reinitData);
        this.initManagers();
        this.textUtils.init();
        this.textUtils.setUpFont();
        
        //Override the default active state to alter the game loop
        this.activeState("game");
    }

    //STEP 6:
    game.addAttr("initData", gameData);
    game.addAttr("reinitData", gameReinitData);

    //STEP 7:
    game.addMethod("initFunc", initFunc);
    game.addMethod("reinitFunc", reinitFunc);

    //STEP 8:
    var doSomething = function() {
        alert("hello");
    };

    ///STEP 9:
    game.addMethod("doSomething", doSomething);

    //STEP 10:
    var menuFunc = function(args) {
        //game passed to these states as an example
        var game = args[0];

        game.renderer.clearScreen(new Vec3(0, 0, 0), false);

        game.textUtils.addString("ProtoGL Demo", 0.15, new Vec2(-0.9, 0.75), false);
        
        //poll some input and advance the game loop by selecting a new state
        if (window.keys.indexOf(game.keyCodes.space) > -1) {
            game.activeState("game");
        }
        
        //Always leave rendering and updating to last
        game.eman.render();
        game.eman.update(game.delta);
        game.textUtils.render();
    };

    var gameFunc = function(args) {
        //game passed to these states as an example
        var game = args[0];

        game.renderer.clearScreen(new Vec3(0, 0, 0), false);
        game.textUtils.addString("ProtoGL Demo", 0.15, new Vec2(-0.9, 0.75), false);

        /*
        *
        * HERE IS THE MAIN GAME ITSELF; poll input, update stuff, etc
        *
        */

        game.eman.render();
        game.eman.update(game.delta);
        game.textUtils.render();
    };

    var pauseFunc = function(args) {
        //game passed to these states as an example
        var game = args[0];
        game.renderer.clearScreen(new Vec3(0, 0, 0), false);

        game.textUtils.addString("ProtoGL Demo", 0.15, new Vec2(-0.9, 0.75), false);

        if (window.keys.indexOf(game.keyCodes.space) > -1) {
            game.activeState("game");
        }

        game.eman.render();
        game.lman.render();
        game.textUtils.render();
    };

    var deadFunc = function(args) {
        var game = args[0];
        game.renderer.clearScreen(new Vec3(0, 0, 0), false);

        game.textUtils.addString("ProtoGL Demo", 0.15, new Vec2(-0.9, 0.75), false);

        game.eman.render();
        game.textUtils.render();

        if (window.keys.indexOf(game.keyCodes.enter) > -1) {
            game.reinit();
        }
    };

    //STEP 11
    var menuState = new State("menu");
    var gameState = new State("game");
    var pauseState = new State("pause");
    var deadState = new State("dead");
    //SEE: the second parameter is a list of args to send this state's function when it is executed. It's simple enough to make a State aware of the Game object itself
    menuState.setFunc(menuFunc, [game]);
    gameState.setFunc(gameFunc, [game]);
    pauseState.setFunc(pauseFunc, [game]);
    deadState.setFunc(deadFunc, [game]);

    //STEP 12
    game.addState(menuState);
    game.addState(gameState);
    game.addState(deadState);
    game.addState(pauseState);

    //STEP 13
    game.activeState("menu");

    //STEP 14
    game.start();
};
```