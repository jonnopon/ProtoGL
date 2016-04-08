var Player = function(pos, game) {
    var vertMul = game.height / game.height;
    var dimensions = new Vec2(40, 40 * vertMul);
    Entity.prototype.constructor.call(this, pos, dimensions, game);

    this.health = 3;
    this.maxDXMag = 75;
    this.maxDYMag = 75 * vertMul;

    this.dead = false;

    this.u1 = 0;
    this.u2 = 0.25;
    this.v1 = 1;
    this.v2 = 0;

    this.noCollideTimer = 0;
    this.noCollideTimeMax = 85;

    this.turn = function(dir) {
        switch (dir) {
            case 0:
                //w
                this.vel.y = this.maxDYMag;
                this.vel.x = 0;
                break;
            case 1:
                //d
                this.vel.x = this.maxDYMag;
                this.vel.y = 0;
                break;
            case 2:
                //s
                this.vel.y = -this.maxDYMag;
                this.vel.x = 0;
                break;
            case 3:
                //a
                this.vel.x = -this.maxDYMag;
                this.vel.y = 0;
                break;
            default:
                break;
        }
    }

    this.update = function(delta) {
        //override super update because entity is a refactor I don't want to touch right now
        if (this.pos.x + this.width < 0) {
            this.pos.x = this.game.width;
        }
        else if (this.pos.x >= game.width) {
            this.pos.x = -this.width;
        }

        if (this.pos.y > game.height) {
            this.pos.y = - this.height;
        }
        else if (this.pos.y + this.height < 0) {
            this.pos.y = game.height;
        }

        if (this.health <= 0) {
            this.dead = true;
        }

        if (this.noCollideEnt) {
            this.noCollideTimer++;
            if (this.noCollideTimer > this.noCollideTimeMax) {
                this.noCollideTimer = 0;
                this.visible = true;
                this.noCollideEnt = false;
            }
            else {
                this.visible = this.noCollideTimer % 2 !== 0;
            }
        }
    };

    this.collidedWithEnt = function(e) {
        if (e instanceof Enemy && !this.noCollideEnt) {
            this.health--;
            this.noCollideEnt = true;
            this.game.sman.playSound("hit");
        }
        else if (e instanceof Food) {
            this.game.addPoints(1);
            this.game.sman.playSound("point");
        }
    };
};