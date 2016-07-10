var Panel = function(position, dimensions, color) {

    var entity = new Entity("ui-panel");

    entity.addComponent(new Transform2D(position, dimensions, new Vec2()));
    entity.addComponent(new Shape("rect", dimensions));
    entity.addComponent(new FlatColor(color));

    entity.addComponent(new Shader(GAME.getShader("2DShader")));

    return entity;
};