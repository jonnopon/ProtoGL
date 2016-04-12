var State = function(name, initFunc, tickFunc, game) {
    this.name = name;
    this.initFunc = initFunc;
    this.tickFunc = tickFunc;
    this.game = game;
};

State.prototype.init = function() {
    this.initFunc.apply(this, [this.game]);
};
State.prototype.tick = function() {
    this.tickFunc.apply(this, [this.game]);
};
State.prototype.getName = function() {
    return this.name;
};