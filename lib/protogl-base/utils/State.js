var State = function(name) {
    this.name = name;
    this.func = null;
    this.funcArgs = null;

    this.tick = function() {
        if (this.func == null) {
            alert("borked");
            return;
        }

        this.func.apply(this, this.funcArgs);

        //TODO: understand why this is required. Probably obvious but just in case
        window.requestAnimationFrame(window.game.run);
    };

    this.setFunc = function(func) {
        this.func = func;
        this.funcArgs = Array.prototype.slice.call(arguments, 1);

    };

    this.getName = function() {
        return this.name;
    };
};