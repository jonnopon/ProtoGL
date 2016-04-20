var Background = function() {
    var entity = new Entity("background");

    var center= new Vec2(GAME.width / 2, GAME.height / 2);
    var dimensions = new Vec2(GAME.width - 10, GAME.height - 10);

    entity.addComponent(new Transform2D(center, dimensions, new Vec2()));
    entity.addComponent(new Health(3));
    entity.addComponent(new Points());
    entity.addComponent(new Shape("grid", dimensions, center));
    entity.addComponent(new FlatColor(new Vec4(77, 77, 255, 1)));

    return entity;
};