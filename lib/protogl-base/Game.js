var Game = function(width, height) {
    this.width = width;
    this.height = height;

    this.eman = null;
    this.lman = null;
    this.sman = null;
    this.renderer = null;
    this.textUtils = null;

    this.states = {};

    this.currentState = null;
    window.keys = [];
    this.keyCodes = new KeyCodes();
    this.delta = 0;

    this.lastLoopTime = 0;
    this.initData = {};

    this.reinitData = {};
    this.initFunc = null;
    this.reinitFunc = null;

    this.canvas = document.getElementById("gameCanvas");
    this.canvas.width = width;
    this.canvas.height = height;

    window.onkeydown = function(event) {
        if (event.which !== game.keyCodes.f5 && event.which !== game.keyCodes.f12) {
            event.preventDefault();
            if (this.keys.indexOf(event.which) === -1) {
                this.keys.push(event.which);
            }
        }
    };

    window.onkeyup = function(event) {
        if (event.which !== game.keyCodes.f5 && event.which !== game.keyCodes.f12) {
            event.preventDefault();
            this.keys.splice(this.keys.indexOf(event.which), 1);
        }
    };

    this["run"] = function(t) {
        var game = window.game;
        game.delta = Date.now() - game.lastLoopTime;
        game.lastLoopTime = Date.now();

        if (game.clearScreen) {
            game.renderer.clearScreen(new Vec3(0, 0, 0), false);
        }
        else {
            game.clearScreen = true;
        }

        game.currentState.tick();
    };

    window.game = this;

    this.initManagers = function() {
        this.renderer = new Renderer(this.canvas);
        this.textUtils = new TextUtils(this);

        //TODO can probably just put the bodies of these functions into the constructor since I'm implicitly saying here that they're part of the textUtils' setup process
        this.textUtils.init();
        this.textUtils.setUpFont();

        this.sman = new SoundManager();
        this.lman = new LevelManager(this);
        this.eman = new EntityManager(this);
    }

    this.addState = function(state) {
        this.states[state.getName()] = state;
    };

    this.activeState = function(name) {
        this.currentState = this.states[name];
    };

    Game.setSoundManager = function(sman) {
        this.sman = sman;
    };

    Game.setEntityManager = function(eman) {
        this.eman = eman;
    };

    this.addEnt = function(e) {
        this.eman.addEnt(e);
    }

    this.removeEnt = function(e) {
        this.eman.removeEnt(e);
    };

    this.loadAttributes = function(data) {
        for (key in data) {
            this[key] = data[key];
        }
    };

    this.addAttr = function(name, value) {
        this[name] = value;
    };

    this.addMethod = function(name, body) {
        this[name] = body;
    };

    this.init = function() {
        this.initFunc();
    };

    this.reinit = function() {
        this.reinitFunc();
    };

    this.start = function() {
        this.init();
        window.game = this;
        window.requestAnimationFrame(this.run);
    };
};