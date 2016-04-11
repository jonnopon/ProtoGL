var Player = function(game) {
    var entity = new Entity("player", game);
    entity.addComponent(new Sprite(0, 0, 0.25, 1));
    entity.addComponent(new Transform2D(new Vec2(game.width / 2, game.height / 2), new Vec2(40, 40), new Vec2(0, 0)));
    entity.addComponent(new AABBCollisionBox(new Vec2(40, 40)));
    entity.addComponent(new Health(3));
    entity.addComponent(new Points());
    // entity.addComponent(new PlayerControlled());

    entity.components.transform2D.maxVelocity = new Vec2(75, 75);
    entity.components.AABBCollisionBox.coolDownTime = 75;

    entity.tick = function() {
        var pos = this.components.transform2D.position;
        var dim = this.components.transform2D.dimensions;
        
        if (pos.x + dim.x < 0) {
            pos.x = this.game.width;
        }
        else if (pos.x > this.game.width) {
            pos.x = -dim.x;
        }

        if (pos.y > this.game.height) {
            pos.y = -dim.y;
        }
        else if (pos.y + dim.y < 0) {
            pos.y = this.game.height;
        }

        var collisionBox = this.components.AABBCollisionBox;

        if (!collisionBox.active) {
            collisionBox.coolDownTimer++;

            if (collisionBox.coolDownTimer % 2 === 0) {
                this.removeComponent(Sprite);
            }
            else {
                if (!this.hasComponent(Sprite)) {
                    this.addComponent(new Sprite(0, 0, 0.25, 1));
                }
            }

            if (collisionBox.coolDownTimer > collisionBox.coolDownTime) {
                collisionBox.coolDownTimer = 0;
                collisionBox.active = true;
                if (!this.hasComponent(Sprite)) {
                    this.addComponent(new Sprite(0, 0, 0.25, 1));
                }
            }
        }
    
        // if (this.health <= 0) {
        //     this.dead = true;
        // }
    
        // if (this.noCollideEnt) {
        //     this.noCollideTimer++;
        //     if (this.noCollideTimer > this.noCollideTimeMax) {
        //         this.noCollideTimer = 0;
        //         this.visible = true;
        //         this.noCollideEnt = false;
        //     }
        //     else {
        //         this.visible = this.noCollideTimer % 2 !== 0;
        //     }
        // }        
    };
    
    entity.onCollision = function(e) {
        if (e.tag === "food") {
            this.components.points.value++;
        }
        else if (e.tag === "enemy") {
            if (this.components.AABBCollisionBox.active) {
                this.components.health.value--;
                this.components.AABBCollisionBox.active = false;
            }
        }
    };
    
    return entity;
}