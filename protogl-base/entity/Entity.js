var Entity = function(tag) {
    this.id = (+new Date()).toString(16) + (Math.random() * 10000000 | 0).toString(16);
    this.tag = tag;
    this.components = {};
    this.onCollision = null;
    this.onUpdate = null;
};

Entity.prototype.addComponent = function(component) {
    this.components[component.name] = component;
};
Entity.prototype.removeComponent = function(component) {
    //support for removing components passed as functions or components by name
    var name = typeof component === 'function' ? component.prototype.name : component;

    delete this.components[name];
};
Entity.prototype.hasComponent = function(component) {
    var name = typeof component === 'function' ? component.prototype.name : component;
    return Object.keys(this.components).indexOf(name) > -1;
};
Entity.prototype.hasComponents = function(componentNameList) {
    var has = false;
    for (var i = 0; i < componentNameList.length; i++) {
        has = this.hasComponent(componentNameList[i]);

        if (!has) {
            return false;
        }
    }
    return true;
};
Entity.prototype.print = function() {
    console.log(JSON.stringify(this, null, 4));
};