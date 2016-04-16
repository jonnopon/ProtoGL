var Background = function() {
    var entity = new Entity("background");
    entity.addComponent(new Transform2D(new Vec2(GAME.width / 2, GAME.height / 2), new Vec2(40, 40), new Vec2(0, 0)));
    entity.addComponent(new Health(3));
    entity.addComponent(new Points());
    entity.addComponent(new Shape("grid", new Vec2(GAME.width - 10, GAME.height - 10), new Vec2(GAME.width / 2, GAME.height / 2)));
    entity.addComponent(new FlatColor(new Vec4(255, 255, 255, 1)));
    // multiplier

    entity.onUpdate = function() {
        
    };

    return entity;
};