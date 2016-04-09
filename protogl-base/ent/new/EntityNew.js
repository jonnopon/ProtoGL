var EntityNew = function() {
    this.id = (+new Date()).toString(16) + (Math.random() * 10000000 | 0).toString(16);
    
    this.components = {};
    
    this.addComponent = function(component) {
        this.components[component.name] = component;    
    };
    
    this.removeComponent = function(component) {
        //support for removing components passed as functions or components by name
        var name = typeof component === 'function' ? component.name : component;
        
        delete this.components[name];
    };
    
    this.print = function() {
        console.log(JSON.stringify(this, null, 4));
    };
};