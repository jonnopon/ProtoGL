var InputHandler = function(canvas) {
    window.onkeydown = function(event) {
        if (event.which !== KEYCODES.f5 && event.which !== KEYCODES.f12) {
            event.preventDefault();
            if (GAME.keys.indexOf(event.which) === -1) {
                GAME.keys.push(event.which);
            }
        }
    };
    window.onkeyup = function(event) {
        if (event.which !== KEYCODES.f5 && event.which !== KEYCODES.f12) {
            event.preventDefault();
            GAME.keys.splice(GAME.keys.indexOf(event.which), 1);
        }
    };

    canvas.addEventListener("mousedown", function(event) {
        GAME.mouseDown = true;
        if (document.pointerLockElement == null) {
            this.requestPointerLock();
            var fullScreenFunc = this.requestFullScreen || this.mozRequestFullScreen || this.webkitRequestFullScreen;
            // fullScreenFunc();
            if (GAME.clientX === undefined) {
                GAME.clientX = event.layerX;
            }
            if (GAME.clientY === undefined) {
                GAME.clientY = event.layerY;
            }

        }
    });

    canvas.addEventListener("mouseup", function(event) {
        GAME.mouseDown = false;
    });

    canvas.addEventListener("click", function(event) {
        if (document.pointerLockElement == null) {
            this.requestPointerLock();
        }
        GAME.mouseClickedPos = GAME.mousePos;

        //BROADCAST CLICKED MESSAGE?
    });

    canvas.addEventListener("contextmenu", function(event) {
        event.preventDefault();
        GAME.mouseContextClickedPos = new Vec2(event.layerX, GAME.height - event.layerY);
        //BROADCAST CLICKED MESSAGE?
    });

    canvas.addEventListener("mousemove", function(event) {
        if (GAME.clientX === undefined) {
            GAME.clientX = 0;
        }
        if (GAME.clientY === undefined) {
            GAME.clientY = 0;
        }

        GAME.mousePos = new Vec2(event.layerX, GAME.height - event.layerY);
        GAME.moveX = event.movementX;
        GAME.moveY = event.movementY;
        GAME.layerX = event.layerX;
        GAME.layerY = event.layerY;

        if (document.pointerLockElement) {
            GAME.clientX += (event.movementX) || (event.webkitMovementX) || 0;
            GAME.clientY -= (event.movementY) || (event.webkitMovementY) || 0;

            GAME.mousePos = new Vec2(GAME.clientX, GAME.clientY);
        }
    });

    canvas.addEventListener("dblclick", function(event) {
        GAME.mouseDblClickedPos = new Vec2(event.layerX, GAME.height - event.layerY);

        //BROADCAST DOUBLE CLICKED MESSAGE?
    });
};

InputHandler.prototype.isKeyDown = function(which) {
    return GAME.keys.indexOf(which) > -1;
};