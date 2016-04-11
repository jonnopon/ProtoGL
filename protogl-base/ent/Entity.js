var Entity = function(tag, game) {
    this.id = (+new Date()).toString(16) + (Math.random() * 10000000 | 0).toString(16);
    this.tag = tag;
    this.game = game;
    this.components = {};
    
    //TODO going against the ECS architecture? D:
    this.onCollision = null;
    this.tick = null;

    this.addComponent = function(component) {
        this.components[component.name] = component;
    };
    
    this.removeComponent = function(component) {
        //support for removing components passed as functions or components by name
        var name = typeof component === 'function' ? component.prototype.name : component;
        
        delete this.components[name];
    };
    
    this.hasComponent = function(componentName) {
        return Object.keys(this.components).indexOf(componentName) > -1;
    };
    
    this.hasComponents = function(componentNameList) {
        var has = false;
        for (var i = 0; i < componentNameList.length; i++) {
            has = this.hasComponent(componentNameList[i]);
            
            if (!has) {
                return false;
            }
        }
        return true;
    };
    
    this.print = function() {
        console.log(JSON.stringify(this, null, 4));
    };
};