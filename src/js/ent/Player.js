var Player = function(pos, game) {
    this.game = game;

    var dimensions = new Vec2(0.1, 0.1);
    Entity.prototype.constructor.call(this, pos, dimensions, game);

    this.health = 3;
    this.maxDXMag = 0.15;
    this.maxDYMag = 0.15;

    this.dead = false;

    this.u1 = 0;
    this.u2 = 0.5;
    this.v1 = 1;
    this.v2 = 0;

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
        if (this.pos.x + this.width < -1) {
            this.pos.x = 1;
        }
        else if (this.pos.x >= 1) {
            this.pos.x = -1 - this.width;
        }

        if (this.pos.y > 1) {
            this.pos.y = -1 - this.height;
        }
        else if (this.pos.y + this.height < -1) {
            this.pos.y = 1;
        }
    };

    this.collidedWithEnt = function(e) {

    };

    this.collidedWithLvl = function(e) {

    };

    this.tick = function() {

    };
};