var Game = function(width, height) {
    this.width = width;
    this.height = height;
    this.resolution = new Vec2(width, height);
    this.backgroundColor = new Vec3(0, 0, 0);

    this.entityManager = null;
    this.soundManager = null;
    this.textManager = null;
    this.renderer = null;

    this.states = {};
    this.currentState = null;
    this.systems = {};

    this.displayStats = false;
    this.keys = [];
    this.delta = 0;

    this.lastLoopTime = 0;
    this.initData = {};
    this.reinitData = {};
    this.initFunc = null;
    this.reinitFunc = null;

    this.canvas = document.getElementById("gameCanvas");
    this.canvas.width = width;
    this.canvas.height = height;
    
    //TODO: temporary
    this.ents = [];

    window.onkeydown = function(event) {
        //TODO allow for queueing similar keys? Debouncing presses rather than just ignoring same-key presses?
        if (event.which !== KEYS.f5 && event.which !== KEYS.f12) {
            event.preventDefault();
            if (window.game.keys.indexOf(event.which) === -1) {
                window.game.keys.push(event.which);
            }
        }
    };

    window.onkeyup = function(event) {
        if (event.which !== KEYS.f5 && event.which !== KEYS.f12) {
            event.preventDefault();
            window.game.keys.splice(window.game.keys.indexOf(event.which), 1);
        }
    };

    this.run = function(t) {
        var game = window.game;
        game.delta = Date.now() - game.lastLoopTime;
        game.lastLoopTime = Date.now();

        if (game.displayStats) {
            game.textManager.addString("FPS: " + Math.round((1000 / game.delta) * 10) / 10, "right", 25, new Vec2(game.width - 10, game.height - 25), new Vec3(255, 255, 255), 0);
        }

        game.resizeCanvas();

        game.renderer.clearScreen(game.backgroundColor, false);

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
        this.renderer = new Renderer(this.canvas); //TODO: might change
        this.textManager = new TextManager(this);
        this.soundManager = new SoundManager();
        this.entityManager = new EntityManagerNew(this);
    };

    this.addState = function(state) {
        this.states[state.getName()] = state;
    };

    this.activeState = function(name) {
        //TODO: might change (state switching might become a little more involved/encapsulated in the state itself)
        //think "switch to state" instead of just "set new state"
        this.currentState = this.states[name];
    };

    this.addSystem = function(name, system) {
        this.systems[name] = system;
    };

    this.addEntity = function(e) {
        // this.eman.addEnt(e);

        //TODO: temporary
        this.ents.push(e);
    };

    this.removeEntity = function(e) {
        // this.eman.removeEnt(e);

        //TODO: temporary
        this.ents.splice(this.ents.indexOf(e), 1);
    };

    this.attach = function(name, value) {
        this[name] = value;
    };

    this.loadAttributes = function(data) {
        for (key in data) {
            this[key] = data[key];
        }
    };

    this.init = function() {
        this.loadAttributes(this.initData);
        this.initFunc();
    };

    this.reinit = function() {
        this.loadAttributes(this.reinitData);
        this.reinitFunc();
    };

    this.start = function() {
        this.init();
        this.run();
    };

    this.keyDown = function(keyCode) {
        return this.keys.indexOf(keyCode) > -1;
    };

    this.setBackgroundColor = function(colorVector) {
        this.backgroundColor = colorVector;
    };

    window.game = this;
};