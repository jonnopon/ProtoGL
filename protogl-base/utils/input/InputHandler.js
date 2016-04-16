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
    });

    canvas.addEventListener("mouseup", function(event) {
        GAME.mouseDown = false;
    });

    canvas.addEventListener("click", function(event) {
        GAME.mouseClickedPos = new Vec2(event.layerX, GAME.height - event.layerY);

        //BROADCAST CLICKED MESSAGE?
    });

    canvas.addEventListener("contextmenu", function(event) {
        event.preventDefault();
        GAME.mouseContextClickedPos = new Vec2(event.layerX, GAME.height - event.layerY);

        //BROADCAST CLICKED MESSAGE?
    });

    canvas.addEventListener("mousemove", function(event) {
        GAME.mousePos = new Vec2(event.layerX, GAME.height - event.layerY);

        //BROADCAST MOVED MESSAGE?
    });

    canvas.addEventListener("dblclick", function(event) {
        GAME.mouseDblClickedPos = new Vec2(event.layerX, GAME.height - event.layerY);

        //BROADCAST DOUBLE CLICKED MESSAGE?
    });

};

InputHandler.prototype.isKeyDown = function(which) {
    return GAME.keys.indexOf(which) > -1;
};