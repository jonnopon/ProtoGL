var Game = function(width, height) {
    this.width = width;
    this.height = height;
    this.resolution = new Vec2(width, height);

    this.eman = null;
    this.sman = null;
    this.renderer = null;
    this.textManager = null;

    this.states = {};

    this.currentState = null;
    this.keys = [];
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
        //TODO allow for queueing similar keys? Debouncing presses rather than just ignoring same-key presses?
        if (event.which !== window.game.keyCodes.f5 && event.which !== window.game.keyCodes.f12) {
            event.preventDefault();
            if (window.game.keys.indexOf(event.which) === -1) {
                window.game.keys.push(event.which);
            }
        }
    };

    window.onkeyup = function(event) {
        if (event.which !== window.game.keyCodes.f5 && event.which !== window.game.keyCodes.f12) {
            event.preventDefault();
            window.game.keys.splice(window.game.keys.indexOf(event.which), 1);
        }
    };

    this.run = function(t) {
        var game = window.game;
        game.delta = Date.now() - game.lastLoopTime;
        game.lastLoopTime = Date.now();

        game.resizeCanvas();

        if (game.clearScreen) {
            game.renderer.clearScreen(new Vec3(0, 0, 0), false);
        }
        else {
            game.clearScreen = true;
        }

        game.currentState.tick();

        requestAnimationFrame(game.run);
    };

    this.resizeCanvas = function() {
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        if (this.canvas.width != this.width || this.canvas.height != this.height) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }

        this.renderer.resize(this.canvas.width, this.canvas.height);
    };

    this.initManagers = function() {
        this.renderer = new Renderer(this.canvas);
        this.textManager = new TextManager(this);

        //TODO can probably just put the bodies of these functions into the constructor since I'm implicitly saying here that they're part of the textUtils' setup process

        this.sman = new SoundManager();
        this.eman = new EntityManager(this);
    }

    this.addState = function(state) {
        this.states[state.getName()] = state;
    };

    this.activeState = function(name) {
        this.currentState = this.states[name];
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

    this.attach = function(name, value) {
        this[name] = value;
    };

    this.init = function() {
        this.initFunc();
    };

    this.reinit = function() {
        this.reinitFunc();
    };

    this.start = function() {
        this.init();
        this.run();
    };

    this.keyDown = function(keyCode) {
        return this.keys.indexOf(keyCode) > -1;
    };

    window.game = this;
};