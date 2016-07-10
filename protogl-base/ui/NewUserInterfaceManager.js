var UserInterfaceManager = function() {
    this.renderer = GAME.renderer;
    this.elements = [];
    this.removeList = [];
    this.addList = [];
    this.vboName = "uiVBO";

    this.renderer.addVBO(this.vboName);
};

UserInterfaceManager.prototype.addElement = function(e) {
    this.addList.push(e);
};
UserInterfaceManager.prototype.removeElement = function(e) {
    this.removeList.push(e);
};
UserInterfaceManager.prototype.loadElements = function() {
    for (var i = 0; i < this.addList.length; i++) {
        this.elements.push(this.addList[i]);
    }
    this.addList = [];
};
UserInterfaceManager.prototype.cleanElements = function() {
    for (var i = 0; i < this.removeList.length; i++) {
        this.elements.splice(this.elements.indexOf(this.removeList[i]), 1);
    }
    this.removeList = [];
};

UserInterfaceManager.prototype.update = function() {
    for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].onUpdate !== null) {
            this.elements[i].onUpdate();
        }
    }

    if (this.addList.length) {
        this.loadElements();
    }
    if (this.removeList.length) {
        this.cleanElements();
    }
};

UserInterfaceManager.prototype.render = function() {
    GAME.entityManager.render(this.elements);
};