var Sprite = function(u1, v1, u2, v2) {
    this.topLeft = new Vec2(u1, v1);
    this.bottomRight = new Vec2(u2, v2);
    this.bottomLeft = new Vec2(u1, v2);
    this.topRight = new Vec2(u2, v1);
};
Sprite.prototype.name = "sprite";