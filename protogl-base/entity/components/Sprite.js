var Sprite = function(u1, v1, u2, v2) {
    this.topLeft = new Vec2(u1, v1);
    this.bottomRight = new Vec2(u2, v2);
};
Sprite.prototype.name = "sprite";