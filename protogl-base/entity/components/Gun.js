var Gun = function(ammo, maxAmmo, fireRate) {
    this.ammo = ammo;
    this.maxAmmo = maxAmmo;
    this.fireRate = fireRate;
    this.lastFire = 0;

    this.shoot = GAME.entityShoot;
};
Gun.prototype.name = "gun";