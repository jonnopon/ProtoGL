var init = function() {
    var game = new Game(1024, 768);
    game.setBackgroundColor(new Vec4(0, 0, 0, 1));
    // game.displayStats  = true;

    //STEP 1: attach init data to the game object (loaded upon game initialisation)
    game.initData = {

    };
    //STEP 2: attach initialisation function to the game (called during game.start())
    game.initFunc = function() {
        this.initManagers(); //TODO: this shouldn't really be here - switch to a more "addRenderer, addEntityManager" approach

        var vert3D = VERTSHADERS3D["new-transform-colored"]();
        var vert2D = VERTSHADERS2D["new-transform-colored"]();
        var frag = FRAGSHADERS["colored"];

        var shader3D = {
            name: "3DShader",
            vertSrc: vert3D.src,
            fragSrc: frag,
            attributes: vert3D.attributes,
            dataPerVert: vert3D.dataPerVert,
            globalUniforms: vert3D.globalUniforms,
            instanceUniforms: vert3D.instanceUniforms
        };
        this.addShader(shader3D);

        var shader2D = {
            name: "2DShader",
            vertSrc: vert2D.src,
            fragSrc: frag,
            attributes: vert2D.attributes,
            dataPerVert: vert2D.dataPerVert,
            globalUniforms: vert2D.globalUniforms,
            instanceUniforms: vert2D.instanceUniforms
        };
        this.addShader(shader2D);

        this.switchToState("default");
    };

    //STEP 3: attach reinit data to the game object (loaded upon game re-initialisation)
    game.reinitData = game.initData;

    //STEP 4: attach re-initialisation function to the game (called during game.reinit())
    game.reinitFunc = function() {
        this.initManagers(); //TODO: this shouldn't really be here - switch to a more "addRenderer, addEntityManager" approach
        // this.displayStats = true;

        this.switchToState("default");
    };

    //STEP 5: attach utility functions to game - global game behaviors accessible anywhere

    //STEP 6: add the states to the game
    // game.addState(MenuState());
    // game.addState(GameState());
    // game.addState(PausedState());
    // game.addState(DeadState());
    game.addState(DefaultState());

    //STEP 7: start the game!
    game.start();
};