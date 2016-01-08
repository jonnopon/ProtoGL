var Game = function(width, height) {
    this.width = width;
    this.height = height;
    this.renderer = new Renderer();
    this.textUtils = new TextUtils(this.renderer);
    this.textUtils.setUpFont();

    this.sman = null;
    this.eman = null;
    this.lman = null;

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
};

Game.prototype.initManagers = function() {
    this.renderer = new Renderer();
    this.sman = new SoundManager();
    this.lman = new LevelManager(this);
    this.eman = new EntityManager(this);
}

Game.prototype.addState = function(state) {
    this.states[state.getName()] = state;
};

Game.prototype.activeState = function(name) {
    this.currentState = this.states[name];
};

Game.setSoundManager = function(sman) {
    this.sman = sman;
};

Game.setEntityManager = function(eman) {
    this.eman = eman;
};

Game.prototype.addEnt = function(e) {
    this.eman.addEnt(e);
}

Game.prototype.removeEnt = function(e) {
    this.eman.removeEnt(e);
};

Game.prototype.loadAttributes = function(data) {
    for (key in data) {
        this[key] = data[key];
    }
};

Game.prototype.addAttr = function(name, value) {
    this[name] = value;
};

Game.prototype.addMethod = function(name, body) {
    this[name] = body;
};

Game.prototype.init = function() {
    this.initFunc();
};

Game.prototype.reinit = function() {
    this.reinitFunc();
};

Game.prototype.start = function() {
    this.init();
    window.game = this;
    window.requestAnimationFrame(this.run);
};