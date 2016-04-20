var Player = function() {
    var dimensions = new Vec2(40, 40);
    var center = new Vec2(GAME.width / 2, GAME.height / 2);
    var entity = new Entity("player");
    entity.addComponent(new Transform2D(center, dimensions, new Vec2(0, 0)));
    entity.addComponent(new AABBCollisionBox(dimensions));
    entity.addComponent(new FlatColor(new Vec4(24, 221, 0, 1)));
    entity.addComponent(new Health(4));
    entity.addComponent(new Points(0));
    entity.addComponent(new Multiplier(0));

    var shapes = {
        "0" : {
            "shape": new Shape("circle", dimensions, center),
            "gun": new Gun(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY, 75, [
                //bullet offsets
                new Vec2(0, 0)
            ], [
                //starting angles
                0
            ])
        },
        "1" : {
            "shape": new Shape("rect", dimensions, center),
            "gun": new Gun(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY, 100, [
                //bullet offsets
                new Vec2(0, -20),
                new Vec2(0, 20)
            ], [
                //starting angles
                180, 0
            ])
        },
        "2" : {
            "shape":
            new Shape("pentagon", dimensions, center),
            "gun": new Gun(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY, 150, [
                //bullet offsets
                new Vec2(0, 0),
                new Vec2(0, 0),
                new Vec2(0, 0),
            ], [
                //starting angles
                0, -55, 55,
            ])
        }
    };
    var currentShape = 0;

    entity.addComponent(shapes[currentShape]["shape"]);
    entity.addComponent(shapes[currentShape]["gun"]);

    entity.components.AABBCollisionBox.coolDownTime = 200;

    entity.components.transform2D.maxVelocity = new Vec2(100, 100);
    entity.components.transform2D.acceleration = new Vec2(0, 0);
    entity.components.transform2D.thrust = 0;
    entity.components.transform2D.rotationalVelocity = 0;
    entity.components.transform2D.forwardVelocity = 0;

    entity.components.transform2D.angle = 0;

    entity.onUpdate = function() {
        var transform = this.components.transform2D;
        var collisionBox = this.components.AABBCollisionBox;
        var inputHandler = GAME.inputHandler;

        //change shape and gun if necessary
        var newShape = this.components.multiplier.value > 15 ? 2 : this.components.multiplier.value > 7.5 ? 1 : 0;
        if (newShape !== currentShape) {
            currentShape = newShape;
            collisionBox.active = false;
            GAME.soundManager.playSound("powerup");

            var pos = this.components.shape.center;
            this.removeComponent(Shape);
            this.addComponent(shapes[currentShape]["shape"]);
            this.components.shape.center = pos;

            this.removeComponent(Gun);
            this.addComponent(shapes[currentShape]["gun"]);
        }

        //handle input - move forward
        if (inputHandler.isKeyDown(KEYCODES.w)) {
            transform.targetForwardVelocity = 45;
            transform.acceleration = new Vec2(45, 0);
        }
        else {
            transform.targetForwardVelocity = 0;
            transform.forwardVelocity = 0;
        }

        //rotate to point towards the mouse
        transform.angle = transform.position.getAngleBetweenVec2(GAME.mousePos);

        //fix rotation and velocity for pentagon (issue I shouldn't have to deal with)
        if (this.components.shape.shapeName === "pentagon") {
            transform.forwardVelocity = -Math.abs(transform.forwardVelocity);
            transform.angle -= degToRad(90);
        }
        else {
            transform.angle += degToRad(90);
        }

        //make sure health does not exceed maxhealth
        if (this.components.health.value > this.components.health.maxValue) {
            this.components.health.value = this.components.health.maxValue;
        }

        //reset position if edge hit
        if (transform.position.x - transform.dimensions.x / 2 < 0 || transform.position.x + transform.dimensions.x / 2 > GAME.width) {
            transform.position.x -= transform.lastMoveDelta.x || transform.lastMoveDelta;
        }
        if (transform.position.y - transform.dimensions.y / 2 < 0 || transform.position.y + transform.dimensions.y / 2 > GAME.height) {
            transform.position.y -= transform.lastMoveDelta.y || transform.lastMoveDelta;
        }

        //flash if in invincibility cooldown
        if (!collisionBox.active) {
            collisionBox.coolDownTimer++;

            if (collisionBox.coolDownTimer % 5 === 0 || collisionBox.coolDownTimer % 6 == 0 || collisionBox.coolDownTimer % 7 == 0) {
                this.removeComponent(FlatColor);
            }
            else {
                if (!this.hasComponent(FlatColor)) {
                    this.addComponent(new FlatColor(new Vec4(24, 221, 0, 1)));
                }
            }

            if (collisionBox.coolDownTimer > collisionBox.coolDownTime) {
                collisionBox.coolDownTimer = 0;
                collisionBox.active = true;
                if (!this.hasComponent(FlatColor)) {
                    this.addComponent(new FlatColor(new Vec4(24, 221, 0, 1)));
                }
            }
        }
    };

    entity.onCollision = function(e) {
        if (this.components.AABBCollisionBox.active) {
            if (e.tag.indexOf("enemy") > -1) {
                //set the invincibility cooldown
                //subtract health (die if necessary)
                //halve multiplier
                this.components.AABBCollisionBox.active = false;
                this.components.health.value--;
                if (this.components.health.value <= 0) {
                    GAME.switchToState("dead");
                }
                this.components.multiplier.value /= 2;

                GAME.soundManager.playSound("hit");
            }
        }
    };

    return entity;
};