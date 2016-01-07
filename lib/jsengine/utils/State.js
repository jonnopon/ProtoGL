var State = function(name) {
    this.name = name;
    this.func = null;
    this.funcArgs = null;
};

State.prototype.tick = function() {
    if (this.func == null) {
        alert("borked");
        return;
    }

    this.func.apply(this, this.funcArgs);
    window.requestAnimationFrame(window.game.run);
};

State.prototype.setFunc = function(func) {
    this.func = func;
    this.funcArgs = Array.prototype.slice.call(arguments, 1);

};

State.prototype.getName = function() {
    return this.name;
};