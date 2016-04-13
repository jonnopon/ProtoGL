var Game = function(width, height) {
    this.width = width;
    this.height = height;
    this.resolution = new Vec2(width, height);
    this.backgroundColor = new Vec3(0, 0, 0);

    //TODO basic abstractions for all user-facing manager functions
    this.entityManager = null;
    this.soundManager = null;
    this.textManager = null;
    this.userInterfaceManager = null;
    this.renderer = null;

    this.states = {};
    this.currentState = null;
    this.systems = [];

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

    window.game = this;
};

Game.prototype.run = function(t) {
    var game = window.game;
    game.delta = Date.now() - game.lastLoopTime;
    game.lastLoopTime = Date.now();
    game.renderer.clearScreen(game.backgroundColor, false);
    game.resizeCanvas();

    if (game.displayStats) {
        game.textManager.addString("FPS: " + Math.round((1000 / game.delta) * 10) / 10, "right", 25, new Vec2(game.width - 10, game.height - 25), new Vec3(255, 255, 255), 0);
    }
    game.currentState.tick();

    for (var i = 0; i < game.systems.length; i++) {
        game.systems[i](game);
    }

    game.textManager.render();

    requestAnimationFrame(game.run);
};
Game.prototype.resizeCanvas = function() {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;

    if (this.canvas.width != this.width || this.canvas.height != this.height) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    this.renderer.resize(this.canvas.width, this.canvas.height);
};
Game.prototype.initManagers = function() {
    this.renderer = new Renderer(this.canvas); //TODO: might change
    this.textManager = new TextManager(this);
    this.soundManager = new SoundManager();
    this.entityManager = new EntityManager(this);
};
Game.prototype.addState = function(state) {
    this.states[state.getName()] = state;
};
Game.prototype.switchToState = function(name) {
    this.currentState = this.states[name];
    this.currentState.init();
};
Game.prototype.addSystem = function(system) {
    this.systems.push(system);
};
Game.prototype.removeSystem = function(system) {
    this.systems.splice(this.systems.indexOf(system, 1));
};
Game.prototype.addEntity = function(e) {
    this.entityManager.addEntity(e);
};
Game.prototype.removeEntity = function(e) {
    this.entityManager.removeEntity(e);
};
Game.prototype.attach = function(name, value) {
    this[name] = value;
};
Game.prototype.loadAttributes = function(data) {
    for (key in data) {
        this[key] = data[key];
    }
};
Game.prototype.init = function() {
    this.loadAttributes(this.initData);
    this.initFunc();
};
Game.prototype.reinit = function() {
    this.loadAttributes(this.reinitData);
    this.reinitFunc();
};
Game.prototype.start = function() {
    this.init();
    this.run();
};
Game.prototype.keyDown = function(keyCode) {
    return this.keys.indexOf(keyCode) > -1;
};
Game.prototype.setBackgroundColor = function(colorVector) {
    this.backgroundColor = colorVector;
};
Game.prototype.filterEntitiesByComponent = function(component) {
    return this.entityManager.getEntsWithComponent(component);
};
Game.prototype.filterEntitiesByComponentList = function(componentList) {
    return this.entityManager.getEntsWithComponents(componentList);
};
Game.prototype.filterEntitiesByTag = function(tag) {
    return this.entityManager.getEntsWithTag(tag);
};
Game.prototype.getAllEntities = function() {
    return this.entityManager.getAllEntities();
};
Game.prototype.clearEntities = function() {
    this.entityManager.clearAllEntities();
};