var AABBCollisionBox = function(dimensions) {
    this.dimensions = dimensions;
    this.active = true;
    this.coolDownTime = 0;
    this.coolDownTimer = 0;
};
AABBCollisionBox.prototype.name = "AABBCollisionBox";