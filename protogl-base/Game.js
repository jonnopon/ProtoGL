var GAME = null; //global Game object reference, accessible from anywhere
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

    this.delta = 0;
    this.lastLoopTime = 0;

    this.initData = {};
    this.reinitData = {};
    this.initFunc = null;
    this.reinitFunc = null;

    this.canvas = document.getElementById("gameCanvas");
    this.canvas.width = width;
    this.canvas.height = height;

    this.inputHandler = new InputHandler(this.canvas);
    this.keys = [];
    this.mousePos = new Vec2(0, 0);
    this.mouseClickedPos = new Vec2(0, 0);
    this.mouseContextClickedPos = new Vec2(0, 0);
    this.mouseDblClickedPos = new Vec2(0, 0);

    GAME = this;
};

Game.prototype.run = function(t) {
    GAME.delta = Date.now() - GAME.lastLoopTime;
    GAME.lastLoopTime = Date.now();
    GAME.renderer.clearScreen(GAME.backgroundColor, false);
    GAME.resizeCanvas();

    if (GAME.displayStats) {
        GAME.textManager.addString("FPS: " + Math.round((1000 / GAME.delta) * 10) / 10, "right", 25, new Vec2(GAME.width - 15, GAME.height - 25), new Vec4(255, 255, 255, 1), 0);
        GAME.textManager.addString("MousePos:\\n" + GAME.mousePos.str(), "Right", 25, new Vec2(GAME.width - 200, GAME.height - 65), new Vec4(255, 255, 255, 1), 0);
    }

    for (var i = 0; i < GAME.systems.length; i++) {
        GAME.systems[i]();
    }
    GAME.currentState.tick();

    GAME.userInterfaceManager.render();
    GAME.textManager.render();

    requestAnimationFrame(GAME.run);
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
    this.userInterfaceManager = new UserInterfaceManager(this);
};
Game.prototype.addState = function(state) {
    this.states[state.getName()] = state;
};
Game.prototype.switchToState = function(name) {
    this.currentState = this.states[name];
    this.textManager.flushPersistentStrings();
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
Game.prototype.addEntityList = function(l) {
    this.entityManager.addEntityList(l);
};
Game.prototype.removeEntity = function(e) {
    this.entityManager.removeEntity(e);
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