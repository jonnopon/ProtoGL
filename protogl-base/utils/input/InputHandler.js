var InputHandler = function(canvas) {
    window.onkeydown = function(event) {
        if (event.which !== KEYCODES.f5 && event.which !== KEYCODES.f12) {
            event.preventDefault();
            if (window.game.keys.indexOf(event.which) === -1) {
                window.game.keys.push(event.which);
            }
        }
    };
    window.onkeyup = function(event) {
        if (event.which !== KEYCODES.f5 && event.which !== KEYCODES.f12) {
            event.preventDefault();
            window.game.keys.splice(window.game.keys.indexOf(event.which), 1);
        }
    };

    canvas.addEventListener("click", function(event) {
        window.game.mouseClickedPos = new Vec2(event.layerX, game.height - event.layerY);

        //BROADCAST CLICKED MESSAGE?
    });

    canvas.addEventListener("contextmenu", function(event) {
        event.preventDefault();
        window.game.mouseContextClickedPos = new Vec2(event.layerX, game.height - event.layerY);

        //BROADCAST CLICKED MESSAGE?
    });

    canvas.addEventListener("mousemove", function(event) {
        window.game.mousePos = new Vec2(event.layerX, game.height - event.layerY);

        //BROADCAST MOVED MESSAGE?
    });

    canvas.addEventListener("dblclick", function(event) {
        window.game.mouseDblClickedPos = new Vec2(event.layerX, game.height - event.layerY);

        //BROADCAST DOUBLE CLICKED MESSAGE?
    });

};

InputHandler.prototype.isKeyDown = function(which) {
    return window.game.keys.indexOf(which) > -1;
};