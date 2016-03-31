var Vec2 = function(x, y) {
    this.x = x;
    this.y = y;

    this.mag = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    this.normalize = function() {
        var mag = this.mag();
        return new Vec2(this.x / mag, this.y / mag);
    };
};