var State = function(name, initFunc, tickFunc, game) {
    this.name = name;
    this.initFunc = initFunc;
    this.tickFunc = tickFunc;
    this.game = game;

    this.init = function() {
        this.initFunc.apply(this, [this.game]);
    };

    this.tick = function() {
        this.tickFunc.apply(this, [this.game]);
    };

    this.getName = function() {
        return this.name;
    };
};