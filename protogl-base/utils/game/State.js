var State = function(name, initFunc, tickFunc) {
    this.name = name;
    this.initFunc = initFunc;
    this.tickFunc = tickFunc;
};

State.prototype.init = function() {
    this.initFunc();
};
State.prototype.tick = function() {
    this.tickFunc();
};
State.prototype.getName = function() {
    return this.name;
};