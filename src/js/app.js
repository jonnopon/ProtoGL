var init = function() {
    var game = new Game(1024, 768);
    game.setBackgroundColor(new Vec4(0, 0, 0, 1));

    //STEP 1: attach init data to the game object (loaded upon game initialisation)
    game.initData = {
    };
    //STEP 2: attach initialisation function to the game (called during game.start())
    game.initFunc = function() {
        this.initManagers();
        this.displayStats = true;

        this.switchToState("menu");
    };

    //STEP 3: attach reinit data to the game object (loaded upon game re-initialisation)
    game.reinitData = game.initData;

    //STEP 4: attach re-initialisation function to the game (called during game.reinit())
    game.reinitFunc = function() {
        this.initManagers();
        this.displayStats = true;

        this.switchToState("menu");
    };

    //STEP 5: attach utility functions to game - global game behaviors accessible anywhere
    game.entityShoot = function(e, gun) {
        var g = gun || e.components.gun;
        if (Date.now() - g.lastFire > g.fireRate) {
            game.addEntity(Bullet(e));
            g.lastFire = Date.now();
        }
    };
    game.addPoints = function(p) {
        var player = GAME.filterEntitiesByTag("player")[0];
        player.components.points.value += p * player.components.multiplier.value;
    };
    game.addMultiplier = function(m) {
        var player = GAME.filterEntitiesByTag("player")[0];
        player.components.multiplier.value += m;

        //shape transformations
    };
    game.advanceRound = function(roundNum) {
        //maybe belongs in LevelSystem
    }

    //STEP 6: add the states to the game
    game.addState(MenuState());
    game.addState(GameState());
    game.addState(PausedState());
    game.addState(DeadState());

    //STEP 7: start the game!
    game.start();
};