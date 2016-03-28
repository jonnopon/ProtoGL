var Entity = function(pos, dimensions, game) {
    //TODO this whole thing is an absolute travesty
    //Gotta replace with a well-planned out system, probably component based, probably flexible + extensible
	this.eman = game.eman;
	this.sman = game.sman;
    this.lman = game.lman;
    this.game = game;
	this.pos = pos;
    this.u1 = 0;
    this.u2 = 1;
    this.v1 = 0;
    this.v2 = 1;
	this.width = dimensions.x;
    this.height = dimensions.y;
    this.origWidth = this.width;
    this.origHeight = this.height;
	this.vel = new Vec2(0, 0);
	this.center = new Vec2((pos.x + (pos.x + dimensions.x)) / 2, (pos.y + (pos.y + dimensions.y)) / 2);
	this.maxDXMag = 0.05;
	this.maxDYMag = 0.05;

    this.visible = true;

	this.rotation = 0;
    this.scaler = 1;
	this.moveLeft = false;
	this.moveRight = false;
	this.moveUp = false;
	this.moveDown = false;
	this.stoppedHor = false;
	this.stoppedVer = true;

    this.noCollideLvl = false;
    this.noCollideLvlTime = 0;
    this.noCollideLvlTimer = 0;
    this.noCollideLvlPerm = false;
    this.noCollideEnt = false;
    this.noCollideEntTime = 0;
    this.noCollideEntTimer = 0;
    this.noCollideEntPerm = false;

    this.hasGravity = false;
    this.gravity = 0;
    this.blocked = false;

    this.falling = false;
    this.jumping = false;
    this.canJump = false;
    this.lastJumpTime = 0;
    this.jumpCoolDown = 0;
    this.jumpCapacity = 1;
    this.jumpCount = 0;

    this.jumpPower = 1;

    this.dataPerVert = 8; //assuming 2D pos w/ texture, rotation scale and center
    this.totalVerts = 6; //assuming triangle

    this.health = 0;
    this.damage = 0;

    this.update = function(delta) {
        if (this.nocollideLvl && !this.noCollideLvlPerm) {
            this.nocollideTimerLvl++;
            if (this.nocollideTimerLvl > this.nocollideTimeLvl) {
                this.nocollideLvl = false;
                this.nocollideTimerLvl = 0;
                this.nocollideTimeLvl = 0;
            }
        }
        if (this.nocollideEnt && !this.noCollideEntPerm) {
            this.nocollideTimerEnt++;
            if (this.nocollideTimerEnt > this.nocollideTimeEnt) {
                this.nocollideEnt = false;
                this.nocollideTimerEnt = 0;
                this.nocollideTimeEnt = 0;
            }
        }

        //gravity 
        if (this.falling) {
            var newVel = this.vel.y - (this.gravity * delta) / 100;
            if (newVel >= -this.maxDYMag) {
                 this.vel.y  = newVel;
            }
            else {
                this.vel.y = -this.maxDYMag;
            }
        }
        else {
            this.falling = !this.eman.scanDown(this);
            if (this.falling) {
                this.canJump = false;
            }
        }

        if (this.moveUp) {
            if (this.vel.y > -this.maxDYMag) {
                this.vel.y -= (this.maxDYMag / 30);
            }
            else {
                this.vel.y = -this.maxDYMag;
            }
        }
        else if (this.moveDown) {
            if (this.vel.y < this.maxDYMag) {
                this.vel.y += (this.maxDYMag / 30);
            }
            else {
                this.vel.y = this.maxDYMag;
            }
        }
        else if (this.stoppedVer) {
            if (this.vel.y > 0) {
                //moving Down
                this.vel.y -= (this.maxDYMag / 30);

                if (this.vel.y < (this.maxDYMag / 30)) {
                    this.vel.y = 0;
                    this.stoppedVer = false;
                }
            }
            else if (this.vel.y < 0) {
                //moving Up
                this.vel.y += (this.maxDYMag / 30);

                if (this.vel.y > (-this.maxDYMag / 30)) {
                    this.vel.y = 0;
                    this.stoppedVer = false;
                }
            }
        }

        //no gravity
        if (this.moveLeft) {
            if (this.vel.x > -this.maxDXMag) {
                this.vel.x -= (this.maxDXMag / 100);
            }
            else {
                this.vel.x = -this.maxDXMag;
            }
        }
        else if (this.moveRight) {
            if (this.vel.x < this.maxDXMag) {
                this.vel.x += (this.maxDXMag / 100);
            }
            else {
                this.vel.x = this.maxDXMag;
            }
        }
        else if (this.stoppedHor) {
            if (this.vel.x > 0) {
                //moving right
                this.vel.x -= (this.maxDXMag / 100);

                if (this.vel.x < (this.maxDXMag / 100)) {
                    this.vel.x = 0;
                    this.stoppedHor = false;
                }
            }
            else if (this.vel.x < 0) {
                //moving left
                this.vel.x += (this.maxDXMag / 100);

                if (this.vel.x > (-this.maxDXMag / 100)) {
                    this.vel.x = 0;
                    this.stoppedHor = false;
                }
            }
        }

        //TODO: this whole thing is dumb
    //     if (this.blocked) {
    //         if (this.pos.x < -0.7) {
    //             this.pos.x = -0.695;
    //             this.moveLeft = false;
    //             this.moveRight = false;
    //             this.stoppedHor = false;
    //             this.vel.x = 0;
    //         }
    //         else if (this.pos.x + this.width > 0.75) {
    //             this.pos.x = 0.745 - this.width;
    //             this.moveLeft = false;
    //             this.moveRight = false;
    //             this.stoppedHor = false;
    //             this.vel.x = 0;
    //         }
    //
    //         if (this.pos.y < -0.85) {
    //             this.pos.y = -0.8;
    //             this.moveUp = false;
    //             this.moveDown = false;
    //             this.stoppedVer = false;
    //             this.vel.y = 0;
    //         }
    //         else if (this.pos.y + this.height > 0.85) {
    //             this.pos.y = 0.8 - this.height;
    //             this.moveUp = false;
    //             this.moveDown = false;
    //             this.stoppedVer = false;
    //             this.vel.y = 0;
    //         }
    //     }
    };

    this.jump = function(power) {
        if (this.canJump) {
            this.sman.playSound("jump");
            this.jumping = true;
            if (this.jumpCount > 1) {
                this.vel.Y *= 1.5;
            }
            else {
                this.vel.y = this.maxDYMag * ((power * 0.95) / 100);
                this.lastJumpTime = Date.now();
                this.canJump = false;
            }

            this.jumpCount++;
        }
    };

    this.land = function(yPos) {
        this.jumping = false;
        this.jumpCalls = 0;
        this.falling = false;
        this.vel.y = 0;
        this.pos.y = yPos;
        this.canJump = true;
        this.jumpCount = 0;
    };

    this.tick = function() {
        //TODO inheritable update for entities, extra processing in the loop
        //allows prototypal usage of update basic as well as overriding as well as "adding on top"
    };

	this.move = function(delta) {
		this.pos.x += (this.vel.x * delta) / 100;
        this.pos.y += (this.vel.y * delta) / 100;
	};

    this.die = function() {
        this.destroy();
    };

	this.rotate = function(angle) {
		this.rotation += angle;
	};

    this.visualScale = function(scale) {
        this.scaler = scale;
    };

	this.scale = function(scale) {
        this.width = this.origWidth * (scale.x >= 1 ? scale.x : 1);
        this.height = this.origHeight * (scale.y >= 1 ? scale.y : 1);

        //TODO PREP for new dimensional system
	};

    this.dealDamage = function(damage) {
        this.health -= damage;
    };

	this.destroy = function() {
		this.eman.removeEnt(this);
	};

	this.getVerts = function() {
        this.scaler = 1;
        this.center.x = (this.pos.x + (this.pos.x + this.width)) / 2;
        this.center.y = (this.pos.y + (this.pos.y + this.height)) / 2;
        //TODO use the below to make it configurable
        // return new Float32Array([
        //     this.pos.x, this.pos.y, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y,
        //     this.pos.x + this.width, this.pos.y, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y,
        //     this.pos.x + this.width, this.pos.y + this.height, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y,

        //     this.pos.x + this.width, this.pos.y + this.height, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y,
        //     this.pos.x, this.pos.y + this.height, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y,
        //     this.pos.x, this.pos.y, this.col.x, this.col.y, this.col.z, this.rotation, this.scaler, this.center.x, this.center.y
        // ]);
        return new Float32Array([
            this.pos.x, this.pos.y, this.u1, this.v1, this.rotation, this.scaler, this.center.x, this.center.y,
            this.pos.x + this.width, this.pos.y, this.u2, this.v1, this.rotation, this.scaler, this.center.x, this.center.y,
            this.pos.x + this.width, this.pos.y + this.height, this.u2, this.v2, this.rotation, this.scaler, this.center.x, this.center.y,

            this.pos.x + this.width, this.pos.y + this.height, this.u2, this.v2, this.rotation, this.scaler, this.center.x, this.center.y,
            this.pos.x, this.pos.y + this.height, this.u1, this.v2, this.rotation, this.scaler, this.center.x, this.center.y,
            this.pos.x, this.pos.y, this.u1, this.v1, this.rotation, this.scaler, this.center.x, this.center.y
        ]);
	};

	this.moveHor = function(dir) {
		switch (dir) {
            case 0:
                this.stoppedHor = true;
                this.moveLeft = false;
                this.moveRight = false;
                break;
            case -1:
                this.moveLeft = true;
                this.moveRight = false;
                this.stoppedHor = false;
                break;
            case 1:
                this.moveRight = true;
                this.moveLeft = false;
                this.stoppedHor = false;
                break;
        }
	};

	this.moveVer = function(dir) {
		switch (dir) {
            case 0:
                this.stoppedVer = true;
                this.moveUp = false;
                this.moveDown = false;
                break;
            case -1:
                this.moveDown = true;
                this.moveUp = false;
                this.stoppedVer = false;
                break;
            case 1:
                this.moveUp = true;
                this.moveDown = false;
                this.stoppedVer = false;
                break;
        }
	};

    this.collidedWithEnt = function(e) {return};
    this.collidedWithLvl = function(p) {return};
};